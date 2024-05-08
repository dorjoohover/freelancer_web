import { Label } from "@/components/label";
import { checkName } from "@/utils/function";
import { RegisterMessage } from "@/utils/message";
import { CreateProfileString, Examples, GlobalStrings } from "@/utils/string";
import {
  educationDegree,
  futureYears,
  months,
  regions,
  years,
} from "@/utils/values";
import {
  Box,
  Button,
  Checkbox,
  Group,
  Select,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export type FreelancerEducationType = {
  school: string;
  degree: string;
  region: string;
  gpa: string;
  study: string;
  startDate: number | null;
  endDate: number | null;
  description: string;
};

export const FreelancerCreateProfileEducation = ({
  save,
  cancel,
}: {
  save: (e: FreelancerEducationType) => void;
  cancel: () => void;
}) => {
  const payload = useForm<FreelancerEducationType>({
    initialValues: {
      school: "",
      gpa: "",
      degree: "",
      region: "",
      endDate: null,
      description: "",
      study: "",
      startDate: null,
    },
    validate: {
      school: (value) =>
        checkName(value)
          ? null
          : `${GlobalStrings.school} ${RegisterMessage.insert}`,
      degree: (value) =>
        checkName(value)
          ? null
          : `${GlobalStrings.degree} ${RegisterMessage.insert}`,
      startDate: (value) =>
        checkName(value?.toString() ?? "")
          ? null
          : `${GlobalStrings.startDate} ${RegisterMessage.insert}`,
      endDate: (value, values) =>
        checkName(value?.toString() ?? "")
          ? null
          : `${GlobalStrings.endDate} ${RegisterMessage.insert}`,
    },
  });

  return (
    <form
      onSubmit={payload.onSubmit((e) => save(e))}
      className="flex flex-col gap-4"
    >
      <Select
        label={GlobalStrings.degree}
        withAsterisk
        {...payload.getInputProps("degree")}
        data={educationDegree.map((a) => a.value)}
      />
      <Select
        label={GlobalStrings.region}
        withAsterisk
        searchable
        {...payload.getInputProps("region")}
        data={regions.map((a) => a.name)}
      />
      <TextInput
        label={GlobalStrings.school}
        radius={"md"}
        placeholder={Examples.experienceSchool}
        withAsterisk
        {...payload.getInputProps("school")}
      />

      <Label text={GlobalStrings.attended} />
      <Group justify="space-between" gap={20}>
        <Select
          radius={"md"}
          flex={1}
          placeholder={GlobalStrings.from}
          value={
            payload.values.startDate == null
              ? null
              : `${payload.values.startDate}`
          }
          checkIconPosition="right"
          onChange={(e) => {
            if (e != null) {
              payload.setValues((prev) => ({
                ...prev,
                startDate: parseInt(e),
              }));
            }
          }}
          data={years}
        />
        <Select
          radius={"md"}
          flex={1}
          placeholder={GlobalStrings.to}
          value={
            payload.values.endDate == null ? null : `${payload.values.endDate}`
          }
          checkIconPosition="right"
          onChange={(e) => {
            if (e != null) {
              payload.setValues((prev) => ({
                ...prev,
                endDate: parseInt(e),
              }));
            }
          }}
          data={futureYears}
        />
      </Group>
      <TextInput
        radius={"md"}
        flex={1}
        label={GlobalStrings.study}
        placeholder={Examples.experienceStudy}
        withAsterisk
        {...payload.getInputProps("study")}
      />
      <TextInput
        radius={"md"}
        flex={1}
        label={GlobalStrings.gpa}
        withAsterisk
        {...payload.getInputProps("gpa")}
      />
      <Textarea
        label={GlobalStrings.description}
        rows={6}
        placeholder={Examples.experienceDescription}
        {...payload.getInputProps("description")}
      />
      <Box h={20} />
      <Group justify="end" align="center">
        <Group my={20} justify="end">
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
            onClick={() => {
              console.log(payload.values);
            }}
            radius={"xl"}
            type="submit"
            px={24}
            c={"white"}
            bg={"brand"}
          >
            {GlobalStrings.correct}
          </Button>
        </Group>
      </Group>
    </form>
  );
};
