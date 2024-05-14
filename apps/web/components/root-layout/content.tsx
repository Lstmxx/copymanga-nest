export default function Content({ children }: { children: React.ReactNode }) {
  return <main className="flex-1 overflow-hidden">{children}</main>;
}
