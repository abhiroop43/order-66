"use client";

import type { TicketData } from "@/db/queries/tasks";
import React from "react";
import TaskListItem from "@/components/tasks/task-list-item";

interface TaskListProps {
  tickets: TicketData[];
}

const TaskList = ({ tickets }: TaskListProps) => {
  let tasks: React.ReactNode[] = [];
  if (tickets && tickets.length > 0) {
    tasks = tickets.map((ticket) => (
      <div key={ticket.id} className="pb-4">
        <TaskListItem ticket={ticket} />
      </div>
    ));
    return <div>{tasks}</div>;
  } else {
    return (
      <div className="flex flex-col gap-y-2 justify-center items-center my-10">
        <div className="text-xl">No tickets found.</div>
        <div className="text-sm italic">Start by creating a new ticket!</div>
      </div>
    );
  }
};
export default TaskList;
