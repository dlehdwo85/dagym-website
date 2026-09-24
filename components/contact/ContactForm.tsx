"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, CircleCheck, LoaderCircle } from "lucide-react";
import {
  facilityOptions,
  formatPhone,
  inquiryTypes,
  organizationRoles,
  regionOptions,
  validateContact,
  type ContactErrors,
  type ContactPayload,
} from "@/lib/contact";
import { cn } from "@/lib/cn";
import { useSearchParam } from "@/lib/use-search-param";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-[2px] border bg-white px-4 text-[1rem] text-ink placeholder:text-mist-400 transition-colors focus:border-ink focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-ink/10";

function Field({
  label,
  required,
  error,
  hint,
  htmlFor,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 flex items-baseline gap-1 text-[0.875rem] font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-accent" aria-hidden>
            *
          </span>
        ) : (
          <span className="text-xs font-normal text-mist-400">(선택)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-2 text-[0.8125rem] text-red-600" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="mt-2 text-[0.8125rem] text-mist-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState<ContactPayload>({
    type: "",
    organization: "",
    role: "",
    name: "",
    phone: "",
    email: "",
    region: "",
    facilities: [],
    scale: "",
    message: "",
    privacy: false,
    website: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  // ?type=hilink 처럼 상담 유형이 지정되어 들어온 경우 미리 선택 (폼 자체는 정적 HTML 로 렌더링)
  const urlType = useSearchParam("type");
  const presetType = urlType && inquiryTypes.some((t) => t.value === urlType) ? urlType : "";
  const selectedType = values.type || presetType;

  const set = <K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleFacility = (f: string) =>
    set("facilities", values.facilities.includes(f) ? values.facilities.filter((x) => x !== f) : [...values.facilities, f]);

  const describedBy = (name: keyof ContactPayload) => (errors[name] ? `${id(name)}-error` : undefined);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...values, type: selectedType };
    const found = validateContact(payload);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${firstKey}"]`);
      el?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: ContactErrors; message?: string };
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setServerMessage(data.message ?? "전송 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        setStatus("error");
        return;
      }
      setStatus("success");
      window.scrollTo({ top: (formRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 120, behavior: "smooth" });
    } catch {
      setServerMessage("네트워크 연결을 확인한 뒤 다시 시도해 주세요.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-ink p-8 sm:p-12" role="status" aria-live="polite">
        <CircleCheck className="size-10 text-accent" strokeWidth={1.5} aria-hidden />
        <h2 className="t-h2 mt-8">상담 신청이 접수되었습니다.</h2>
        <p className="t-lead mt-5 max-w-xl text-mist-600">
          {values.organization} {values.name}님, 남겨주신 내용을 검토한 뒤 담당자가 연락드리겠습니다. 영업일 기준으로 순차
          회신됩니다.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/business" className="inline-flex h-12 items-center gap-2 bg-ink px-5 text-sm font-semibold text-white hover:bg-navy-800">
            사업영역 둘러보기 <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/hilink" className="inline-flex h-12 items-center gap-2 border border-ink/15 px-5 text-sm font-semibold hover:border-ink">
            HILINK 알아보기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${uid}-required-note`}>
      <p id={`${uid}-required-note`} className="text-[0.8125rem] text-mist-500">
        <span className="text-accent">*</span> 표시는 필수 입력 항목입니다.
      </p>

      {/* 01 상담 유형 */}
      <fieldset className="mt-8">
        <legend className="flex items-center gap-3 text-[0.875rem] font-semibold">
          <span className="t-num text-accent">01</span> 상담 유형 <span className="text-accent" aria-hidden>*</span>
        </legend>
        <div className="mt-4 grid grid-cols-1 gap-2 xs:grid-cols-2 lg:grid-cols-3" role="radiogroup" aria-describedby={describedBy("type")}>
          {inquiryTypes.map((t, i) => {
            const checked = selectedType === t.value;
            return (
              <label
                key={t.value}
                className={cn(
                  "relative flex min-h-14 cursor-pointer items-center gap-3 border px-4 py-3 text-[0.9375rem] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent",
                  checked ? "border-ink bg-ink text-white" : "border-mist-300 bg-white hover:border-ink",
                )}
              >
                <input
                  type="radio"
                  name="type"
                  value={t.value}
                  checked={checked}
                  onChange={() => set("type", t.value)}
                  className="sr-only"
                  data-field={i === 0 ? "type" : undefined}
                />
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded-full border",
                    checked ? "border-white bg-white" : "border-mist-400",
                  )}
                  aria-hidden
                >
                  {checked && <span className="size-2 rounded-full bg-ink" />}
                </span>
                {t.label}
              </label>
            );
          })}
        </div>
        {errors.type && (
          <p id={`${id("type")}-error`} className="mt-2 text-[0.8125rem] text-red-600" role="alert">
            {errors.type}
          </p>
        )}
      </fieldset>

      {/* 02 기본 정보 */}
      <fieldset className="mt-12">
        <legend className="flex items-center gap-3 text-[0.875rem] font-semibold">
          <span className="t-num text-accent">02</span> 기본 정보
        </legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="회사 / 단지명" required htmlFor={id("organization")} error={errors.organization}>
            <input
              id={id("organization")}
              data-field="organization"
              value={values.organization}
              onChange={(e) => set("organization", e.target.value)}
              autoComplete="organization"
              placeholder="예) OO아파트 입주자대표회의"
              aria-invalid={Boolean(errors.organization)}
              aria-describedby={describedBy("organization")}
              className={cn(inputBase, "h-13", errors.organization ? "border-red-500" : "border-mist-300")}
            />
          </Field>
          <Field label="구분" htmlFor={id("role")}>
            <select
              id={id("role")}
              value={values.role}
              onChange={(e) => set("role", e.target.value)}
              className={cn(inputBase, "h-13 border-mist-300", !values.role && "text-mist-400")}
            >
              <option value="">선택해 주세요</option>
              {organizationRoles.map((r) => (
                <option key={r} value={r} className="text-ink">
                  {r}
                </option>
              ))}
            </select>
          </Field>
          <Field label="담당자" required htmlFor={id("name")} error={errors.name}>
            <input
              id={id("name")}
              data-field="name"
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              autoComplete="name"
              placeholder="성함 / 직책"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy("name")}
              className={cn(inputBase, "h-13", errors.name ? "border-red-500" : "border-mist-300")}
            />
          </Field>
          <Field label="연락처" required htmlFor={id("phone")} error={errors.phone}>
            <input
              id={id("phone")}
              data-field="phone"
              type="tel"
              inputMode="tel"
              value={values.phone}
              onChange={(e) => set("phone", formatPhone(e.target.value))}
              autoComplete="tel"
              placeholder="010-0000-0000"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={describedBy("phone")}
              className={cn(inputBase, "h-13", errors.phone ? "border-red-500" : "border-mist-300")}
            />
          </Field>
          <Field label="이메일" required htmlFor={id("email")} error={errors.email}>
            <input
              id={id("email")}
              data-field="email"
              type="email"
              inputMode="email"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              autoComplete="email"
              placeholder="name@company.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy("email")}
              className={cn(inputBase, "h-13", errors.email ? "border-red-500" : "border-mist-300")}
            />
          </Field>
          <Field label="지역" required htmlFor={id("region")} error={errors.region}>
            <select
              id={id("region")}
              data-field="region"
              value={values.region}
              onChange={(e) => set("region", e.target.value)}
              aria-invalid={Boolean(errors.region)}
              aria-describedby={describedBy("region")}
              className={cn(inputBase, "h-13", errors.region ? "border-red-500" : "border-mist-300", !values.region && "text-mist-400")}
            >
              <option value="">시 · 도 선택</option>
              {regionOptions.map((r) => (
                <option key={r} value={r} className="text-ink">
                  {r}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </fieldset>

      {/* 03 시설 정보 */}
      <fieldset className="mt-12">
        <legend className="flex items-center gap-3 text-[0.875rem] font-semibold">
          <span className="t-num text-accent">03</span> 시설 정보
        </legend>
        <p className="mt-4 text-[0.875rem] font-semibold">
          시설 종류 <span className="text-xs font-normal text-mist-400">(선택 · 복수 선택 가능)</span>
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {facilityOptions.map((f) => {
            const on = values.facilities.includes(f);
            return (
              <label
                key={f}
                className={cn(
                  "inline-flex min-h-11 cursor-pointer items-center gap-2 border px-4 text-[0.9375rem] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent",
                  on ? "border-ink bg-ink text-white" : "border-mist-300 hover:border-ink",
                )}
              >
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleFacility(f)} />
                {on && <Check className="size-4" aria-hidden />}
                {f}
              </label>
            );
          })}
        </div>
        <div className="mt-6">
          <Field label="세대수 또는 시설 규모" htmlFor={id("scale")} hint="예) 1,200세대 / 커뮤니티 연면적 1,500㎡ / 골프 타석 12석">
            <input
              id={id("scale")}
              value={values.scale}
              onChange={(e) => set("scale", e.target.value)}
              placeholder="세대수 또는 시설 규모"
              aria-describedby={`${id("scale")}-hint`}
              className={cn(inputBase, "h-13 border-mist-300")}
            />
          </Field>
        </div>
      </fieldset>

      {/* 04 문의 내용 */}
      <fieldset className="mt-12">
        <legend className="flex items-center gap-3 text-[0.875rem] font-semibold">
          <span className="t-num text-accent">04</span> 문의 내용
        </legend>
        <div className="mt-4">
          <Field label="문의 내용" required htmlFor={id("message")} error={errors.message}>
            <textarea
              id={id("message")}
              data-field="message"
              rows={7}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="현재 운영 방식, 입주 예정 시기, 희망 운영 범위 등을 자유롭게 적어주세요."
              aria-invalid={Boolean(errors.message)}
              aria-describedby={describedBy("message")}
              maxLength={3000}
              className={cn(inputBase, "resize-y py-3.5 leading-relaxed", errors.message ? "border-red-500" : "border-mist-300")}
            />
          </Field>
          <p className="mt-1 text-right text-xs text-mist-400" aria-hidden>
            {values.message.length.toLocaleString()} / 3,000
          </p>
        </div>
      </fieldset>

      {/* honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
        </label>
      </div>

      {/* 개인정보 */}
      <div className="mt-10 border-t border-mist-200 pt-8">
        <div className="bg-mist-50 p-5 text-[0.8125rem] leading-relaxed text-mist-600">
          <p className="font-semibold text-ink">개인정보 수집 · 이용 안내</p>
          <ul className="mt-2 space-y-1">
            <li>수집 항목: 회사/단지명, 담당자명, 연락처, 이메일, 지역, 문의 내용</li>
            <li>이용 목적: 운영 상담 및 문의 회신</li>
            <li>보유 기간: 상담 완료 후 1년 (관계 법령에 따라 보관이 필요한 경우 해당 기간)</li>
          </ul>
          <Link href="/privacy" className="mt-2 inline-block font-semibold text-ink underline underline-offset-2">
            개인정보처리방침 전문 보기
          </Link>
        </div>
        <label className="mt-5 flex min-h-11 cursor-pointer items-center gap-3 text-[0.9375rem]">
          <input
            type="checkbox"
            data-field="privacy"
            checked={values.privacy}
            onChange={(e) => set("privacy", e.target.checked)}
            aria-invalid={Boolean(errors.privacy)}
            aria-describedby={describedBy("privacy")}
            className="size-5 accent-ink"
          />
          <span>
            개인정보 수집 · 이용에 동의합니다. <span className="text-accent">*</span>
          </span>
        </label>
        {errors.privacy && (
          <p id={`${id("privacy")}-error`} className="mt-1 text-[0.8125rem] text-red-600" role="alert">
            {errors.privacy}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-[0.875rem] text-red-700" role="alert">
          {serverMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-8 inline-flex h-15 w-full items-center justify-center gap-3 rounded-[2px] bg-accent px-8 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-accent-strong disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:min-w-72"
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle className="size-5 animate-spin" aria-hidden /> 전송 중…
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
