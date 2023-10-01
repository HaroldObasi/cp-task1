"use client";
import { Dispatch, createContext, useReducer, useEffect } from "react";
import {
  QuestionType,
  QuestionTemplate,
  ApplicationFormAttributes,
} from "@/app/types/ApplicationForm";

type ActionType = {
  type: string;
  caller?: string;
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
  caller?: string | null;
  questionType?: QuestionType;
  question?: QuestionTemplate;
  globalEditMode: boolean;
  editIndex: number | null;
  defaultFormAttributes?: ApplicationFormAttributes | any;
};

const initialState: StateType = {
  showModal: false,
  caller: null,
  questionType: "Paragraph",
  question: defaultQuestion,
  defaultFormAttributes: {},
  editIndex: null,
  globalEditMode: false,
};

const reducer = (state: StateType, action: ActionType) => {
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
        question: updatedQuestionText,
      };

    case "UPDATE_FORM":
      let caller = action.caller;
      let question = action.question;
      let key: string = "";

      if (question === defaultQuestion) {
        return { ...state };
      }

      if (caller === "personalInformation") {
        key = "personalQuestions";
      } else if (caller === "profile") {
        key = "profileQuestions";
      } else if (caller === "customisedQuestions") {
        const updatedForm = {
          ...state.defaultFormAttributes,
          [caller]: [...state.defaultFormAttributes[caller!], question],
        };
        return { ...state, defaultFormAttributes: updatedForm };
      }

      const updatedFormAttributes = {
        ...state.defaultFormAttributes[caller!],
        [key]: [...state.defaultFormAttributes[caller!][key], question],
      };

      const updatedForm = {
        ...state.defaultFormAttributes,
        [caller as string]: updatedFormAttributes,
      };

      return {
        ...state,
        defaultFormAttributes: updatedForm,
      };
    case "EDIT_FORM_INDEX":
      let editCaller = action.caller;
      let editQuestion = action.question;
      let editKey: string = "";
      let index: number = action.editIndex!;

      if (editCaller === "customisedQuestions") {
        const arrCopy = state.defaultFormAttributes[editCaller!];
        arrCopy[index] = editQuestion;
        return { ...state, [editCaller]: arrCopy, question: defaultQuestion };
      }

      if (editCaller === "personalInformation") {
        editKey = "personalQuestions";
      } else if (editCaller === "profile") {
        editKey = "profileQuestions";
      }

      const arrCopy = state.defaultFormAttributes[editCaller!][editKey!];
      arrCopy[index] = editQuestion;

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
    case "EDIT_MODE":
      let modeKey: string = "";
      let returnObj = {};
      let eQuestion: QuestionTemplate | undefined = undefined;

      if (action.caller === "customisedQuestions") {
        eQuestion =
          state.defaultFormAttributes[action.caller][
            action.questionIndex as number
          ];

        // return { ...state, questionType: question.type, question: question };
      } else if (action.caller === "personalInformation") {
        modeKey = "personalQuestions";
        eQuestion =
          state.defaultFormAttributes[action.caller][modeKey][
            action.questionIndex as number
          ];
        // return { ...state, question: question, questionType: question.type };
      } else if (action.caller === "profile") {
        modeKey = "profileQuestions";
        eQuestion =
          state.defaultFormAttributes[action.caller][modeKey][
            action.questionIndex as number
          ];
        // return { ...state, question: question, questionType: question.type };
      }
      returnObj = {
        ...state,
        questionType: eQuestion?.type,
        caller: action.caller,
        editIndex: action.questionIndex,
        question: eQuestion,
      };
      return returnObj;

    case "CHANGE_FORM_ITEM":
      console.log(`${action.formItemKey}: `, action.formItemValue);
      const newObject = {
        ...state.defaultFormAttributes[action.caller!][action.formItemField!],
        [action.formItemKey!]: action.formItemValue,
      };

      console.log(`${action.formItemField}: `, newObject);

      const newFormField = {
        ...state.defaultFormAttributes[action.caller!],
        [action.formItemField!]: newObject,
      };

      console.log(`${action.caller}`, newFormField);

      const newForm2 = {
        ...state.defaultFormAttributes,
        [action.caller!]: newFormField,
      };

      console.log("defaultFormAttrs", newForm2);

      return { ...state, defaultFormAttributes: newForm2 };

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
  const [state, dispatch] = useReducer(reducer as any, initialState);

  return (
    <ModalContext.Provider
      value={{ state: state as any, dispatch: dispatch as any }}
    >
      {children}
    </ModalContext.Provider>
  );
};
