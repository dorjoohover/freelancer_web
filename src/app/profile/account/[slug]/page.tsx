import { InfoItem } from "@/components/profile/items";
import { ProfileListType } from "@/utils/enum";

export default function ProfileDynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  return <>{params.slug}</>;
}
