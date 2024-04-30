import { ReactNode } from "react";

export default function PostLayout({ children }: { children: ReactNode }) {
  return <div className="px-5 mt-4 py-4">{children}</div>;
}
