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
        .min(1, "Description is required")
        .max(2000, "Description must be less than 2000 characters"),
    ticketType: z.string().min(1, "Ticket Type is required"),
    status: z.string().min(1, "Ticket Status is required"),
    assignedToId: z.string().min(1, "Assigned To is required"),
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
    console.log(Object.fromEntries(formData));

    const result = createTaskSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        const flattenedErrors = result.error.flatten().fieldErrors;
        console.log("Validation Errors: ", flattenedErrors);
        return {
            errors: flattenedErrors
        };
    }

    revalidatePath(paths.home());
    revalidatePath(paths.tasksDueToday());
    revalidatePath(paths.tasksAssignedToMe());

    redirect(paths.home());
}