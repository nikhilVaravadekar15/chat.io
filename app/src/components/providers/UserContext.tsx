"use client"

import React from "react";
import { TUser, TUserContext } from "@/types";


type Props = {
    children: React.ReactNode
}

const userDetails: TUser = {
    name: "",
}

export const UserContext = React.createContext<TUserContext>({
    userDetails: userDetails,
    setUserDetails: () => { }
});

export function UserContextProvider({ children }: Props) {

    const [user, setUser] = React.useState<TUser>(userDetails);
    function setUserDetails(user: TUser) {
        setUser(user)
    }

    return (
        <UserContext.Provider
            value={{
                userDetails: user,
                setUserDetails: setUserDetails
            }}
        >
            {children}
        </UserContext.Provider >
    )
}
