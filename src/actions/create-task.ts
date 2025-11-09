"use server";
import {z} from "zod";
import {db} from "@/db";
import {auth} from "@/auth";
import type {Ticket} from "@prisma/client";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import paths from "@/paths";

const createTaskSchema = z.object({
    title: z.string()
        .min(1, "Title is required")
        .max(500, "Title must be less than 500 characters"),
    description: z.string()
        .max(2000, "Description must be less than 2000 characters"),
    ticketType: z.string().min(1, "Ticket Type is required"),
    status: z.string().min(1, "Ticket Status is required"),
    dueDate: z.coerce.date({error: "Must be a valid date"}),
});

interface CreateTaskFormState {
    errors: {
        title?: string[];
        description?: string[];
        ticketType?: string[];
        status?: string[];
        assignedToId?: string[];
        dueDate?: string[];
        _form?: string[];
    }
}

export const createTask = async (formState: CreateTaskFormState, formData: FormData): Promise<CreateTaskFormState> => {
    const rawData = {
        title: formData.get('title'),
        description: formData.get('description'),
        ticketType: formData.get('ticketType'),
        status: formData.get('status'),
        assignedToId: formData.get('assignedToId'),
        dueDate: formData.get('dueDate'),
    };

    console.log(rawData);

    const result = createTaskSchema.safeParse(rawData);

    if (!result.success) {
        const flattenedErrors = result.error.flatten().fieldErrors;
        console.log("Validation Errors: ", flattenedErrors);
        return {
            errors: flattenedErrors
        };
    }

    console.log("Validation Passed");

    revalidatePath(paths.home());
    revalidatePath(paths.tasksDueToday());
    revalidatePath(paths.tasksAssignedToMe());

    redirect(paths.home());
}