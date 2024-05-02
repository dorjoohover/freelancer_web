import {
  CreateFreelancerProfileStep,
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

export const reviewExample = [
  {
    star: 5,
    views: 2251,
  },
  {
    star: 4,
    views: 88,
  },
  {
    star: 3,
    views: 17,
  },
  {
    star: 2,
    views: 13,
  },
  {
    star: 1,
    views: 12,
  },
];

export const createFreelancerProfileSteps = [
  {
    step: 1,
    name: "Create your profile",
    enum: CreateFreelancerProfileStep.resume,
    title: "How would you like to tell us about yourself?",
    description:
      "We need to get a sense of your education, experience and skills. It’s quickest to import your information — you can edit it before your profile goes live.",
    next: undefined,
    nextUrl: CreateFreelancerProfileStep.title,
    skip: undefined,
  },
  {
    step: 2,
    name: "",
    enum: CreateFreelancerProfileStep.title,
    title: "Got it. Now, add a title to tell the world what you do.",
    description:
      "It’s the very first thing clients see, so make it count. Stand out by describing your expertise in your own words.",
    next: "add your experience",
    skip: undefined,
    nextUrl: CreateFreelancerProfileStep.employment,
    prevUrl: CreateFreelancerProfileStep.resume,
  },
  {
    step: 3,
    name: "",
    enum: CreateFreelancerProfileStep.employment,
    title: "If you have relevant work experience, add it here.",
    description:
      "Freelancers who add their experience are twice as likely to win work. But if you’re just starting out, you can still create a great profile. Just head on to the next page.",
    skip: true,
    next: "add your education",
    nextUrl: CreateFreelancerProfileStep.education,
    prevUrl: CreateFreelancerProfileStep.title,
  },
  {
    step: 4,
    name: "",
    enum: CreateFreelancerProfileStep.education,
    title: "Clients like to know what you know - add your education here.",
    description:
      "You don’t have to have a degree. Adding any relevant education helps make your profile more visible.",
    skip: true,
    nextUrl: CreateFreelancerProfileStep.languages,
    next: "add languages",
    prevUrl: CreateFreelancerProfileStep.employment,
  },
  {
    step: 5,
    name: "",
    enum: CreateFreelancerProfileStep.languages,
    title: "Looking good. Next, tell us which languages you speak.",
    description:
      "Upwork is global, so clients are often interested to know what languages you speak. English is a must, but do you speak any other languages?",

    prevUrl: CreateFreelancerProfileStep.education,
  },
];

export const regions = [
  { name: "Afghanistan", code: "AF" },
  { name: "Åland Islands", code: "AX" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "AndorrA", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Anguilla", code: "AI" },
  { name: "Antarctica", code: "AQ" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Aruba", code: "AW" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bermuda", code: "BM" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Bouvet Island", code: "BV" },
  { name: "Brazil", code: "BR" },
  { name: "British Indian Ocean Territory", code: "IO" },
  { name: "Brunei Darussalam", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Cape Verde", code: "CV" },
  { name: "Cayman Islands", code: "KY" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Christmas Island", code: "CX" },
  { name: "Cocos (Keeling) Islands", code: "CC" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Congo, The Democratic Republic of the", code: "CD" },
  { name: "Cook Islands", code: "CK" },
  { name: "Costa Rica", code: "CR" },
  { name: "Cote D'Ivoire", code: "CI" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Ethiopia", code: "ET" },
  { name: "Falkland Islands (Malvinas)", code: "FK" },
  { name: "Faroe Islands", code: "FO" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "French Guiana", code: "GF" },
  { name: "French Polynesia", code: "PF" },
  { name: "French Southern Territories", code: "TF" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Gibraltar", code: "GI" },
  { name: "Greece", code: "GR" },
  { name: "Greenland", code: "GL" },
  { name: "Grenada", code: "GD" },
  { name: "Guadeloupe", code: "GP" },
  { name: "Guam", code: "GU" },
  { name: "Guatemala", code: "GT" },
  { name: "Guernsey", code: "GG" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Heard Island and Mcdonald Islands", code: "HM" },
  { name: "Holy See (Vatican City State)", code: "VA" },
  { name: "Honduras", code: "HN" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran, Islamic Republic Of", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Isle of Man", code: "IM" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jersey", code: "JE" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Korea, Democratic People'S Republic of", code: "KP" },
  { name: "Korea, Republic of", code: "KR" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Lao People'S Democratic Republic", code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libyan Arab Jamahiriya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Macao", code: "MO" },
  { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Martinique", code: "MQ" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mayotte", code: "YT" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia, Federated States of", code: "FM" },
  { name: "Moldova, Republic of", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montserrat", code: "MS" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "Netherlands Antilles", code: "AN" },
  { name: "New Caledonia", code: "NC" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "Niue", code: "NU" },
  { name: "Norfolk Island", code: "NF" },
  { name: "Northern Mariana Islands", code: "MP" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestinian Territory, Occupied", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Pitcairn", code: "PN" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Qatar", code: "QA" },
  { name: "Reunion", code: "RE" },
  { name: "Romania", code: "RO" },
  { name: "Russian Federation", code: "RU" },
  { name: "RWANDA", code: "RW" },
  { name: "Saint Helena", code: "SH" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Pierre and Miquelon", code: "PM" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia and Montenegro", code: "CS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Georgia and the South Sandwich Islands", code: "GS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Svalbard and Jan Mayen", code: "SJ" },
  { name: "Swaziland", code: "SZ" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syrian Arab Republic", code: "SY" },
  { name: "Taiwan, Province of China", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania, United Republic of", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tokelau", code: "TK" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Turks and Caicos Islands", code: "TC" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "United States Minor Outlying Islands", code: "UM" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Venezuela", code: "VE" },
  { name: "Viet Nam", code: "VN" },
  { name: "Virgin Islands, British", code: "VG" },
  { name: "Virgin Islands, U.S.", code: "VI" },
  { name: "Wallis and Futuna", code: "WF" },
  { name: "Western Sahara", code: "EH" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" },
];

export const months = [
  {
    name: "January",
    value: 1,
  },
  {
    name: "February",
    value: 2,
  },
  {
    name: "March",
    value: 3,
  },
  {
    name: "April",
    value: 4,
  },
  {
    name: "May",
    value: 5,
  },
  {
    name: "June",
    value: 6,
  },
  {
    name: "July",
    value: 7,
  },
  {
    name: "August",
    value: 8,
  },
  {
    name: "September",
    value: 9,
  },
  {
    name: "October",
    value: 10,
  },
  {
    name: "November",
    value: 11,
  },
  {
    name: "December",
    value: 12,
  },
];

export const years = Array.from(
  { length: 100 },
  (_, i) => new Date(Date.now()).getFullYear() - i
).map((e) => e.toString());
export const futureYears = Array.from(
  { length: 100 },
  (_, i) => new Date(Date.now()).getFullYear() + 8 - i
).map((e) => e.toString());
