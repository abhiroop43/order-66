"use client";

import type { TicketData } from "@/db/queries/tasks";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";
import Image from "next/image";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

interface TaskListItemProps {
  ticket: TicketData;
}

const TaskListItem = ({ ticket }: TaskListItemProps) => {
  const navigateToEditTask = (ticketId: string) => {
    // Navigation logic to edit task page
  };

  const deleteTask = (ticketId: string) => {
    // Logic to delete the task
  };
  return (
    <Card fullWidth={true}>
      <CardHeader className="text-3xl font-bold flex justify-between items-center">
        <div className="mx-4">{ticket.title}</div>

        <div className="flex gap-1 mr-2">
          <Button
            onPress={() => navigateToEditTask(ticket.id)}
            variant="light"
            aria-label="Edit Task"
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <PencilSquareIcon className="h-6 w-6" />
          </Button>
          <Button
            onPress={() => deleteTask(ticket.id)}
            variant="light"
            aria-label="Delete Task"
            className="text-red-600 hover:text-red-800 transition"
          >
            <TrashIcon className="h-6 w-6" />
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="mx-4">{ticket.description}</div>

        <div className="mx-4 mt-2 text-sm text-gray-500">
          Due:{" "}
          {ticket.dueDate
            ? new Date(ticket.dueDate).toLocaleDateString()
            : "No due date"}
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex flex-col gap-2">
          <div className="mx-4">Status: {ticket.status}</div>
          <div className="flex flex-row gap-x-1 items-center mx-4">
            <div>
              <Image
                src={
                  ticket.assignedTo?.image ||
                  "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png"
                }
                alt="avatar"
                width={30}
                height={30}
                className="rounded-full inline-block mr-2"
              />
            </div>
            <div>{ticket.assignedTo?.name}</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export default TaskListItem;
