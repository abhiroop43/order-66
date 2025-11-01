"use client";
import React from 'react';

import HeaderAuth from '@/components/header-auth';
import {Navbar, NavbarBrand, NavbarContent} from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    return (
        <Navbar className="shadow mb-6">
            <NavbarBrand>
                <Link href="/">
                    <Image src="/logo.svg" alt="Order 66" height="0" width="0" className="w-auto h-18 pb-2"
                           loading="eager"/>
                </Link>
            </NavbarBrand>

            <NavbarContent justify="end">
                <HeaderAuth/>
            </NavbarContent>
        </Navbar>
    );
};

export default Header;
