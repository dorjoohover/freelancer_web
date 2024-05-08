import { languageLevels } from "@/utils/values";
import { Button, Group, Select, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

export const FreelancerCreateProfileLanguage = ({
  languages,
  onClick,
}: {
  languages: {
    language: string;
    level: string;
  }[];
  onClick: (e: { language: string; level: string }) => void;
}) => {
  const [language, setLang] = useState({
    language: "",
    level: "",
  });
  return (
    <div className="w-full">
      <Group w={"full"}>
        <Title order={6} flex={2}>
          Хэл
        </Title>
        <Title order={6} flex={1}>
          Түвшин
        </Title>
      </Group>
      {languages.map((l, i) => {
        return (
          <Group key={i} w={"full"}>
            <Title fw={"normal"} order={6} flex={2}>
              {l.language}
            </Title>
            <Title fw={"normal"} order={6} flex={1}>
              {l.level}
            </Title>
          </Group>
        );
      })}

      <Group w={"100%"}>
        <TextInput
          flex={2}
          onChange={(e) => {
            setLang((prev) => ({ ...prev, language: e.target.value }));
          }}
        />
        <Select
          flex={1}
          data={languageLevels}
          onChange={(e) => setLang((prev) => ({ ...prev, level: e ?? "" }))}
        />
      </Group>

      <Button
        mt={12}
        variant="light"
        color="brand"
        radius={"lg"}
        leftSection={<IoMdAdd size={14} />}
        onClick={() => {
          setLang({
            language: "",
            level: "",
          });
          onClick(language);
        }}
      >
        Нэмэх
      </Button>
    </div>
  );
};
