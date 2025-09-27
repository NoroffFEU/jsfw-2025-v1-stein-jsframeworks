export default function Skeleton({
  className = "",
  style,
}: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`animate-pulse rounded bg-white/10 ${className}`}
      style={style}
      aria-hidden
    />
  );
}