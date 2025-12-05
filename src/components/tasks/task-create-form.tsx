"use client";
import React, { useActionState, startTransition, Key, useEffect } from "react";
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
  DatePicker,
} from "@heroui/react";
import { parseDate } from "@internationalized/date";
import type { LookupData } from "@/db/queries/lookups";
import type { UserData } from "@/db/queries/users";
import * as actions from "@/actions";
import { AsyncListData, useAsyncList } from "@react-stately/data";

interface TaskCreateFormProps {
  ticketTypes: LookupData[];
  statuses: LookupData[];
  formData?: FormData;
}

const TaskCreateForm = ({
  ticketTypes,
  statuses,
  formData,
}: TaskCreateFormProps) => {
  const [formState, action, isPending] = useActionState(actions.createTask, {
    errors: {},
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("assignedToId", selectedUserId || "");

    startTransition(() => {
      action(formData);
    });
  };

  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(
    null
  );
  const [inputValue, setInputValue] = React.useState<string>("");

  const onAssignedUserSelectionChange = (id: Key | null) => {
    if (id) {
      setSelectedUserId(id as string);
      const selectedUser = userLists.items.find((user) => user.id === id);
      if (selectedUser) {
        setInputValue(`${selectedUser.name} (${selectedUser.email})`);
      }
    } else {
      setSelectedUserId(null);
      setInputValue("");
    }
  };

  const onInputChange = (value: string) => {
    setInputValue(value);
    // Clear selection when user starts typing
    if (selectedUserId) {
      setSelectedUserId(null);
    }
    userLists.setFilterText(value);
  };

  const userLists: AsyncListData<UserData> = useAsyncList({
    async load({ filterText }) {
      const users = await actions.fetchUsers(filterText);
      return {
        items: users,
      };
    },
  });

  const clearAssignedUserSelection = () => {
    setSelectedUserId(null);
    setInputValue("");
  };

  useEffect(() => {
    if (formData?.get("assignedToId")) {
      const assignedUser = userLists.items.find(
        (user) => user.id === (formData.get("assignedToId") as string)
      );

      if (assignedUser) {
        setSelectedUserId(assignedUser.id);
        setInputValue(`${assignedUser.name} (${assignedUser.email})`);
      } else {
        setSelectedUserId(null);
        setInputValue("");
      }
    } else {
      setSelectedUserId(null);
      setInputValue("");
    }
  }, [formData, userLists.items]);

  return (
    <Form
      className="flex flex-col gap-4 items-center w-full max-w-sm mx-auto"
      onSubmit={handleSubmit}
      validationBehavior="aria"
    >
      <h3 className="text-xl font-bold">
        {formData?.get("title") ? "Edit Task" : "Create an Issue"}
      </h3>
      <Input
        label="Title"
        labelPlacement="outside"
        name="title"
        placeholder="Enter your issue title"
        type="text"
        maxLength={500}
        isInvalid={!!formState.errors.title}
        errorMessage={formState.errors.title?.join(", ")}
        defaultValue={(formData?.get("title") as string) || undefined}
      />

      <Textarea
        label="Description"
        labelPlacement="outside"
        name="description"
        placeholder="Enter your issue description"
        maxLength={2000}
        isInvalid={!!formState.errors.description}
        errorMessage={formState.errors.description?.join(", ")}
        defaultValue={(formData?.get("description") as string) || undefined}
      />

      <Select
        label="Issue Type"
        name="ticketType"
        placeholder="Select Issue Type"
        labelPlacement="outside"
        isInvalid={!!formState.errors.ticketType}
        errorMessage={formState.errors.ticketType?.join(", ")}
        selectedKeys={
          formData?.get("ticketType")
            ? [formData.get("ticketType") as string]
            : undefined
        }
      >
        {ticketTypes.map((ticketType) => (
          <SelectItem key={ticketType.key}>{ticketType.value}</SelectItem>
        ))}
      </Select>

      <Select
        label="Status"
        name="status"
        placeholder="Select issue status"
        labelPlacement="outside"
        isInvalid={!!formState.errors.status}
        errorMessage={formState.errors.status?.join(", ")}
        selectedKeys={
          formData?.get("status")
            ? [formData.get("status") as string]
            : undefined
        }
      >
        {statuses.map((status) => (
          <SelectItem key={status.key}>{status.value}</SelectItem>
        ))}
      </Select>

      <Autocomplete
        onClear={clearAssignedUserSelection}
        label="Assigned To"
        labelPlacement="outside"
        name="assignedToId"
        placeholder="Who will work on this"
        isLoading={userLists.isLoading}
        items={userLists.items}
        inputValue={inputValue}
        onInputChange={onInputChange}
        onSelectionChange={onAssignedUserSelectionChange}
        selectedKey={selectedUserId}
      >
        {(item) => (
          <AutocompleteItem
            key={item.id}
            startContent={
              <Avatar
                alt={item.name || ""}
                className="w-6 h-6 opacity-100"
                showFallback={true}
                imgProps={{ referrerPolicy: "no-referrer" }}
                src={item.image || ""}
              />
            }
          >
            {item.name} ({item.email})
          </AutocompleteItem>
        )}
      </Autocomplete>
      <DatePicker
        label="Due Date"
        labelPlacement="outside"
        name="dueDate"
        showMonthAndYearPickers
        isInvalid={!!formState.errors.dueDate}
        errorMessage={formState.errors.dueDate?.join(", ")}
        defaultValue={
          formData?.get("dueDate")
            ? parseDate((formData.get("dueDate") as string).split("T")[0])
            : undefined
        }
      ></DatePicker>

      {formState.errors._form && (
        <div className="p-2 bg-red-200 border border-red-400 rounded-lg">
          {formState.errors._form?.join(", ")}
        </div>
      )}

      <div className="flex gap-4 my-4">
        <Button color="primary" type="submit" isLoading={isPending}>
          Submit
        </Button>
        <Button type="reset" variant="flat" disabled={isPending}>
          Reset
        </Button>
      </div>
    </Form>
  );
};
export default TaskCreateForm;
