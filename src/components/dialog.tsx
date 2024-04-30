import { GlobalStrings } from "@/utils/string";
import { Button, Dialog, Group, Title } from "@mantine/core";

export const DefaultDialog = ({
  correct,
  opened,
  cancel,
  text,
}: {
  correct: () => void;
  cancel: () => void;
  text: string;
  opened: boolean;
}) => {
  return (
    <Dialog position={{ top: "50%", left: "50%" }} opened={opened} withBorder className="border-2 border-brand">
      <Title order={3}>{text}</Title>
      <Group my={20} justify="space-between" mx={20}>
        <Button
          c={"brand"}
          radius={"xl"}
          px={24}
          color="gray"
          variant="light"
          onClick={cancel}
        >
          {GlobalStrings.cancel}
        </Button>

        <Button
          radius={"xl"}
          onClick={correct}
          px={24}
          c={"white"}
          bg={"brand"}
        >
          {GlobalStrings.correct}
        </Button>
      </Group>
    </Dialog>
  );
};
