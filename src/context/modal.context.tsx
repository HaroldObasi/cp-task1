"use client";
import { Dispatch, createContext, useReducer, useEffect } from "react";
import {
  QuestionType,
  QuestionTemplate,
  ApplicationFormAttributes,
  PersonalInformationTemplate,
  ProfileTemplate,
} from "@/app/types/ApplicationForm";

type ActionType = {
  type: string;
  caller?: "personalInformation" | "profile" | "customisedQuestions" | null;
  key?: string;
  questionType?: QuestionType;
  question?: QuestionTemplate;
  defaultFormAttributes?: ApplicationFormAttributes;
  editIndex?: number;
  questionIndex?: number;
  formItemKey?: "internalUse" | "mandatory" | "show" | string;
  formItemField?: string;
  formItemValue?: boolean;
};

export const defaultQuestion: QuestionTemplate = {
  type: "Paragraph",
  question: "string",
  choices: ["string"],
  maxChoice: 0,
  disqualify: false,
  other: false,
};

type StateType = {
  showModal: boolean;
  caller?: "personalInformation" | "profile" | "customisedQuestions" | null;
  questionType?: QuestionType;
  question?: QuestionTemplate;
  globalEditMode: boolean;
  editIndex: number | null | undefined;
  defaultFormAttributes?: ApplicationFormAttributes;
};

