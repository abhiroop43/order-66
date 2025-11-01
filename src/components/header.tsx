"use client";
import React from 'react';

import HeaderAuth from '@/components/header-auth';
import {Navbar, NavbarBrand, NavbarContent, Button} from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import {PlusIcon} from "@heroicons/react/24/solid";

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
                <Button
                    as={Link}
                    color="primary"
                    href="/tasks/new"
                    variant="solid"
                    endContent={<PlusIcon className="text-white size-5"/>}
                >
                    Create
                </Button>
                <HeaderAuth/>
            </NavbarContent>
        </Navbar>
    );
};

export default Header;
