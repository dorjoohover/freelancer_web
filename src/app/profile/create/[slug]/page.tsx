"use client";
import { FreelancerExperienceCard } from "@/components/profile/cards";
import { CreateFreelancerProfileContainer } from "@/components/profile/create/container";
import {
  FreelancerCreateProfileEducation,
  FreelancerEducationType,
} from "@/components/profile/create/education";
import {
  FreelancerCreateProfileExperience,
  FreelancerExperienceType,
} from "@/components/profile/create/experience";
import { FreelancerCreateProfileLanguage } from "@/components/profile/create/language";
import {
  FreelanceProfileCreateResumeSide,
  FreelancerProfileCreateResume,
} from "@/components/profile/create/resume";
import { CreateFreelancerProfileStep } from "@/utils/enum";
import { checkName, profileCreateStep } from "@/utils/function";
import { FreelancerProfileMessage } from "@/utils/message";
import { CreateProfileString, GlobalStrings } from "@/utils/string";
import {
  createFreelancerProfileSteps,
  interestingDirection,
} from "@/utils/values";
import {
  ActionIcon,
  Box,
  Button,
  Modal,
  MultiSelect,
  Select,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { language } from "googleapis/build/src/apis/language";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
export type FreelancerProfileType = {
  role: string[];
  experiences: FreelancerExperienceType[];
  educations: FreelancerEducationType[];
  languages: {
    language: string;
    level: string;
  }[];
};
function CreateProfileDynamicPage({ params }: { params: { slug: string } }) {
  const step = profileCreateStep(
    params.slug.toLowerCase() as CreateFreelancerProfileStep
  );
  const [opened, { open, close }] = useDisclosure(false);
  const payload = useForm<FreelancerProfileType>({
    initialValues: {
      languages: [],
      role: [],
      experiences: [],
      educations: [],
    },
    validate: {
      role: (value) =>
        value.length > 0 ? FreelancerProfileMessage.needRole : null,
    },
  });
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("profilePayload") != null
    ) {
      let data = JSON.parse(localStorage.getItem("profilePayload") as string);

      payload.setValues(data);
    }
  }, []);
  const router = useRouter();
  const active = () => {
    switch (step) {
      case 1:
        return payload.values.role.length > 0;
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const send = async () => {
    try {
      const notif = notifications.show({
        loading: true,
        message: GlobalStrings.wait,
        title: GlobalStrings.info,
        autoClose: false,
        bg: "brand",
        color: "teal",
        withCloseButton: false,
      });
      let body = {
        role: payload.values.role,
        languages: payload.values.languages,
        experiences: payload.values.experiences,
        educations: payload.values.educations,
      };
      let res = await fetch("/api/user/profile/freelancer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((d) => d.json());
      notifications.update({
        id: notif,
        color: res.success ? "teal" : "red",
        loading: false,
        message: res.message,
        title: GlobalStrings.info,
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        autoClose: 2000,
      });

      if (res.success) router.push("/profile/create/success");
    } catch (error) {}
  };
  const skip = () => {};
  const next = () => {
    if (step == 4) {
      localStorage.setItem("profilePayload", JSON.stringify(payload.values));
      send();
      return;
    }

    let isPush = createFreelancerProfileSteps[step].next != undefined;
    if (isPush) {
      router.push(
        `/profile/create/${createFreelancerProfileSteps[step].nextUrl}`
      );
    }
  };
  const back = () => {
    if (step == 0) router.back();
    else {
      router.push(
        `/profile/create/${createFreelancerProfileSteps[step].prevUrl}`
      );
    }
  };
  return (
    <Box px={16}>
      {step != 5 && (
        <CreateFreelancerProfileContainer
          back={back}
          next={next}
          active={active()}
          skip={
            createFreelancerProfileSteps[step].skip != undefined
              ? skip
              : undefined
          }
          nextString={createFreelancerProfileSteps[step].next}
          name={createFreelancerProfileSteps[step].name}
          step={createFreelancerProfileSteps[step].step}
          description={createFreelancerProfileSteps[step].description}
          title={createFreelancerProfileSteps[step].title}
          side={step == 0 ? <FreelanceProfileCreateResumeSide /> : <></>}
        >
          {step == 0 && (
            <FreelancerProfileCreateResume
              linkedin={() => {}}
              manual={() => {
                router.push(
                  `/profile/create/${createFreelancerProfileSteps[step].nextUrl}`
                );
              }}
              resume={() => {}}
            />
          )}
          {step == 1 && (
            <MultiSelect
              {...payload.getInputProps("role")}
              data={interestingDirection.map((a) => a.value)}
            />
          )}
          {/* experience */}
          {step == 2 && (
            <>
              <Modal
                opened={opened}
                onClose={close}
                title={CreateProfileString.addExperience}
                centered
                size={"lg"}
                closeOnClickOutside={false}
                radius={"lg"}
              >
                <FreelancerCreateProfileExperience
                  cancel={close}
                  save={(e: FreelancerExperienceType) => {
                    const experiences = [...payload.values.experiences, e];
                    payload.setValues((prev) => ({
                      ...prev,
                      experiences: experiences,
                    }));

                    close();
                  }}
                />
              </Modal>
              <CardWrapper
                addString={CreateProfileString.addExp}
                edit={(e) => {}}
                data={payload.values.experiences}
                open={open}
                remove={(i) => {
                  let exp = payload.values.experiences

                    .slice(0, i)
                    .concat(payload.values.experiences.slice(i + 1));

                  payload.setValues((prev) => ({
                    ...prev,
                    experiences: exp,
                  }));
                }}
                type={CreateFreelancerProfileStep.employment}
              />
            </>
          )}
          {/* education */}
          {step == 3 && (
            <>
              {payload.values.educations.map((e, i) => {
                return <span key={i}>{e.school}</span>;
              })}

              <Modal
                opened={opened}
                onClose={close}
                title={CreateProfileString.addEducation}
                centered
                size={"lg"}
                closeOnClickOutside={false}
                radius={"lg"}
              >
                <FreelancerCreateProfileEducation
                  cancel={close}
                  save={(e) => {
                    const educations = [...payload.values.educations, e];
                    payload.setValues((prev) => ({
                      ...prev,
                      educations: educations,
                    }));
                    close();
                  }}
                />
              </Modal>
              <CardWrapper
                addString={CreateProfileString.addEdu}
                edit={(e) => {}}
                data={payload.values.educations}
                open={open}
                remove={(i) => {
                  let exp = payload.values.experiences

                    .slice(0, i)
                    .concat(payload.values.experiences.slice(i + 1));

                  payload.setValues((prev) => ({
                    ...prev,
                    experiences: exp,
                  }));
                }}
                type={CreateFreelancerProfileStep.education}
              />
            </>
          )}

          {step == 4 && (
            <FreelancerCreateProfileLanguage
              languages={payload.values.languages}
              onClick={(e) => {
                let languages = [...payload.values.languages, e];
                payload.setValues((prev) => ({
                  ...prev,
                  languages: languages,
                }));
              }}
            />
          )}
        </CreateFreelancerProfileContainer>
      )}
      {step == 5 && (
        <div className="flex w-full items-center flex-col">
          <Title>Амжилттай шинэчиллээ.</Title>
          <div>
            <Button
              mt={20}
              variant="light"
              radius={"lg"}
              onClick={() => router.push("/")}
            >
              Үндсэн хуудас
            </Button>
          </div>
        </div>
      )}
    </Box>
  );
}

export default CreateProfileDynamicPage;

const CardWrapper = ({
  open,
  remove,
  edit,
  data,
  type,
  addString,
}: {
  data: FreelancerExperienceType[] | FreelancerEducationType[];
  open: () => void;
  edit: (i: number) => void;
  remove: (i: number) => void;
  type: CreateFreelancerProfileStep;
  addString: string;
}) => {
  let list =
    type == CreateFreelancerProfileStep.education
      ? (data as FreelancerEducationType[])
      : (data as FreelancerExperienceType[]);
  return list.length == 0 ? (
    <Box
      className="rounded-lg border-2 border-dashed border-gray flex flex-col justify-center cursor-pointer"
      p={30}
      w={400}
      h={200}
      onClick={open}
    >
      <Box>
        <ActionIcon
          bg={"none"}
          size={40}
          radius={"100%"}
          className="border border-brand"
          c="brand"
        >
          <IoMdAdd className="text-[26px]" />{" "}
        </ActionIcon>
        <Text mt={10} size="20px">
          {addString}
        </Text>
      </Box>
    </Box>
  ) : (
    <Box className="flex max-[600px]:flex-col max-[600px]:items-start items-center gap-2  h-[242px]">
      <ActionIcon
        bg={"none"}
        size={40}
        radius={"100%"}
        className="border border-brand"
        c="brand"
        onClick={open}
      >
        <IoMdAdd className="text-[26px]" />{" "}
      </ActionIcon>
      <Box className="flex max-[600px]:flex-col w-full">
        {list.map((e, i) => {
          return (
            <FreelancerExperienceCard
              edit={() => edit(i)}
              remove={() => remove(i)}
              d={e}
              type={type}
              key={i}
            />
          );
        })}
      </Box>
    </Box>
  );
};