const initialState: StateType = {
  showModal: false,
  caller: null,
  questionType: "Paragraph",
  question: defaultQuestion,
  defaultFormAttributes: {
    coverImage: "",
    personalInformation: {
      firstName: {
        internalUse: false,
        show: false,
      },
      lastname: {
        internalUse: false,
        show: false,
      },
      emailId: {
        internalUse: false,
        show: false,
      },
      phoneNumber: {
        internalUse: false,
        show: false,
      },
      nationality: {
        internalUse: false,
        show: false,
      },
      currentResidence: {
        internalUse: false,
        show: false,
      },
      idNumber: {
        internalUse: false,
        show: false,
      },
      dateOfBirth: {
        internalUse: false,
        show: false,
      },
      gender: {
        internalUse: false,
        show: false,
      },
      personalQuestions: [
        {
          id: "",
          type: "Paragraph",
          question: "",
          choices: [""],
          maxChoice: 0,
          disqualify: false,
          other: false,
        },
      ],
    },
    profile: {
      education: {
        show: true,
        mandatory: true,
      },
      experience: {
        show: true,
        mandatory: true,
      },
      resume: {
        show: true,
        mandatory: true,
      },
      profileQuestions: [
        {
          id: "",
          type: "Paragraph",
          question: "",
          choices: [""],
          maxChoice: 0,
          disqualify: false,
          other: false,
        },
      ],
    },
    customisedQuestions: [
      {
        id: "",
        type: "Paragraph",
        question: "",
        choices: [""],
        maxChoice: 0,
        disqualify: false,
        other: false,
      },
    ],
  },
  editIndex: null,
  globalEditMode: false,
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "SHOW":
      return { ...state, showModal: true, caller: action.caller };

    case "HIDE":
      return {
        ...state,
        editIndex: null,
        showModal: false,
        questionType: initialState.questionType,
        question: defaultQuestion,
        caller: null,
      };

    case "SET_FORM_ATTRS":
      return {
        ...state,
        defaultFormAttributes: action.defaultFormAttributes,
      };

    case "CHANGE_QUESTION_TYPE":
      let updatedQuestion: any = {
        ...defaultQuestion,
        type: action.questionType,
      };
      return {
        ...state,
        questionType: action.questionType,
        question: updatedQuestion,
      };

    case "ADD_QUESTION_FIELD":
      return {
        ...state,
        question: action.question,
      };

    case "CHANGE_QUESTION_TEXT":
      let updatedQuestionText = {
        ...state.question,
        question: action.question,
      };
      return {
        ...state,
        // question: updatedQuestionText,
      };

    case "UPDATE_FORM":
      const caller = action.caller as keyof ApplicationFormAttributes;
      const question = action.question;
      let key:
        | keyof Required<ApplicationFormAttributes>["profile"]
        | keyof ApplicationFormAttributes["personalInformation"];

      if (
        question === defaultQuestion ||
        question == undefined ||
        state.defaultFormAttributes == undefined
      ) {
        return { ...state };
      }

      if (caller === "coverImage") {
        return { ...state };
      }

      if (caller === "personalInformation") {
        key = "personalQuestions";
        const g = state.defaultFormAttributes[caller][key];
        if (g == undefined) {
          return state;
        }
        const updatedFormAttributes = {
          ...state.defaultFormAttributes[caller],
          [key]: [...g, question],
        };
        const updatedForm = {
          ...state.defaultFormAttributes,
          [caller as string]: updatedFormAttributes,
        };

        return {
          ...state,
          defaultFormAttributes: updatedForm,
        };
      } else if (caller === "profile") {
        key = "profileQuestions";
        const g = state.defaultFormAttributes?.[caller]?.[key];
        if (g == undefined) {
          return state;
        }
        const updatedFormAttributes = {
          ...state.defaultFormAttributes[caller],
          [key]: [...g, question],
        };
        const updatedForm = {
          ...state.defaultFormAttributes,
          [caller as string]: updatedFormAttributes,
        };

        return {
          ...state,
          defaultFormAttributes: updatedForm,
        };
      } else if (caller === "customisedQuestions") {
        const g = state.defaultFormAttributes?.[caller];
        if (g == undefined) {
          return { ...state };
        }
        return {
          ...state,
          defaultFormAttributes: {
            ...state.defaultFormAttributes,
            [caller]: [...g, question],
          },
        };
      }

    case "EDIT_FORM_INDEX":
      const editCaller = action.caller as keyof ApplicationFormAttributes;
      const editQuestion = action.question;
      let editKey:
        | keyof Required<ApplicationFormAttributes>["profile"]
        | keyof ApplicationFormAttributes["personalInformation"];
      const index: number = action.editIndex!;

      if (editCaller === "customisedQuestions") {
        const arrCopy = state?.defaultFormAttributes?.[editCaller];
        if (arrCopy == undefined || editQuestion == undefined) {
          return state;
        }
        arrCopy[index] = editQuestion;

        if (state.defaultFormAttributes) {
          return {
            ...state,
            defaultFormAttributes: {
              ...state.defaultFormAttributes,
              [editCaller]: arrCopy,
            },
            question: defaultQuestion,
          };
        } else {
          return state;
        }
      }

      if (editCaller === "personalInformation") {
        editKey = "personalQuestions";
        if (state.defaultFormAttributes) {
          const arrCopy = state.defaultFormAttributes[editCaller][editKey];
          if (arrCopy !== undefined && editQuestion) {
            arrCopy[index] = editQuestion;
          }

          const formAttrs = {
            ...state.defaultFormAttributes[editCaller!],
            [editKey]: arrCopy,
          };

          const form = {
            ...state.defaultFormAttributes,
            [editCaller as string]: formAttrs,
          };

          return {
            ...state,
            defaultFormAttributes: form,
            question: defaultQuestion,
          };
        }
      } else if (editCaller === "profile") {
        editKey = "profileQuestions";
        if (state.defaultFormAttributes) {
          const arrCopy = state.defaultFormAttributes?.[editCaller]?.[editKey];
          if (arrCopy !== undefined && editQuestion) {
            arrCopy[index] = editQuestion;
          }

          const formAttrs = {
            ...state.defaultFormAttributes[editCaller!],
            [editKey]: arrCopy,
          };

          const form = {
            ...state.defaultFormAttributes,
            [editCaller as string]: formAttrs,
          };

          return {
            ...state,
            defaultFormAttributes: form,
            question: defaultQuestion,
          };
        }
      }
    case "EDIT_MODE":
      let modeKey:
        | keyof Required<ApplicationFormAttributes>["profile"]
        | keyof ApplicationFormAttributes["personalInformation"];
      let returnObj = {};
      let eQuestion: QuestionTemplate | undefined = undefined;

      if (action.caller === "customisedQuestions") {
        if (state.defaultFormAttributes) {
          eQuestion =
            state.defaultFormAttributes[action.caller]?.[
              action.questionIndex as number
            ];
        }
        // return { ...state, questionType: question.type, question: question };
      } else if (action.caller === "personalInformation") {
        modeKey = "personalQuestions";
        if (state.defaultFormAttributes) {
          eQuestion =
            state.defaultFormAttributes[action.caller][modeKey]?.[
              action.questionIndex as number
            ];
        }
        // return { ...state, question: question, questionType: question.type };
      } else if (action.caller === "profile") {
        modeKey = "profileQuestions";
        if (state.defaultFormAttributes) {
          eQuestion =
            state.defaultFormAttributes?.[action.caller]?.[modeKey]?.[
              action.questionIndex as number
            ];
        }
        // return { ...state, question: question, questionType: question.type };
      }
      return {
        ...state,
        questionType: eQuestion?.type,
        caller: action.caller,
        editIndex: action.questionIndex,
        question: eQuestion,
      };

    case "CHANGE_FORM_ITEM":
      if (
        state.defaultFormAttributes &&
        action.caller &&
        action.formItemField
      ) {
        const newObject = {
          // @ts-ignore
          ...state.defaultFormAttributes?.[action.caller]?.[
            action.formItemField
          ],
          [action.formItemKey as string]: action.formItemValue,
        };

        const newFormField = {
          ...state.defaultFormAttributes[action.caller],
          [action.formItemField!]: newObject,
        };

        const newForm2 = {
          ...state.defaultFormAttributes,
          [action.caller!]: newFormField,
        };

        return { ...state, defaultFormAttributes: newForm2 };
      }

    case "DELETE_FORM_INDEX":
      if (action.caller === "customisedQuestions") {
        const newArr = state.defaultFormAttributes?.customisedQuestions;
        if (action.questionIndex !== undefined) {
          newArr?.splice(action.questionIndex, 1);
          const newObj = {
            ...state.defaultFormAttributes,
            customisedQuestions: newArr,
          };

          return {
            ...state,
            defaultFormAttributes: newObj as ApplicationFormAttributes,
          };
        }
      }

      if (action.caller === "personalInformation") {
        const newArr =
          state.defaultFormAttributes?.personalInformation.personalQuestions;
        if (action.questionIndex !== undefined) {
          newArr?.splice(action.questionIndex, 1);

          const newPersonalInformation = {
            ...state.defaultFormAttributes?.personalInformation,
            personalQuestions: newArr,
          };

          const newForm = {
            ...state.defaultFormAttributes,
            personalInformaton: newPersonalInformation,
          };

          return {
            ...state,
            defaultFormAttributes: newForm as ApplicationFormAttributes,
          };
        }
      }

      if (action.caller === "profile") {
        const newArr = state.defaultFormAttributes?.profile?.profileQuestions;
        if (action.questionIndex !== undefined) {
          newArr?.splice(action.questionIndex, 1);
          const newProfileInformation = {
            ...state.defaultFormAttributes?.profile,
            profileQuestions: newArr,
          };

          const newForm = {
            ...state.defaultFormAttributes,
            profile: newProfileInformation,
          };

          return {
            ...state,
            defaultFormAttributes: newForm as ApplicationFormAttributes,
          };
        }
      }

    default:
      return state;
  }
};

export const ModalContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {/* <ModalContext.Provider
      value={{ state: state as any, dispatch: dispatch as any }}
    > */}
      {children}
    </ModalContext.Provider>
  );
};
