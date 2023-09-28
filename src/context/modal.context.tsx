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
  question?: string;
  defaultFormAttributes?: ApplicationFormAttributes;
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

      if (caller === "personalInformation") {
        key = "personalQuestions";
      } else if (caller === "profile") {
        key = "profileQuestions";
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
