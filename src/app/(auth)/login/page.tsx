"use client";
import { GlobalStrings } from "@/utils/string";
import { Button, PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function LoginPage() {
  const payload = useForm<{ email: string; password: string }>({
    initialValues: {
      email: "",
      password: "",
    },
  });
  const login = async () => {
    try {
      await fetch(`/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: payload.values.email,
          password: payload.values.password,
        }),
      })
        .then((d) => d.json())
        .then((d) => console.log(d));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Title>Join as a client or freelancer</Title>
      <form
        action=""
        onSubmit={payload.onSubmit(() => login())}
      >
        <TextInput {...payload.getInputProps("email")} />
        <PasswordInput {...payload.getInputProps("password")} />
        <Button type="submit">{GlobalStrings.login}</Button>
      </form>
    </div>
  );
}
