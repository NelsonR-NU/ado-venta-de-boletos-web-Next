"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../../business-logic/store/store";
import { FC, ReactNode } from "react";

const ClientProvider: FC<{
  children: ReactNode;
}> = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);

export default ClientProvider;
