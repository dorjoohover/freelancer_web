"use client";
import { ProfileStrings } from "@/utils/string";
import { profileLinkValues } from "@/utils/values";
import { Box, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const ProfileSidebar = () => {
  const pathname = usePathname();
  return (
    <Stack gap={4} miw={200}>
      <Title order={1}>{ProfileStrings.profile}</Title>
      {profileLinkValues.map((link, i) => {
        return (
          <Link key={i} href={`/profile/${link.url}`}>
            <Box
              className={`border-s-2 ${
                pathname == `/profile/${link.url}`
                  ? "border-brand text-brand"
                  : "border-gray text-textGray"
              } px-2 py-2`}
            >
              {link.name}
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
};
