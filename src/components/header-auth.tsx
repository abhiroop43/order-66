'use client';
import {useSession} from 'next-auth/react';

import React from 'react';
import {NavbarItem, Button, Popover, PopoverTrigger, PopoverContent, Avatar} from "@heroui/react";
import * as actions from '@/actions';
import {PlusIcon} from "@heroicons/react/24/solid";
import Link from "next/link";
import GoogleButton from "@/components/sign-in/google-button";
import GitHubButton from "@/components/sign-in/github-button";

const HeaderAuth = () => {
    const session = useSession();

    let authContent: React.ReactNode;

    if (session.status === "loading") {
        authContent = null;
    } else if (session.status === "authenticated") {
        authContent = (
            <div className="flex justify-evenly gap-10">
                <Button
                    as={Link}
                    color="primary"
                    href="/tasks/new"
                    variant="solid"
                    endContent={<PlusIcon className="text-white size-5"/>}
                >
                    Create
                </Button>
                <Popover placement="bottom-end">
                    <PopoverTrigger>
                        <Avatar src={session.data.user?.image || ''} imgProps={{referrerPolicy: "no-referrer"}}
                                className="opacity-100" showFallback={true}></Avatar>
                    </PopoverTrigger>
                    <PopoverContent>

                        <div className="p-4">
                            <form action={actions.signOut}>
                                <Button type="submit" variant="shadow" color="danger">
                                    Sign out
                                </Button>
                            </form>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

        )
    } else {
        authContent = (<>
            <NavbarItem>
                <form action={actions.signInWithGoogle}>
                    <GoogleButton/>
                </form>
            </NavbarItem>
            <NavbarItem>
                <form action={actions.signInWithGithub}>
                    <GitHubButton/>
                </form>
            </NavbarItem>
        </>)
    }


    return authContent;
};

export default HeaderAuth;
