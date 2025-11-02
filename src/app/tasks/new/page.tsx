"use client";

import React from 'react';
import {Form, Input, Button} from "@heroui/react";

const NewTaskPage = () => {
    const [action, setAction] = React.useState(null);
    return (
        <Form className="flex flex-col gap-4 items-center w-full max-w-sm mx-auto">
            <Input
                isRequired
                errorMessage="Please enter a valid username"
                label="Username"
                labelPlacement="outside"
                name="username"
                placeholder="Enter your username"
                type="text"
            />

            <Input
                isRequired
                errorMessage="Please enter a valid email"
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your email"
                type="email"
            />

            <div className="flex gap-2">
                <Button color="primary" type="submit">
                    Submit
                </Button>
                <Button type="reset" variant="flat">
                    Reset
                </Button>
            </div>
        </Form>
    )
}
export default NewTaskPage
