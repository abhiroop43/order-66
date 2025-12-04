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
      <div className="flex justify-center items-center text-xl">
        No tasks found. Start by creating a new task!
      </div>
    );
  }
};
export default TaskList;
