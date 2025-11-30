"use client";

import { Provider } from "react-redux";
import React, { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/stores/index";
import { SessionProvider } from "next-auth/react";
interface IProps {
  children?: ReactNode;
}

const ProviderComponent = ({ children }: IProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <SessionProvider>
            {children}
         </SessionProvider>
      </PersistGate>
    </Provider>
  );
};

export default ProviderComponent;
