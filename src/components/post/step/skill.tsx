import { PostStrings } from "@/utils/string";
import { postExampleTitles, skills } from "@/utils/values";
import {
  Box,
  Button,
  Flex,
  Group,
  List,
  rem,
  Select,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconCircleCheck, IconXboxX } from "@tabler/icons-react";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";

export const PostSkillStep = ({
  selected,
  setSkills,
}: {
  selected: { id: string; name: string }[];
  setSkills: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        name: string;
      }[]
    >
  >;
}) => {
  return (
    <Box>
      <Group>
        <Text>2/5</Text>
        <Text>{PostStrings.jobPost}</Text>
      </Group>

      <Group gap={40} align="start">
        <Stack flex={2} mt={24}>
          <Title order={2}>{PostStrings.skillTitleText}</Title>
        </Stack>

        <Stack flex={3}>
          <PostSkillCard
            selected={selected}
            onChange={(e) => {
              setSkills((prev) => [
                ...prev,
                skills.filter((skill) => skill.name == e)[0],
              ]);
            }}
            onClick={(id: string) =>
              setSkills(selected.filter((select) => select.id != id))
            }
            add={(skill: { id: string; name: string }) => {
              setSkills((prev) => [...prev, skill]);
            }}
          />
        </Stack>
      </Group>
    </Box>
  );
};

export const PostSkillCard = ({
  onChange,
  selected,
  onClick,
  add,
}: {
  onClick: (id: string) => void;
  add: (skill: { id: string; name: string }) => void;
  selected: { id: string; name: string }[];
  onChange: (e: string) => void;
}) => {
  return (
    <Box>
      <Select
        label={PostStrings.searchSkillLabel}
        data={skills.map((skill) => skill.name)}
        onChange={(e) => {
          if (e != null) onChange(e);
        }}
        searchable
      />

      {selected.length > 0 && (
        <Stack>
          <Text fw={600}>{PostStrings.selectedSkills}</Text>
          <Flex gap={10} wrap={"wrap"}>
            {selected.map((s, i) => {
              return (
                <Button
                  variant="light"
                  color="black"
                  radius={"xl"}
                  key={i}
                  onClick={() => onClick(s.id)}
                  rightSection={<IconXboxX size={20} />}
                >
                  {s?.name}
                </Button>
              );
            })}
          </Flex>
        </Stack>
      )}
      <Text fw={600}>{PostStrings.popularSkillFor}</Text>
      <Flex gap={10}>
        {skills.map((skill, i) => {
          return (
            <Button
              variant="light"
              color="black"
              radius={"xl"}
              key={i}
              onClick={() => add(skill)}
              rightSection={<IoAddOutline size={20} />}
            >
              {skill?.name}
            </Button>
          );
        })}
      </Flex>
    </Box>
  );
};
