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
  defaultFormAttributes?: ApplicationFormAttributes | any;
};

const initialState: StateType = {
  showModal: false,
  caller: null,
  questionType: "Paragraph",
  question: defaultQuestion,
  defaultFormAttributes: {},
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SHOW":
      return { ...state, showModal: true, caller: action.caller };

    case "HIDE":
      return {
        ...state,
        showModal: false,
        questionType: initialState.questionType,
        question: defaultQuestion,
      };

    case "SET_FORM_ATTRS":
      console.log("form attrs: ", action.defaultFormAttributes);
      return {
        ...state,
        defaultFormAttributes: action.defaultFormAttributes,
      };

    case "CHANGE_QUESTION_TYPE":
      let updatedQuestion: any = {
        ...state.question,
        type: action.questionType,
      };
      return {
        ...state,
        questionType: action.questionType,
        question: updatedQuestion,
      };

    case "CHANGE_QUESTION":
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
        [editCaller as string]: formAttrs
      }

      return {
        ...state, 
        defaultFormAttributes: form,
        question: defaultQuestion
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
      {children}
    </ModalContext.Provider>
  );
};
