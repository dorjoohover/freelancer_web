import { CreateFreelancerProfileStep, PostStep, UserType } from "./enum";

export const checkRegisterNumber = (value: string): boolean => {
  const re = /^[\u0430-\u044F]{2}[0-9]{8}$/;

  return re.test(value?.toLowerCase());
};
export const checkRegisterNumberLatin = (value: string): boolean => {
  const re = /^[a-z]{2}[0-9]{8}$/;

  return re.test(value?.toLowerCase());
};
export const checkEmail = (value: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(value?.toLowerCase());
};
export const checkPassword = (value: string): boolean => {
  return value?.length > 5;
};

export const checkName = (value: string): boolean => {
  return value === undefined ? false : value?.length > 1;
};

export const postStep = (value: PostStep, type: UserType): number => {
  switch (value) {
    case PostStep.title:
      return 1;
    case PostStep.skill:
      return type == UserType.CLIENT ? 2 : 0;
    case PostStep.scope:
      return type == UserType.CLIENT ? 3 : 0;
    case PostStep.about:
      return type == UserType.FREELANCER ? 2 : 0;
    case PostStep.budget:
      return type == UserType.CLIENT ? 4 : 3;
    case PostStep.description:
      return type == UserType.CLIENT ? 5 : 4;
    case PostStep.review:
      return type == UserType.CLIENT ? 6 : 5;
    default:
      return 0;
  }
};
export const profileCreateStep = (
  value: CreateFreelancerProfileStep
): number => {
  switch (value) {
    case CreateFreelancerProfileStep.resume:
      return 0;
    case CreateFreelancerProfileStep.title:
      return 1;
    case CreateFreelancerProfileStep.employment:
      return 2;
    case CreateFreelancerProfileStep.education:
      return 3;
    case CreateFreelancerProfileStep.languages:
      return 4;
    case CreateFreelancerProfileStep.success:
      return 5;
    // case CreateFreelancerProfileStep.skill:
    //   return 2;
    // case CreateFreelancerProfileStep.scope:
    //   return 3;
    // case CreateFreelancerProfileStep.budget:
    //   return 4;
    // case CreateFreelancerProfileStep.description:
    //   return 5;
    // case CreateFreelancerProfileStep.review:
    //   return 6;
    default:
      return 0;
  }
};

export const postNextStepString = (value: number, type: UserType) => {
  switch (value) {
    case 1:
      return type == UserType.CLIENT
        ? {
            name: "Skills",
            url: PostStep.skill,
          }
        : {
            name: "About",
            url: PostStep.about,
          };
    case 2:
      return type == UserType.CLIENT
        ? {
            name: "About",
            url: PostStep.about,
          }
        : {
            name: "Budget",
            url: PostStep.budget,
          };

    case 3:
      return type == UserType.CLIENT
        ? {
            name: "Budget",
            url: PostStep.budget,
          }
        : {
            name: "Description",
            url: PostStep.description,
          };
    case 4:
      return type == UserType.CLIENT
        ? {
            name: "Description",
            url: PostStep.description,
          }
        : {
            name: "",
            url: PostStep.review,
          };
    case 5:
      return {
        name: "",
        url: PostStep.review,
      };
    default:
      return {};
  }
};
export const postPrevStepString = (value: number, type: UserType) => {
  switch (value) {
    case 1:
      return {
        name: "Title",
        url: PostStep.title,
      };
    case 2:
      return {
        name: "Title",
        url: PostStep.title,
      };
    case 3:
      return type == UserType.CLIENT
        ? {
            name: "Skills",
            url: PostStep.skill,
          }
        : {
            name: "About",
            url: PostStep.about,
          };
    case 4:
      return type == UserType.CLIENT
        ? {
            name: "Scope",
            url: PostStep.scope,
          }
        : {
            name: "Budget",
            url: PostStep.budget,
          };
    case 5:
      return type == UserType.CLIENT
        ? {
            name: "Budget",
            url: PostStep.budget,
          }
        : {
            name: "Description",
            url: PostStep.description,
          };
    case 6:
      return {
        name: "Description",
        url: PostStep.description,
      };
    default:
      return {};
  }
};

export const DateFormat = (v: Date | null, symbol = "-") => {
  if (v == null || v == undefined || v.toString() == "") return "";
  let value = new Date(v);

  let month = value?.getMonth() + 1;
  let monthStr = month < 10 ? `0${month}` : `${month}`;
  let day = value?.getDate();

  let dayStr = day < 10 ? `0${day}` : `${day}`;

  return `${value?.getFullYear()}${symbol}${monthStr}${symbol}${dayStr}`;
};

export const priceFormat = (value: string) => {
  const reversed = value
    .split("")
    .reverse()
    .join("")
    .match(/.{1,3}/g);

  if (reversed != null) {
    return reversed.toString().split("").reverse().join("");
  } else {
    return 0;
  }
  // return value.
};

export const dateDif = (value: string) => {
  let now = new Date(Date.now());
  let date = new Date(value);
  let dif = new Date(now.getTime() - date.getTime());
  let year = dif.getUTCFullYear() - 1970;
  if (year > 0)
    return {
      unit: "years",
      value: year,
    };
  let month = dif.getUTCMonth();
  if (month > 0)
    return {
      unit: "months",
      value: month,
    };
  let day = dif.getUTCDate();
  if (day > 0)
    return {
      unit: "days",
      value: day,
    };
  let hour = dif.getUTCHours();
  if (hour > 0)
    return {
      unit: "hours",
      value: hour,
    };
  let minutes = dif.getUTCMinutes();
  if (minutes > 0)
    return {
      unit: "minutes",
      value: minutes,
    };
  let second = dif.getUTCSeconds();

  return {
    unit: "second",
    value: second,
  };
};
