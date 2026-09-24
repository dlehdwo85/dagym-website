"use client";

import { useSyncExternalStore } from "react";

const EVENT = "searchparamchange";

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(EVENT, callback);
  };
}

/**
 * URL 쿼리 값을 읽는 훅.
 * next/navigation 의 useSearchParams 와 달리 정적 페이지를 클라이언트 전용 렌더링으로 전환하지 않으므로
 * 서버 HTML(SEO)은 기본 상태로 렌더링되고, 하이드레이션 후 실제 쿼리 값이 반영됩니다.
 */
export function useSearchParam(name: string): string | null {
  return useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get(name),
    () => null,
  );
}

/** 히스토리를 쌓지 않고 쿼리 값을 변경합니다. */
export function replaceSearchParam(name: string, value: string | null) {
  const url = new URL(window.location.href);
  if (value === null) url.searchParams.delete(name);
  else url.searchParams.set(name, value);
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event(EVENT));
}
