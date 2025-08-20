"use client";
import { Provider } from "react-redux";
import React, { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/stores/index";

interface IProps {
  children?: ReactNode;
}

const ProviderComponent = ({ children }: IProps) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
};

export default ProviderComponent;
