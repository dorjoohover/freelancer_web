import { ProfileSidebar } from "@/components/profile/sidebar";
import { ReactNode } from "react";
export default function EditProfileDynamicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex max-w-[1100px] gap-20 mx-auto">
      <ProfileSidebar />
      {children}
    </div>
  );
}
