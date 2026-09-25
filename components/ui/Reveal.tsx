type Props = {
  children: React.ReactNode;
  as?: "div" | "li" | "section" | "article";
  /** 이전 버전 호환용 — 더 이상 등장 애니메이션을 쓰지 않습니다 */
  delay?: number;
  className?: string;
};

/**
 * 과거 스크롤 등장 효과를 담당하던 래퍼.
 * 사진과 운영 내용이 먼저 보이도록 등장 애니메이션을 제거했고, 이제는 단순한 컨테이너입니다.
 */
export function Reveal({ children, as: Tag = "div", className }: Props) {
  return <Tag className={className}>{children}</Tag>;
}
