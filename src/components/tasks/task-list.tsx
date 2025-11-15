"use client";

import type {TicketData} from "@/db/queries/tasks";

interface TaskListProps {
    tickets: TicketData[];
}

const TaskList = ({tickets}: TaskListProps) => {

    return (
        <div>TaskList</div>
    )
}
export default TaskList
