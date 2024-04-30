import {
  PostScopeDuration,
  PostScopeLevel,
  PostScopeSize,
  ProfileListType,
} from "./enum";

export const profileLinkValues = [
  {
    name: "My info",
    url: ProfileListType.info,
  },
  {
    name: "Billing & Payments",
    url: ProfileListType.payments,
  },
  {
    name: "Password & Security",
    url: ProfileListType.security,
  },
  {
    name: "Membership Benefits",
    url: ProfileListType.membership,
  },
  {
    name: "Teams",
    url: ProfileListType.teams,
  },
  {
    name: "Nofification Settings",
    url: ProfileListType.notification,
  },
  {
    name: "Members & Permissions",
    url: ProfileListType.members,
  },
  {
    name: "Tax Information",
    url: ProfileListType.tax,
  },
  {
    name: "Connected Services",
    url: ProfileListType.services,
  },
];

export const postExampleTitles = [
  "Build responsive WordPress site with booking/payment functionality",
  "Graphic designer needed to design ad creative for multiple campaigns",
  "Facebook ad specialist needed for product launch",
];

export const skills = [
  {
    name: "Web application",
    id: "webApplication",
  },
  {
    name: "Ai bot",
    id: "aiBot",
  },
  {
    name: "Ai development",
    id: "aiDevelopment",
  },
];

export const postScopeSizes = [
  {
    name: "Large",
    id: PostScopeSize.large,
    description:
      "Longer term or complex initiatives (ex. design and build a full website) ",
  },
  {
    name: "Medium",
    id: PostScopeSize.medium,
    description: "Well-defined projects (ex. a landing page)  ",
  },
  {
    name: "Small",
    id: PostScopeSize.small,
    description:
      "Quick and straightforward tasks (ex. update text and images on a webpage) ",
  },
];
export const postScopeDuration = [
  {
    name: "3 to 6 months ",
    id: PostScopeDuration.threeSixMonth,
    description: "",
  },
  {
    name: "1 to 3 months ",
    id: PostScopeDuration.oneThreeMonth,
    description: "",
  },
  {
    name: "Less than 1 month ",
    id: PostScopeDuration.lessOneMonth,
    description: "",
  },
];


export const postScopeLevel = [
  {
    name: "Entry ",
    id: PostScopeLevel.entry,
    description: "Looking for someone relatively new to this field ",
  },
  {
    name: "Intermediate ",
    id: PostScopeLevel.intermediate,
    description: "Looking for substantial experience in this field  ",
  },
  {
    name: "Expert",
    id: PostScopeLevel.expert,
    description: "Looking for comprehensive and deep expertise in this field ",
  },
];

export class ScopeQuestions {
  static level = {
    question: "What level of experience will it need? ",
    description:
      "This won't restrict any proposals, but helps match expertise to your budget.",
  };
  static duration = {
    question: "How long will your work take? ",
  };
}

export const PostDescriptionExample = [
  "Clear expectations about your task or deliverables",
  "The skills required for your work",
  "Good communication",
  "Details about how you or your team like to work",
];

export const postCategories = [
  {
    id: "hurgelt",
    name: "Хүргэлт",
  },
  {
    id: "hool",
    name: "Хоол",
  },
  {
    id: "uildverlel",
    name: "Үйлдвэрлэл",
  },
  {
    id: "barilga",
    name: "Барилга",
  },
  {
    id: "it",
    name: "Мэдээллийн технологи",
  },
  {
    id: "sport&fitness",
    name: "Спорт&фитнес",
  },
  {
    id: "bolovsrol",
    name: "Боловсрол",
  },
  {
    id: "hudaldaa",
    name: "Худалдаа",
  },
  {
    id: "huuhedAsrah",
    name: "Хүүхэд асрах",
  },
  {
    id: "uilchilgee",
    name: "Үйлчилгээ",
  },
  {
    id: "eruul mend",
    name: "Эрүүл мэнд",
  },
  {
    id: "sanhuu",
    name: "Санхүү",
  },
  {
    id: "operator",
    name: "Оператор",
  },
  {
    id: "jolooch",
    name: "Жолооч",
  },
  {
    id: "huuli",
    name: "Хууль",
  },
  {
    id: "sudalgaa",
    name: "Судалгаа",
  },
  {
    id: "makeUp&beauty",
    name: "Гоо сайхан",
  },
  {
    id: "event",
    name: "Арга хэмжээ",
  },
  {
    id: "businessTosol",
    name: "Бизнес, төсөл",
  },
  {
    id: "marketingZar",
    name: "Маркетинг, зар",
  },
  {
    id: "aylalJuuchlal",
    name: "Аялал жуучлал",
  },
  {
    id: "copywriter",
    name: "Бичээч",
  },
];
