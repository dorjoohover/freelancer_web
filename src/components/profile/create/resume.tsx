import { CreateProfileString } from "@/utils/string";
import { Avatar, Box, Button, Text } from "@mantine/core";

export const FreelancerProfileCreateResume = ({
  manual,
  linkedin,
  resume,
}: {
  manual: () => void;
  resume: () => void;
  linkedin: () => void;
}) => {
  return (
    <>
      <Button
        radius={"lg"}
        variant="light"
        bg={"white"}
        color="brand"
        onClick={linkedin}
      >
        {CreateProfileString.linkedIn}
      </Button>
      <Button
        radius={"lg"}
        variant="light"
        bg={"white"}
        color="brand"
        onClick={resume}
      >
        {CreateProfileString.uploadResume}
      </Button>
      <Button
        radius={"lg"}
        variant="light"
        bg={"white"}
        color="brand"
        onClick={manual}
      >
        {CreateProfileString.fillManually}
      </Button>
    </>
  );
};

export const FreelanceProfileCreateResumeSide = () => {
  return (
    <Box>
      <Avatar
        size={60}
        mb={20}
        src={
          "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png"
        }
      />
      <Text>
        “Your Upwork profile is how you stand out from the crowd.It’s what you
        use to win work, so let’s make it a good one.”
      </Text>
    </Box>
  );
};
// export default FreelancerProfileCreateResume;
