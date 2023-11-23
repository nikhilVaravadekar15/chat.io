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
import { password } from "@/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TCode, TSecretcodeContext } from "@/types";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SecretcodeContext } from "@/components/providers/SecretcodeContextProvider";


export default function CodeDialog() {

    const { status, setStatus, setPasswordDetails } = React.useContext<TSecretcodeContext>(SecretcodeContext)
    const {
        register, getFieldState, handleSubmit
    } = useForm<TCode>({
        resolver: zodResolver(password),
    });

    return (
        <Dialog open={status}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Enter secret code</DialogTitle>
                    <DialogDescription>
                        Enter secret code to join meet.
                    </DialogDescription>
                </DialogHeader>
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit((data: TCode) => {
                        setPasswordDetails(data)
                        setStatus(false)
                    })}
                >
                    <div className="space-y-1">
                        <Label htmlFor="code">Secret code</Label>
                        <Input
                            type="password"
                            id="code"
                            autoComplete="off"
                            {...register("code" as const, { required: true })}
                        />
                        <span className="text-xs text-red-500">{getFieldState("code").error?.message}</span>
                    </div>
                    <div className="flex items-center justify-end">
                        <Button
                            type={"submit"}
                            className="text-white bg-[#0096df] hover:bg-[#0096ff]"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
