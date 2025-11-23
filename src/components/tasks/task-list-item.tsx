"use client";

import React from 'react'
import type {TicketData} from "@/db/queries/tasks";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/react";

interface TaskListItemProps {
    ticket: TicketData;
}

const TaskListItem = ({ticket}: TaskListItemProps) => {
    return (
        <Card className="my-4" fullWidth={true} isHoverable={true} isPressable={true}>
            <CardHeader>{ticket.title}</CardHeader>
            <CardBody>
                <div>Description: {ticket.description}</div>
            </CardBody>
            <CardFooter>Status: {ticket.status}</CardFooter>
        </Card>
    )
}
export default TaskListItem
