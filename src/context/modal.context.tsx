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
        questionType: action.questionType,
        question: defaultQuestion,
      };
    case "SET_FORM_ATTRS":
      console.log("form attrs: ", action.defaultFormAttributes);
      return {
        ...state,
        defaultFormAttributes: action.defaultFormAttributes,
      };
    case "CHANGE_QUESTION_TYPE":
      const updatedQuestion: any = {
        ...state.question,
        type: action.questionType,
      };
      return {
        ...state,
        questionType: action.questionType,
        question: updatedQuestion,
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
