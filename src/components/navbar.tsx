"use client";
import { Box, Group, Title } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = ({token}: {token?: string}) => {
  const pathname = usePathname();
  const auth = pathname?.includes("login") || pathname?.includes("register");
  return (
    <Box pos={"fixed"} top={16} right={20} left={20} className="z-50">
      <Group
        justify="space-between"
        bg={"dark"}
        className="rounded-2xl"
        px={"xl"}
        py={"md"}
      >
        <Title size={"30px"} ff={"heading"} c={"brand"}>
          FreeFlex
        </Title>

        {!auth && (
          <Group align="center" color="white" gap={"48px"}>
            <Link href={"/"} className="text-white">
              Төрөл
            </Link>
            <Link href={"/"} className="text-white">
              Төрөл
            </Link>

            <Link href={"/login"} className="text-white">
              Нэвтрэх
            </Link>

            <Link
              href={"/register"}
              className="text-white px-10 py-2 bg-brand rounded"
            >
              Бүртгүүлэх
            </Link>
          </Group>
        )}
      </Group>
    </Box>
  );
};
