import { GlobalStrings } from "@/utils/string";
import { Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import { ReactNode } from "react";
import { IoTimeOutline } from "react-icons/io5";

export const CreateFreelancerProfileContainer = ({
  step,
  name,
  title,
  description,
  children,
  side,
  back,
  next,
  nextString,
  active,
  skip,
}: {
  step: number;
  name: string;
  title: string;
  active: boolean;
  description?: string;
  children: ReactNode;
  side: ReactNode;
  back: () => void;
  next: () => void;
  skip?: () => void;
  nextString?: string;
}) => {
  return (
    <Box>
      <Box className="max-w-[1100px]  gap-20 mx-auto" h={"calc(100vh - 130px)"}>
        <Group>
          <Text>{step}/5</Text>
          <Text>{name}</Text>
          {step == 1 && (
            <Group gap={10}>
              <IoTimeOutline /> <Text>5-10 min</Text>
            </Group>
          )}
        </Group>

        <Stack mt={24}>
          <Title order={2}>{title}</Title>
          <Text>{description}</Text>
          <Box className="flex gap-8 max-[600px]:flex-col">
            <Stack flex={3}>{children}</Stack>
            <Box flex={1} />
            <Stack flex={2}>{side}</Stack>
          </Box>
        </Stack>
      </Box>
      <Box pos={"absolute"} bottom={16} left={16} right={16}>
        <Box w={"100%"} pos={"relative"} h={4} bg={"gray"}>
          <Box
            pos={"absolute"}
            top={0}
            left={0}
            bottom={0}
            bg={"brand"}
            className="rounded-lg transition-all"
            right={`${100 - (100 / 5) * step}%`}
          />
        </Box>
        <Box h={16} />
        <Group justify="space-between">
          <Button
            variant="light"
            radius={"lg"}
            color="gray"
            c={"brand"}
            onClick={back}
          >
            {GlobalStrings.back}
          </Button>

          {(nextString != undefined || step == 5) && (
            <Group justify="end">
              {skip != undefined && (
                <Button
                  radius={"lg"}
                  color="brand"
                  onClick={skip}
                  variant="light"
                >
                  {GlobalStrings.skip}
                </Button>
              )}
              <Button
                radius={"lg"}
                bg={"brand"}
                disabled={!active}
                onClick={next}
              >
                {step == 5
                  ? "Илгээх"
                  : `${GlobalStrings.next + " " + nextString}`}
              </Button>
            </Group>
          )}
        </Group>
      </Box>
    </Box>
  );
};

// export default CreateFreelancerProfileContainer;
