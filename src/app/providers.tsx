"use client"

import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./redux/store"
import type React from "react"

export function Providers({ children }: { children: React.ReactNode }) {
    if (typeof window === "undefined") {
        return <>{children}</>
    }

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}








