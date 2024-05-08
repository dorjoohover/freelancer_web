"use client";
import { RegisterCard } from "@/components/auth/cart";
import { UserType } from "@/utils/enum";
import { checkEmail, checkName, checkPassword } from "@/utils/function";
import { RegisterMessage } from "@/utils/message";
import { AuthStrings, GlobalStrings } from "@/utils/string";
import {
  Box,
  Button,
  Group,
  Loader,
  Notification,
  PasswordInput,
  rem,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconEyeCheck, IconEyeOff } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdOutlineBusinessCenter } from "react-icons/md";

export default function RegisterPage() {
  type RegisterType = {
    type?: UserType;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  };
  const [loading, setLoading] = useState(false);
  const payload = useForm<RegisterType>({
    initialValues: {
      lastname: "",
      firstname: "",
      email: "",
      password: "",
    },
    validate: {
      lastname: (value) =>
        !checkName(value)
          ? `${GlobalStrings.lastname} ${RegisterMessage.incomplete}`
          : null,
      firstname: (value) =>
        !checkName(value)
          ? `${GlobalStrings.firstname} ${RegisterMessage.incomplete}`
          : null,
      email: (value) =>
        !checkEmail(value)
          ? `${GlobalStrings.email} ${RegisterMessage.wrong}`
          : null,
      password: (value) =>
        !checkPassword(value)
          ? `${GlobalStrings.password} ${RegisterMessage.wrong}`
          : null,
    },
  });
  const [type, setType] = useState<UserType>();

  const router = useRouter();
  const register = async () => {
    try {
      setLoading(true);

      const notif = notifications.show({
        loading: true,
        bg: "brand",
        message: GlobalStrings.wait,
        title: GlobalStrings.info,
        autoClose: false,
        withCloseButton: false,
      });
      await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lastname: payload.values.lastname,
          firstname: payload.values.firstname,
          type: payload.values.type,
          email: payload.values.email,
          password: payload.values.password,
        }),
      })
        .then((d) => d.json())
        .then((d) => {
          notifications.update({
            id: notif,
            color: d.success ? "teal" : "red",
            loading: false,
            message: d.message,
            title: GlobalStrings.info,
            icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
            autoClose: 2000,
          });
          if (d.success) {
            router.push("/");
          }
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const handle = () => {
    payload.setValues((prev) => ({ ...prev, type: type }));
  };
  return (
    <Group align="start" justify="center" h={"calc(100vh - 103px)"}>
      <Box maw={"600px"} w={"100%"} py={32}>
        {payload?.values?.type != undefined ? (
          <Stack>
            <Title my={24} pb={8} ta={"center"}>
              {AuthStrings.joinClient}
            </Title>
            <form
              onSubmit={payload.onSubmit(() => register())}
              className="gap-5"
            >
              <Stack gap={20}>
                <Box className="flex gap-4 max-[600px]:flex-col">
                  <TextInput
                    flex={1}
                    label={GlobalStrings.lastname}
                    // placeholder={
                    //   UserStrings.registerNumber +
                    //   " эсвэл " +
                    //   UserStrings.phone.toLowerCase()
                    // }
                    // withAsterisk
                    {...payload.getInputProps("lastname")}
                  />
                  <TextInput
                    flex={1}
                    label={GlobalStrings.firstname}
                    {...payload.getInputProps("firstname")}
                  />
                </Box>
                <TextInput
                  label={GlobalStrings.email}
                  {...payload.getInputProps("email")}
                />

                <PasswordInput
                  visibilityToggleIcon={({ reveal }) =>
                    reveal ? (
                      <IconEyeOff
                        style={{
                          color: "#FF8600",
                          width: "var(--psi-icon-size)",
                          height: "var(--psi-icon-size)",
                        }}
                      />
                    ) : (
                      <IconEyeCheck
                        style={{
                          color: "#FF8600",
                          width: "var(--psi-icon-size)",
                          height: "var(--psi-icon-size)",
                        }}
                      />
                    )
                  }
                  label={GlobalStrings.password}
                  placeholder={`${GlobalStrings.password} (${RegisterMessage.passwordRequirement})`}
                  {...payload.getInputProps("password")}
                />

                <Box mx={"auto"} w={{ xl: "auto", base: "100%" }}>
                  {" "}
                  <Button
                    w={{ xl: "auto", base: "100%" }}
                    disabled={loading}
                    pr={30}
                    pl={loading ? 15 : 30}
                    mt={16}
                    bg={"brand"}
                    radius={"xl"}
                    type="submit"
                  >
                    {loading ? (
                      <Loader size={16} color={"white"} mr={5} />
                    ) : null}{" "}
                    {AuthStrings.register}
                  </Button>
                </Box>
              </Stack>
            </form>
          </Stack>
        ) : (
          <Box display={"flex"} className="flex-col">
            <Title my={24} pb={8} ta={"center"}>
              {AuthStrings.join}
            </Title>
            <Box
              mb={16}
              className="flex justify-between gap-8 max-[600px]:flex-col"
            >
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
            </Box>
            <Button
              my={20}
              mx={"auto"}
              w={{ xl: "auto", base: "100%" }}
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
