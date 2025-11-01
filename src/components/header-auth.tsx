'use client';
import {useSession} from 'next-auth/react';

import React from 'react';
import {NavbarItem, Button, Popover, PopoverTrigger, PopoverContent, Avatar} from "@heroui/react";
import * as actions from '@/actions';

const HeaderAuth = () => {
    const session = useSession();

    let authContent: React.ReactNode;

    if (session.status === "loading") {
        authContent = null;
    } else if (session.status === "authenticated") {
        authContent = (
            <Popover placement="left">
                <PopoverTrigger>
                    <Avatar src={session.data.user?.image || ''}></Avatar>
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
        )
    } else {
        authContent = (<>
            <NavbarItem>
                <form action={actions.signIn}>
                    <Button type="submit" variant="shadow" color="primary">
                        Sign in
                    </Button>
                </form>
            </NavbarItem>
            <NavbarItem>
                <form action={actions.signIn}>
                    <Button type="submit" variant="shadow" color="secondary">
                        Sign up
                    </Button>
                </form>
            </NavbarItem>
        </>)
    }


    return authContent;
};

export default HeaderAuth;
