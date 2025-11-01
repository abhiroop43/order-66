// app/providers.tsx
'use client';

import {HeroUIProvider} from '@heroui/react';
import {SessionProvider} from "next-auth/react";
import React from "react";

interface ProvidersProps {
    children: React.ReactNode;
}


export function Providers({children}: Readonly<ProvidersProps>) {
    return (
        <SessionProvider>
            <HeroUIProvider>{children}</HeroUIProvider>
        </SessionProvider>
    );
}
