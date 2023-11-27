"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import React from "react";
import { username } from "@/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TUser, TUserContext } from "@/types";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContext } from "@/components/providers/UserContextProvider";


export default function UserDialog() {

    const {
        register, getFieldState, handleSubmit
    } = useForm<TUser>({
        resolver: zodResolver(username),
    });
    const { userDetails, setUserDetails } = React.useContext<TUserContext>(UserContext);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"link"}>
                    {
                        userDetails.name ? (
                            <span className="flex gap-1 items-center justify-center">
                                <span className="text-blue-400">@</span>
                                <span>{userDetails.name}</span>
                            </span>
                        ) : (
                            <span>Edit Username</span>
                        )
                    }
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Set Username</DialogTitle>
                    <DialogDescription>
                        Set username to let everyone in the room get to know you.
                    </DialogDescription>
                </DialogHeader>
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit((data) => {
                        console.log(data)
                        setUserDetails(data)
                    })}
                >
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            id="name"
                            autoComplete="off"
                            {...register("name" as const, { required: true })}
                        />
                        <span className="text-xs text-red-500">{getFieldState("name").error?.message}</span>
                    </div>
                    <div className="flex items-center justify-end">
                        <Button
                            type={"submit"}
                            className="text-white bg-[#0096df] hover:bg-[#0096ff]"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
