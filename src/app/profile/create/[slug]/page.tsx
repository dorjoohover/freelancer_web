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
import {
  FreelanceProfileCreateResumeSide,
  FreelancerProfileCreateResume,
} from "@/components/profile/create/resume";
import { CreateFreelancerProfileStep } from "@/utils/enum";
import { checkName, profileCreateStep } from "@/utils/function";
import { FreelancerProfileMessage } from "@/utils/message";
import { CreateProfileString } from "@/utils/string";
import { createFreelancerProfileSteps } from "@/utils/values";
import { ActionIcon, Box, Button, Modal, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { IoMdAdd } from "react-icons/io";
export type FreelancerProfileType = {
  role: string;
  experiences: FreelancerExperienceType[];
  educations: FreelancerEducationType[];
};
function CreateProfileDynamicPage({ params }: { params: { slug: string } }) {
  const step = profileCreateStep(
    params.slug.toLowerCase() as CreateFreelancerProfileStep
  );
  const [opened, { open, close }] = useDisclosure(false);
  const payload = useForm<FreelancerProfileType>({
    initialValues: {
      role: "",
      experiences: [],
      educations: [],
    },
    validate: {
      role: (value) =>
        !checkName(value) ? FreelancerProfileMessage.needRole : null,
    },
  });
  const router = useRouter();
  const active = () => {
    switch (step) {
      case 1:
        return checkName(payload.values.role);
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
  const skip = () => {};
  const next = () => {
    localStorage.setItem("profilePayload", JSON.stringify(payload));

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
    <Box>
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
          <TextInput
            label={CreateProfileString.professionalRoleLabel}
            placeholder={CreateProfileString.professionalRoleLabel}
            {...payload.getInputProps("role")}
          />
        )}
        {/* experience */}
        {step == 2 && (
          <>
            {payload.values.experiences.map((e, i) => {
              return <span key={i}>{e.company}</span>;
            })}

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

        {step == 4 && <>languages</>}
      </CreateFreelancerProfileContainer>
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
    <Box className="flex items-center gap-2  h-[242px]">
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
  );
};
