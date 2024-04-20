"use client";
import { RegisterCard } from "@/components/auth/cart";
import { UserType } from "@/utils/enum";
import { AuthStrings } from "@/utils/string";
import { Box, Button, Group, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdOutlineBusinessCenter } from "react-icons/md";

export default function RegisterPage() {
  type RegisterType = {
    type?: UserType;
  };
  const [type, setType] = useState<UserType>();

  const [payload, setPayload] = useState<RegisterType>();
  const router = useRouter();

  const handle = () => {
    setPayload((prev) => ({ ...prev, type: type }));
  };
  return (
    <Group align="start" justify="center" h={"calc(100vh - 103px)"}>
      <Box maw={"600px"} w={"100%"}>
        {payload?.type != undefined ? (
          <>register</>
        ) : (
          <Box display={"flex"} className="flex-col">
            <Title my={24} pb={8} ta={"center"}>
              {AuthStrings.join}
            </Title>
            <Group gap={32} mb={16} justify="space-between">
              <RegisterCard
                active={type == UserType.CLIENT}
                Icon={MdOutlineBusinessCenter}
                onClick={() => {
                  setType(UserType.CLIENT);
                }}
                text={AuthStrings.registerClient}
              />
              <RegisterCard
                active={type == UserType.FREELANCER}
                Icon={MdOutlineBusinessCenter}
                onClick={() => {
                  setType(UserType.FREELANCER);
                }}
                text={AuthStrings.registerFreelancer}
              />
            </Group>
            <Button
              my={20}
              mx={"auto"}
              bg={type == undefined ? "gray" : "brand"}
              c={type == undefined ? "textGray" : "white"}
              disabled={type == undefined}
              radius={"xl"}
              onClick={handle}
            >
              {type == undefined
                ? AuthStrings.createAccount
                : type == UserType.CLIENT
                ? AuthStrings.joinClient
                : AuthStrings.applyFreelance}
            </Button>
            <span className="text-center">
              {AuthStrings.alreadyAccount}
              <Link href={"/login"} className="text-brand underline mx-1">
                {AuthStrings.login}
              </Link>
            </span>
          </Box>
        )}
      </Box>
    </Group>
  );
}
