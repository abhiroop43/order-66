"use client";
import React from 'react'
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
import type {LookupData} from "@/db/queries/lookups";
import type {UserData} from "@/db/queries/users";
import * as actions from "@/actions";
import {AsyncListData, useAsyncList} from "@react-stately/data";

interface TaskCreateFormProps {
    ticketTypes: LookupData[];
    statuses: LookupData[];
}

const TaskCreateForm = ({ticketTypes, statuses}: TaskCreateFormProps) => {
    const userLists: AsyncListData<UserData> = useAsyncList({
        async load({filterText}) {
            const users = await actions.fetchUsers(filterText);
            return {
                items: users
            };
        }
    });

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
                {ticketTypes.map((ticketType) => (
                    <SelectItem key={ticketType.key}>
                        {ticketType.value}
                    </SelectItem>
                ))}
            </Select>

            <Select label="Status" name="status" placeholder="Select issue status" labelPlacement="outside">
                {statuses.map((status) => (
                    <SelectItem key={status.key}>
                        {status.value}
                    </SelectItem>
                ))}
            </Select>

            <Autocomplete label="Assigned To" labelPlacement="outside" name="assignedToId"
                          placeholder="Who will work on this" inputValue={userLists.filterText}
                          isLoading={userLists.isLoading} items={userLists.items}
                          onInputChange={userLists.setFilterText}>
                {(item) => (
                    <AutocompleteItem key={item.id}
                                      startContent={<Avatar alt={item.name || ""} className="w-6 h-6 opacity-100"
                                                            showFallback={true}
                                                            imgProps={{referrerPolicy: "no-referrer"}}
                                                            src={item.image || ""}/>}>
                        {item.name} ({item.email})
                    </AutocompleteItem>
                )}
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
export default TaskCreateForm
