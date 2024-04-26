
import { PostStep } from "./enum";

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

export const postStep = (value: PostStep): number => {
  switch (value) {
    case PostStep.title:
      return 1;
    case PostStep.skill:
      return 2;
    case PostStep.scope:
      return 3;
    case PostStep.budget:
      return 4;
    case PostStep.description:
      return 5;
    case PostStep.review:
      return 6;
    default:
      return 0;
  }
};

export const postNextStepString = (value: number) => {
  switch (value) {
    case 1:
      return {
        name: "Skills",
        url: PostStep.skill,
      };
    case 2:
      return {
        name: "Scope",
        url: PostStep.scope,
      };
    case 3:
      return {
        name: "Budget",
        url: PostStep.budget,
      };
    case 4:
      return {
        name: "Description",
        url: PostStep.description,
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
export const postPrevStepString = (value: number) => {
  switch (value) {
    case 2:
      return {
        name: "Title",
        url: PostStep.title,
      };
    case 3:
      return {
        name: "Skills",
        url: PostStep.skill,
      };
    case 4:
      return {
        name: "Scope",
        url: PostStep.scope,
      };
    case 5:
      return {
        name: "Budget",
        url: PostStep.budget,
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
