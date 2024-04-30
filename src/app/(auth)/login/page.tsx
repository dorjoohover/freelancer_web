"use client";
import { AuthStrings, GlobalStrings } from "@/utils/string";
import {
  Box,
  Button,
  Loader,
  PasswordInput,
  rem,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const payload = useForm<{ email: string; password: string }>({
    initialValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = async () => {
    try {
      setLoading(true);
      const notif = notifications.show({
        loading: true,
        message: GlobalStrings.wait,
        title: GlobalStrings.info,
        autoClose: false,
        bg: "brand",
        color: "teal",
        withCloseButton: false,
      });

      let res = await fetch(`/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: payload.values.email,
          password: payload.values.password,
        }),
      }).then(async (d) => await d.json());
      notifications.update({
        id: notif,
        color: res.success ? "teal" : "red",
        loading: false,
        message: res.message,
        title: GlobalStrings.info,
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        autoClose: 2000,
      });
      if (res.success) router.push("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  return (
    <div>
      <Box maw={"600px"} w={"100%"} py={32} mx={"auto"}>
        <Title mb={20}>Join as a client or freelancer</Title>
        <form action="" onSubmit={payload.onSubmit(() => login())}>
          <Stack>
            <TextInput
              label={GlobalStrings.email}
              {...payload.getInputProps("email")}
            />
            <PasswordInput
              label={GlobalStrings.password}
              {...payload.getInputProps("password")}
            />
            <Box mx={'auto'}>
              <Button
             
                disabled={loading}
                pr={30}
                pl={loading ? 15 : 30}
                mt={16}
                bg={"brand"}
                radius={"xl"}
                type="submit"
              >
                {loading ? <Loader size={16} color={"white"} mr={5} /> : null}{" "}
                {AuthStrings.login}
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </div>
  );
}
