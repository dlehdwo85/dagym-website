"use client";

import { startTransition, useActionState, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { submitLead, type LeadFormState } from "@/app/contact/actions";
import {
  CURRENT_OPERATIONS,
  DEFAULT_SERVICES,
  INQUIRY_TYPES,
  ORGANIZATION_TYPES,
  REGIONS,
  SERVICES,
  normalizeInquiryType,
  type InquiryType,
} from "@/lib/lead/constants";
import { formatPhone } from "@/lib/contact";
import { getAttribution, markLeadSubmitted } from "@/lib/analytics/utm";
import { trackEvent } from "@/lib/analytics/gtag";
import { useSearchParam } from "@/lib/use-search-param";
import { cn } from "@/lib/cn";

/**
 * 운영 문의 폼 — "입력은 짧게, 접수는 확실하게" (HILINK ContactForm 과 같은 흐름, DAGYM 디자인).
 * Server Action(submitLead) + 서버 Zod 검증. 입력값은 클라이언트 상태로 유지되므로
 * 검증 실패 · 시스템 오류에도 다시 입력할 필요가 없다 (form action 자동 reset 을 쓰지 않음).
 */

const initialState: LeadFormState = { status: "idle" };

/** 오류 시 이동 순서 (폼 위 → 아래) → 대상 엘리먼트 id */
const ERROR_TARGETS: [field: string, elementId: string][] = [
  ["inquiry_type", "lead-inquiry_type"],
  ["organization", "lead-organization"],
  ["region", "lead-region"],
  ["facility_scale", "lead-facility_scale"],
  ["name", "lead-name"],
  ["phone", "lead-phone"],
  ["email", "lead-email"],
  ["organization_type", "lead-organization_type"],
  ["services", "lead-services"],
  ["current_operation", "lead-current_operation"],
  ["message", "lead-message"],
  ["privacy_agree", "lead-privacy_agree"],
];

const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid", "landing_page", "referrer"] as const;

const subscribeNoop = () => () => {};

const inputBase =
  "h-13 w-full rounded-[4px] border bg-white px-4 text-[1rem] text-ink placeholder:text-muted transition-colors focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10";

function FieldLabel({ htmlFor, required, children }: { htmlFor?: string; required?: boolean; children: React.ReactNode }) {
  const cls = "mb-2 flex items-baseline gap-1 text-[0.875rem] font-semibold text-ink";
  const inner = (
    <>
      {children}
      {required ? (
        <span className="text-brand" aria-hidden>
          *
        </span>
      ) : (
        <span className="text-xs font-normal text-muted">(선택)</span>
      )}
    </>
  );
  return htmlFor ? (
    <label htmlFor={htmlFor} className={cls}>
      {inner}
    </label>
  ) : (
    <p className={cls}>{inner}</p>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className="mt-2 text-[0.8125rem] text-red-600" role="alert">
      {message}
    </p>
  );
}

function Section({ no, title, children }: { no: string; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="mt-12 first-of-type:mt-8">
      <legend className="flex items-center gap-3 text-[0.9375rem] font-semibold text-ink">
        <span className="text-brand">{no}</span> {title}
      </legend>
      <div className="mt-5">{children}</div>
    </fieldset>
  );
}

/** 선택 칩 (라디오 · 체크박스 공용) */
function Chip({
  type,
  name,
  value,
  checked,
  onChange,
  id,
  children,
  className,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "relative inline-flex min-h-12 cursor-pointer items-center gap-2 border px-4 py-2.5 text-[0.9375rem] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand",
        checked ? "border-ink bg-ink text-white" : "border-line-strong bg-white hover:border-ink",
        className,
      )}
    >
      <input id={id} type={type} name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {type === "checkbox" ? (
        checked && <Check className="size-4 shrink-0" aria-hidden />
      ) : (
        <span className={cn("flex size-4 shrink-0 items-center justify-center rounded-full border", checked ? "border-white bg-white" : "border-muted")} aria-hidden>
          {checked && <span className="size-2 rounded-full bg-ink" />}
        </span>
      )}
      {children}
    </label>
  );
}

