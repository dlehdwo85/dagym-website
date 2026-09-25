import Link from "next/link";
import { homeOperation } from "@/data/home";

/** 운영 방식 — 세 가지를 한 줄씩. 인력 구성 · 관리 주기 상세는 위탁운영 페이지로 연결 */
export function HomeFieldWork() {
  return (
    <section className="bg-paper py-16 lg:py-24" aria-labelledby="home-operation-title">
      <div className="container-x">
        <h2 id="home-operation-title" className="t-h2">
          운영 방식
        </h2>
        <ul className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3 lg:mt-10">
          {homeOperation.map((o) => (
            <li key={o.title} className="bg-white">
              <Link href={o.href} className="block h-full p-6 hover:bg-paper lg:p-8">
                <p className="t-h4">{o.title}</p>
                <p className="mt-1.5 text-body">{o.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
