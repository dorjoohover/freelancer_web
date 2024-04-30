"use client";
import { AuthStrings, GlobalStrings } from "@/utils/string";
import { Box, Button, Dialog, Group, Modal, rem, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DefaultDialog } from "./dialog";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

export const Navbar = ({ token }: { token?: string }) => {
  const pathname = usePathname();
  const auth = pathname?.includes("login") || pathname?.includes("register");
  const router = useRouter()
  const [opened, handlers] = useDisclosure(false);
  const logout = async () => {
    try {
      const notif = notifications.show({
        loading: true,
        message: GlobalStrings.wait,
        title: GlobalStrings.info,
        autoClose: false,
        bg: "brand",
        color: "teal",
        withCloseButton: false,
      });
      const res = await fetch(`/api/auth/logout`).then((d) => d.json());
      notifications.update({
        id: notif,
        color: res.success ? "teal" : "red",
        loading: false,
        message: res.message,
        title: GlobalStrings.info,
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        autoClose: 2000,
      });
      if(res.success) router.refresh()
    } catch (error) {}
  };
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
            <Link href={"/post"} className="text-white">
              view post
            </Link>
            <Link href={"/post/create/title"} className="text-white">
              create post
            </Link>

            {token === undefined ? (
              <Group align="center" color="white" gap={"48px"}>
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
            ) : (
              <Button color="brand" onClick={() => handlers.open()}>
                {AuthStrings.logout}
              </Button>
            )}
          </Group>
        )}
      </Group>
      <DefaultDialog
        cancel={() => {
          handlers.close();
        }}
        correct={() => {
          handlers.close();
          logout();
        }}
        opened={opened}
        text={AuthStrings.checkOut}
      />
    </Box>
  );
};