export function ContactForm() {
  const [state, dispatch, pending] = useActionState(submitLead, initialState);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const startTracked = useRef(false);

  // URL 맥락: ?type= (문의 유형) · ?org= (소속) — 사용자가 바꾸면 그 값이 우선
  const urlType = normalizeInquiryType(useSearchParam("type"));
  const urlOrgRaw = useSearchParam("org");
  const urlOrg = urlOrgRaw && (ORGANIZATION_TYPES as readonly string[]).includes(urlOrgRaw) ? urlOrgRaw : null;

  const [pickedType, setPickedType] = useState<InquiryType | null>(null);
  const [pickedOrg, setPickedOrg] = useState<string | null>(null);
  const [pickedServices, setPickedServices] = useState<string[] | null>(null);
  const [text, setText] = useState({ organization: "", region: "", facility_scale: "", name: "", phone: "", email: "", current_operation: "", message: "" });
  const [privacy, setPrivacy] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const inquiryType = pickedType ?? urlType;
  const orgType = pickedOrg ?? urlOrg;
  // 서비스는 직접 고르기 전까지 문의 유형 기본값을 따른다
  const services = pickedServices ?? (inquiryType ? DEFAULT_SERVICES[inquiryType] : []);

  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const attribution = useMemo(() => (mounted ? getAttribution() : null), [mounted]);

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const set = (k: keyof typeof text, v: string) => setText((t) => ({ ...t, [k]: v }));
  const toggleService = (s: string) => setPickedServices(services.includes(s) ? services.filter((x) => x !== s) : [...services, s]);

  // 검증 실패 → 첫 오류 필드로 스크롤 + 포커스
  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    const first = ERROR_TARGETS.find(([f]) => state.fieldErrors?.[f]);
    const el = first ? document.getElementById(first[1]) : null;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.focus({ preventScroll: true });
  }, [state]);

  // 접수 성공 → 1회성 전환 플래그 기록 후 전용 완료 페이지로
  useEffect(() => {
    if (state.status === "success") {
      if (state.counted !== false) markLeadSubmitted();
      router.push("/contact/success");
    }
  }, [state.status, state.counted, router]);

  const onStart = () => {
    if (startedAt === null) setStartedAt(Date.now());
    if (startTracked.current) return;
    startTracked.current = true;
    trackEvent("form_start", { form: "lead", page_path: "/contact" });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    trackEvent("form_submit", { form: "lead", page_path: "/contact", inquiry_type: inquiryType ?? "" });
    const fd = new FormData(e.currentTarget);
    startTransition(() => dispatch(fd));
  };

  const described = (name: string) => (errors[name] ? `lead-${name}-error` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} onFocusCapture={onStart} noValidate aria-describedby="lead-required-note">
      <p id="lead-required-note" className="text-[0.8125rem] text-muted">
        <span className="text-brand">*</span> 표시는 필수 항목입니다.
      </p>

      {/* 추적 · 스팸 방지 hidden 값 */}
      <input type="hidden" name="form_started_at" value={startedAt ?? ""} readOnly />
      <input type="hidden" name="conversion_page" value={mounted ? window.location.pathname + window.location.search : "/contact"} readOnly />
      {mounted && attribution && ATTRIBUTION_KEYS.map((k) => <input key={k} type="hidden" name={k} value={attribution[k] ?? ""} readOnly />)}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          회사 웹사이트
          <input name="company_website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <Section no="01" title="문의 유형">
        <div id="lead-inquiry_type" tabIndex={-1} role="radiogroup" aria-label="문의 유형" aria-describedby={described("inquiry_type")} className="grid grid-cols-1 gap-2 outline-none xs:grid-cols-2 lg:grid-cols-3">
          {INQUIRY_TYPES.map((t) => (
            <Chip key={t.value} type="radio" name="inquiry_type" value={t.value} checked={inquiryType === t.value} onChange={() => setPickedType(t.value)}>
              {t.label}
            </Chip>
          ))}
        </div>
        <FieldError id="lead-inquiry_type" message={errors.inquiry_type} />
      </Section>

      <Section no="02" title="현장 · 회사 정보">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="lead-organization" required>
              회사 / 단지명
            </FieldLabel>
            <input
              id="lead-organization"
              name="organization"
              value={text.organization}
              onChange={(e) => set("organization", e.target.value)}
              autoComplete="organization"
              maxLength={100}
              placeholder="예) ○○아파트 / ○○호텔 / ○○기업"
              aria-invalid={Boolean(errors.organization)}
              aria-describedby={described("organization")}
              className={cn(inputBase, errors.organization ? "border-red-500" : "border-line-strong")}
            />
            <FieldError id="lead-organization" message={errors.organization} />
          </div>
          <div>
            <FieldLabel htmlFor="lead-region" required>
              지역
            </FieldLabel>
            <select
              id="lead-region"
              name="region"
              value={text.region}
              onChange={(e) => set("region", e.target.value)}
              aria-invalid={Boolean(errors.region)}
              aria-describedby={described("region")}
              className={cn(inputBase, errors.region ? "border-red-500" : "border-line-strong", !text.region && "text-muted")}
            >
              <option value="">시 · 도 선택</option>
              {REGIONS.map((r) => (
                <option key={r} value={r} className="text-ink">
                  {r}
                </option>
              ))}
            </select>
            <FieldError id="lead-region" message={errors.region} />
          </div>
          <div>
            <FieldLabel htmlFor="lead-facility_scale">시설 규모 / 세대수</FieldLabel>
            <input
              id="lead-facility_scale"
              name="facility_scale"
              value={text.facility_scale}
              onChange={(e) => set("facility_scale", e.target.value)}
              maxLength={100}
              placeholder="예) 1,200세대 / 호텔 250객실 / 피트니스 500평"
              aria-invalid={Boolean(errors.facility_scale)}
              aria-describedby={described("facility_scale")}
              className={cn(inputBase, errors.facility_scale ? "border-red-500" : "border-line-strong")}
            />
            <FieldError id="lead-facility_scale" message={errors.facility_scale} />
          </div>
        </div>
      </Section>

      <Section no="03" title="담당자 정보">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="lead-name" required>
              담당자명
            </FieldLabel>
            <input
              id="lead-name"
              name="name"
              value={text.name}
              onChange={(e) => set("name", e.target.value)}
              autoComplete="name"
              maxLength={50}
              placeholder="성함"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={described("name")}
              className={cn(inputBase, errors.name ? "border-red-500" : "border-line-strong")}
            />
            <FieldError id="lead-name" message={errors.name} />
          </div>
          <div>
            <FieldLabel htmlFor="lead-phone" required>
              연락처
            </FieldLabel>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              value={text.phone}
              onChange={(e) => set("phone", formatPhone(e.target.value))}
              autoComplete="tel"
              placeholder="010-0000-0000"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={described("phone")}
              className={cn(inputBase, errors.phone ? "border-red-500" : "border-line-strong")}
            />
            <FieldError id="lead-phone" message={errors.phone} />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="lead-email">이메일</FieldLabel>
            <input
              id="lead-email"
              name="email"
              type="email"
              inputMode="email"
              value={text.email}
              onChange={(e) => set("email", e.target.value)}
              autoComplete="email"
              maxLength={200}
              placeholder="name@company.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={described("email")}
              className={cn(inputBase, errors.email ? "border-red-500" : "border-line-strong")}
            />
            <FieldError id="lead-email" message={errors.email} />
          </div>
        </div>
        <div className="mt-6">
          <FieldLabel required>소속</FieldLabel>
          <div id="lead-organization_type" tabIndex={-1} role="radiogroup" aria-label="소속" aria-describedby={described("organization_type")} className="flex flex-wrap gap-2 outline-none">
            {ORGANIZATION_TYPES.map((o) => (
              <Chip key={o} type="radio" name="organization_type" value={o} checked={orgType === o} onChange={() => setPickedOrg(o)}>
                {o}
              </Chip>
            ))}
          </div>
          <FieldError id="lead-organization_type" message={errors.organization_type} />
        </div>
      </Section>

      <Section no="04" title="관심 서비스">
        <p className="-mt-2 mb-3 text-[0.8125rem] text-muted">하나 이상 선택해 주세요. 복수 선택할 수 있습니다.</p>
        <div id="lead-services" tabIndex={-1} role="group" aria-label="관심 서비스" aria-describedby={described("services")} className="flex flex-wrap gap-2 outline-none">
          {SERVICES.map((s) => (
            <Chip key={s} type="checkbox" name="services" value={s} checked={services.includes(s)} onChange={() => toggleService(s)}>
              {s}
            </Chip>
          ))}
        </div>
        <FieldError id="lead-services" message={errors.services} />
      </Section>

      <Section no="05" title="현재 운영 상황">
        <FieldLabel htmlFor="lead-current_operation">운영 상황</FieldLabel>
        <select
          id="lead-current_operation"
          name="current_operation"
          value={text.current_operation}
          onChange={(e) => set("current_operation", e.target.value)}
          aria-describedby={described("current_operation")}
          className={cn(inputBase, "border-line-strong sm:max-w-sm", !text.current_operation && "text-muted")}
        >
          <option value="">선택해 주세요</option>
          {CURRENT_OPERATIONS.map((m) => (
            <option key={m} value={m} className="text-ink">
              {m}
            </option>
          ))}
        </select>
        <FieldError id="lead-current_operation" message={errors.current_operation} />
      </Section>

      <Section no="06" title="문의 내용">
        <FieldLabel htmlFor="lead-message">문의 내용</FieldLabel>
        <textarea
          id="lead-message"
          name="message"
          rows={6}
          value={text.message}
          onChange={(e) => set("message", e.target.value)}
          maxLength={3000}
          placeholder="현재 운영 방식, 입주 예정 시기, 희망 운영 범위 등을 자유롭게 적어주세요."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={described("message")}
          className={cn(inputBase, "h-auto resize-y py-3.5 leading-relaxed", errors.message ? "border-red-500" : "border-line-strong")}
        />
        <p className="mt-1 text-right text-xs text-muted" aria-hidden>
          {text.message.length.toLocaleString()} / 3,000
        </p>
        <FieldError id="lead-message" message={errors.message} />
      </Section>

      <div className="mt-10 border-t border-line pt-8">
        <div className="bg-paper p-5 text-[0.8125rem] leading-relaxed text-body">
          <p className="font-semibold text-ink">개인정보 수집 · 이용 안내</p>
          <ul className="mt-2 space-y-1">
            <li>수집 항목: 회사/단지명, 지역, 시설 규모, 담당자명, 연락처, 이메일, 소속, 문의 내용</li>
            <li>이용 목적: 운영 상담 및 문의 회신</li>
            <li>보유 기간: 상담 완료 후 1년 (관계 법령에 따라 보관이 필요한 경우 해당 기간)</li>
          </ul>
          <Link href="/privacy" className="mt-2 inline-block font-semibold text-ink underline underline-offset-2">
            개인정보처리방침 전문 보기
          </Link>
        </div>
        <label className="mt-5 flex min-h-11 cursor-pointer items-center gap-3 text-[0.9375rem]">
          <input
            id="lead-privacy_agree"
            type="checkbox"
            name="privacy_agree"
            checked={privacy}
            onChange={(e) => setPrivacy(e.target.checked)}
            aria-invalid={Boolean(errors.privacy_agree)}
            aria-describedby={described("privacy_agree")}
            className="size-5 accent-ink"
          />
          <span>
            개인정보 수집 · 이용에 동의합니다. <span className="text-brand">*</span>
          </span>
        </label>
        <FieldError id="lead-privacy_agree" message={errors.privacy_agree} />
      </div>

      {state.status === "error" && state.message && (
        <p className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-[0.875rem] text-red-700" role="alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group mt-8 inline-flex h-15 w-full items-center justify-center gap-3 rounded-[4px] bg-brand px-8 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:min-w-72"
      >
        {pending ? (
          <>
            <LoaderCircle className="size-5 animate-spin" aria-hidden /> 접수 중…
          </>
        ) : (
          <>
            운영 상담 신청하기
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
