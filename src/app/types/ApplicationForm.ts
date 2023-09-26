type ApplicationForm = {
  data: {
    id: string;
    type: string;
    attributes: ApplicationFormAttributes;
  };
};

type ApplicationFormAttributes = {
  coverImage: string;
  personalInformation: {
    firstName: PersonalInformationTemplate;
    lastname: PersonalInformationTemplate;
    emailId: PersonalInformationTemplate;
    phoneNumber: PersonalInformationTemplate;
    nationality: PersonalInformationTemplate;
    currentResidence: PersonalInformationTemplate;
    idNumber: PersonalInformationTemplate;
    dateOfBirth: PersonalInformationTemplate;
    gender: PersonalInformationTemplate;
    personalQuestions?: Array<QuestionTemplate>;
    [key: string]:
      | PersonalInformationTemplate
      | Array<QuestionTemplate>
      | undefined;
  };
  profile?: {
    education: ProfileTemplate;
    experience: ProfileTemplate;
    resume: ProfileTemplate;
    profileQuestions?: Array<QuestionTemplate>;
    [key: string]: ProfileTemplate | Array<QuestionTemplate> | undefined;
  };
  customisedQuestions?: Array<QuestionTemplate>;
};

type PersonalInformationTemplate = {
  internalUse: boolean;
  show: boolean;
};

type ProfileTemplate = {};

type QuestionTemplate = {
  id: string;
  type:
    | "Paragraph"
    | "ShortAnswer"
    | "YesNo"
    | "Dropdown"
    | "MultipleChoice"
    | "Date"
    | "Number"
    | "FileUpload";
  question: string;
  choices: Array<string>;
  maxChoice: number;
  disqualify: boolean;
  other: boolean;
};

export type { ApplicationForm };
