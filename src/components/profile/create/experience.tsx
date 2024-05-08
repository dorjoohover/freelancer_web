import { Label } from "@/components/label";
import { checkName } from "@/utils/function";
import { RegisterMessage } from "@/utils/message";
import { CreateProfileString, Examples, GlobalStrings } from "@/utils/string";
import {
  interestingDirection,
  months,
  postCategories,
  professionLevel,
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

export type FreelancerExperienceType = {
  title: string;
  company: string;
  level: string;
  companyDirect: string;
  profession: string;
  currentWorking: boolean;
  startDate: Date | null;
  endDate?: Date;
  description: string;
  startYear?: number;
  startMonth?: string;
  endYear?: number;
  endMonth?: string;
  salary: number;
};

export const FreelancerCreateProfileExperience = ({
  save,
  cancel,
}: {
  save: (e: FreelancerExperienceType) => void;
  cancel: () => void;
}) => {
  const payload = useForm<FreelancerExperienceType>({
    initialValues: {
      title: "",
      level: "",
      companyDirect: "",
      company: "",
      profession: "",
      currentWorking: false,
      description: "",
      startDate: null,
      salary: 0,
    },
    validate: {
      company: (value) =>
        checkName(value)
          ? null
          : `${GlobalStrings.company} ${RegisterMessage.insert}`,
      startDate: (value) =>
        checkName(value?.toString() ?? "")
          ? null
          : `${GlobalStrings.startDate} ${RegisterMessage.insert}`,
      endDate: (value, values) =>
        values.currentWorking
          ? null
          : checkName(value?.toString() ?? "")
          ? null
          : `${GlobalStrings.startDate} ${RegisterMessage.insert}`,
    },
  });
  const setDate = (
    key: keyof FreelancerExperienceType,
    value: string | undefined | number | Date
  ) => {
    payload.setValues((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <form
      onSubmit={payload.onSubmit((e) => save(e))}
      className="flex flex-col gap-4"
    >
      <TextInput
        label={GlobalStrings.company}
        radius={"md"}
        placeholder={Examples.experienceCompany}
        withAsterisk
        {...payload.getInputProps("company")}
      />
      <Select
        label={GlobalStrings.companyDirect}
        data={postCategories.map((i) => i.name)}
        {...payload.getInputProps("companyDirect")}
      />
      <Select
        label={GlobalStrings.directLevel}
        data={professionLevel.map((i) => i.value)}
        {...payload.getInputProps("level")}
      />
      <Select
        label={GlobalStrings.direct}
        data={interestingDirection.map((i) => i.value)}
        {...payload.getInputProps("profession")}
      />
      <Checkbox
        color="brand"
        checked={payload.values.currentWorking}
        onChange={(e) => {
          payload.setValues((prev) => ({
            ...prev,
            currentWorking: e.target.checked,
          }));
        }}
        label={CreateProfileString.currentlyRole}
      />
      <Group gap={10}>
        <Box flex={1}>
          <Label text={GlobalStrings.startDate} />
          <Group gap={10}>
            <Select
              placeholder={GlobalStrings.month}
              flex={1}
              value={payload.values.startMonth}
              data={months.map((m) => m.name)}
              checkIconPosition="right"
              onChange={(e) => {
                let value = e == null ? undefined : e;
                setDate("startMonth", value);
                payload.values.startYear != null && value != undefined
                  ? setDate(
                      "startDate",
                      new Date(
                        payload.values.startYear,
                        months.filter((m) => m.name == value)[0].value - 1
                      )
                    )
                  : null;
              }}
            />
            <Select
              placeholder={GlobalStrings.year}
              flex={1}
              data={years}
              searchable
              value={`${payload.values.startYear}`}
              onChange={(e) => {
                let value =
                  e == null
                    ? undefined
                    : isNaN(parseInt(e))
                    ? undefined
                    : parseInt(e);
                setDate("startYear", value);
                payload.values.startMonth != null && value != undefined
                  ? setDate(
                      "startDate",
                      new Date(
                        value,
                        months.filter(
                          (m) => m.name == payload.values.startMonth
                        )[0].value - 1
                      )
                    )
                  : null;
              }}
              checkIconPosition="right"
            />
          </Group>
          {/* <Text size="12px">{payload.}</Text> */}
        </Box>
        <Group gap={10} flex={1}>
          <Box flex={1}>
            <Label text={GlobalStrings.endDate} />
            {!payload.values.currentWorking ? (
              <Group gap={10}>
                <Select
                  placeholder={GlobalStrings.month}
                  flex={1}
                  data={months.map((m) => m.name)}
                  checkIconPosition="right"
                  onChange={(e) => {
                    let value = e == null ? undefined : e;
                    setDate("endMonth", value);
                    payload.values.endYear != null && value != undefined
                      ? setDate(
                          "endDate",
                          new Date(
                            payload.values.endYear,
                            months.filter((m) => m.name == value)[0].value - 1
                          )
                        )
                      : null;
                  }}
                  value={payload.values.endMonth}
                />
                <Select
                  placeholder={GlobalStrings.year}
                  flex={1}
                  data={years}
                  searchable
                  value={`${payload.values.endYear}`}
                  onChange={(e) => {
                    let value =
                      e == null
                        ? undefined
                        : isNaN(parseInt(e))
                        ? undefined
                        : parseInt(e);
                    setDate("endYear", value);
                    payload.values.endMonth != null && value != undefined
                      ? setDate(
                          "endDate",
                          new Date(
                            value,
                            months.filter(
                              (m) => m.name == payload.values.endMonth
                            )[0].value - 1
                          )
                        )
                      : null;
                  }}
                  checkIconPosition="right"
                />
              </Group>
            ) : (
              <Box
                h={36}
                display={"flex"}
                bg={"gray"}
                c={"labelGray"}
                className="justify-start px-3  rounded-lg items-center"
              >
                <Text size={"13px"}>{GlobalStrings.present}</Text>
              </Box>
            )}
          </Box>
        </Group>
      </Group>

      <TextInput
        label={GlobalStrings.salary}
        radius={"md"}
        rightSection={<>₮</>}
        withAsterisk
        value={payload.values.salary}
        onChange={(e) => {
          let value = 0;
          if (e.target.value != null) {
            value = isNaN(parseInt(e.target.value))
              ? 0
              : parseInt(e.target.value);
          }
          payload.setValues((prev) => ({ ...prev, salary: value }));
        }}
      />

      <Textarea
        label={GlobalStrings.description}
        rows={6}
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
