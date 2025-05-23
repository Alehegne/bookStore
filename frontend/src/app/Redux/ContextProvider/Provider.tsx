"use client";
import React from "react";
import { store } from "../store/cart";
import { Provider } from "react-redux";

interface InitProps {
  children: React.ReactNode;
}

const ReduxStateProvider: React.FC<InitProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxStateProvider;
