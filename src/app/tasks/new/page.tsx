"use client";

import React from 'react';
import {
    Form,
    Input,
    Button,
    Textarea,
    Select,
    SelectItem,
    Autocomplete,
    AutocompleteItem,
    Avatar,
    DatePicker
} from "@heroui/react";

const NewTaskPage = () => {
    return (

        <Form className="flex flex-col gap-4 items-center w-full max-w-sm mx-auto">
            <h3 className="text-xl font-bold">Create an Issue</h3>
            <Input
                isRequired
                errorMessage="Please enter a valid title"
                label="Title"
                labelPlacement="outside"
                name="title"
                placeholder="Enter your issue title"
                type="text"
                maxLength={500}
            />

            <Textarea
                isRequired
                errorMessage="Please enter a valid email"
                label="Description"
                labelPlacement="outside"
                name="description"
                placeholder="Enter your issue description"
                maxLength={2000}
            />

            <Select label="Issue Type" name="ticketType" placeholder="Select Issue Type" labelPlacement="outside"
                    isRequired errorMessage="Please select the type of issue">
                <SelectItem key="project">Project</SelectItem>
                <SelectItem key="feature">Feature</SelectItem>
                <SelectItem key="userStory">User Story</SelectItem>
                <SelectItem key="task">Task</SelectItem>
                <SelectItem key="testCase">Test Case</SelectItem>
                <SelectItem key="bug">Bug</SelectItem>
            </Select>

            <Select label="Status" name="status" placeholder="Select issue status" labelPlacement="outside">
                <SelectItem key="pending">Pending</SelectItem>
                <SelectItem key="inprogress">In Progress</SelectItem>
                <SelectItem key="completed">Completed</SelectItem>
            </Select>

            <Autocomplete label="Assigned To" labelPlacement="outside" name="assignedToId"
                          placeholder="Who will work on this">
                <AutocompleteItem
                    key="cmhhh52te0000ivk4ds0t0r2b"
                    startContent={
                        <Avatar alt="Abhiroop Santra" className="w-6 h-6 opacity-100" showFallback={true}
                                imgProps={{referrerPolicy: "no-referrer"}}
                                src="https://lh3.googleusercontent.com/a/ACg8ocICjs80V6DQwvd5Lo-OxDf0dNNK_UslMqmvSSelby-jeHWpJoaU=s96-c"/>
                    }
                >
                    Abhiroop Santra (abhiroop.santra@gmail.com)
                </AutocompleteItem>
            </Autocomplete>

            <DatePicker label="Due Date" labelPlacement="outside" name="dueDate"
                        showMonthAndYearPickers></DatePicker>

            <div className="flex gap-4 my-4">
                <Button color="primary" type="submit">
                    Submit
                </Button>
                <Button color="warning" type="submit">
                    Save As Draft
                </Button>
                <Button type="reset" variant="flat">
                    Reset
                </Button>
            </div>
        </Form>
    )
}
export default NewTaskPage
