"use client";
import { AuthStrings, GlobalStrings } from "@/utils/string";
import {
  ActionIcon,
  Box,
  Button,
  Dialog,
  Drawer,
  Group,
  Modal,
  rem,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DefaultDialog } from "./dialog";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export const Navbar = ({ token }: { token?: string }) => {
  const pathname = usePathname();
  const auth = pathname?.includes("login") || pathname?.includes("register");
  const router = useRouter();
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
      if (res.success) router.refresh();
    } catch (error) {}
  };

  const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        pos={"fixed"}
        display={{ md: "block", base: "none" }}
        top={16}
        right={20}
        left={20}
        className="z-50"
      >
        <Group
          justify="space-between"
          bg={"dark"}
          className="rounded-2xl"
          px={"xl"}
          py={"md"}
        >
          <Link href={"/"}>
            <Title
              size={"30px"}
              ff={"heading"}
              c={"brand"}
              className="cursor-pointer"
            >
              FreeFlex
            </Title>
          </Link>
          {!auth && (
            <Group align="center" color="white" gap={"48px"}>
              <Link href={"/post"} className="text-white">
                Зар харах
              </Link>
              <Link href={"/post/create/title"} className="text-white">
                Зар үүсгэх
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
                <Button
                  color="brand"
                  onClick={() => {
                    setOpen(false);
                    handlers.open();
                  }}
                >
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
      <Box
        pos={"fixed"}
        display={{ md: "none", base: "block" }}
        top={10}
        right={12}
        left={12}
        className="z-50"
      >
        <Group
          justify="space-between"
          bg={"dark"}
          className="rounded-2xl"
          px={"sm"}
          py={"md"}
        >
          <Link href={"/"}>
            <Title
              size={"30px"}
              ff={"heading"}
              c={"brand"}
              className="cursor-pointer"
            >
              FreeFlex
            </Title>
          </Link>
          <ActionIcon
            size={42}
            variant="default"
            bg={"none"}
            className="border-none"
            aria-label="ActionIcon with size as a number"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {!open ? (
              <GiHamburgerMenu style={{ width: rem(24), height: rem(24) }} />
            ) : (
              <IoMdClose style={{ width: rem(24), height: rem(24) }} />
            )}
          </ActionIcon>
        </Group>

        <Drawer.Root
          offset={8}
          radius="md"
          opened={open}
          onClose={() => {
            setOpen(false);
          }}
          position="right"
          size={"xs"}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>
                {" "}
                <Title
                  size={"30px"}
                  ff={"heading"}
                  c={"brand"}
                  className="cursor-pointer"
                >
                  FreeFlex
                </Title>
              </Drawer.Title>
              <Drawer.CloseButton />
            </Drawer.Header>
            <Drawer.Body>
              <Box
                className="flex flex-col justify-between gap-5"
                h={"100%"}
                style={{
                  height: "100% !important",
                }}
              >
                {!auth ? (
                  <Stack color="white" gap={"48px"}>
                    <Link
                      href={"/post"}
                      onClick={() => setOpen(false)}
                      className="text-black"
                    >
                      Зар харах
                    </Link>
                    <Link
                      href={"/post/create/title"}
                      onClick={() => setOpen(false)}
                      className="text-black"
                    >
                      Зар үүсгэх
                    </Link>

                    {token === undefined ? (
                      <Stack align="center" color="white" gap={"16px"}>
                        <Link
                          href={"/login"}
                          onClick={() => setOpen(false)}
                          className="w-full text-center text-white px-10 py-2 bg-brand rounded"
                        >
                          Нэвтрэх
                        </Link>
                        <Link
                          href={"/register"}
                          onClick={() => setOpen(false)}
                          className="w-full text-center text-white px-10 py-2 bg-brand rounded"
                        >
                          Бүртгүүлэх
                        </Link>
                      </Stack>
                    ) : (
                      <Button color="brand" onClick={() => handlers.open()}>
                        {AuthStrings.logout}
                      </Button>
                    )}
                  </Stack>
                ) : (
                  <div></div>
                )}

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
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      </Box>
    </>
  );
};
