"use client"

import React from "react";
import { TCode, TSecretcodeContext } from "@/types";


type Props = {
    children: React.ReactNode
}

const passwordDetails: TCode = {
    code: ""
}

export const SecretcodeContext = React.createContext<TSecretcodeContext>({
    status: false,
    setStatus: () => { },
    passwordDetails: passwordDetails,
    setPasswordDetails: () => { },
});

export function SecretcodeContextProvider({ children }: Props) {

    const [status, setStatus] = React.useState<boolean>(false);
    const [password, setPassword] = React.useState<TCode>(passwordDetails);

    function setStatusDetails(status: boolean) {
        setStatus(status)
    }
    function setPasswordDetails(code: TCode) {
        setPassword(code)
    }

    return (
        <SecretcodeContext.Provider
            value={{
                status: status,
                setStatus: setStatusDetails,
                passwordDetails: password,
                setPasswordDetails: setPasswordDetails
            }}
        >
            {children}
        </SecretcodeContext.Provider>
    )
}
