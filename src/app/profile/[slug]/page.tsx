import { InfoItem } from "@/components/profile/items";
import { ProfileListType } from "@/utils/enum";

export default function ProfileDynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  switch (params.slug) {
    case ProfileListType.info:
      return <InfoItem />;
    default:
      <>asdf</>;
  }
}
