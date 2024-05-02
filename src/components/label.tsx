import { Group } from "@mantine/core";

export const Label = ({ text }: { text: string }) => {
  return (
    <Group gap={4}>
      <label className="m_8fdc1311 mantine-InputWrapper-label mantine-TextInput-label">
        {text}
      </label>
      <span className="m_78a94662 mantine-InputWrapper-required mantine-TextInput-required">
        *
      </span>
    </Group>
  );
};
