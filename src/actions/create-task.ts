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
    assignedToId: z.string().optional(),
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

    // check user session
    const session = await auth();

    if (!session?.user?.id) {
        return {
            errors: {
                _form: ["You must be logged in to create a task"]
            }
        };
    }

    let task: Ticket;


    try {
        const assignedToId = rawData.assignedToId === '' || rawData.assignedToId === null
            ? undefined
            : result.data.assignedToId;

        task = await db.ticket.create({
            data: {
                title: result.data.title,
                description: result.data.description,
                ticketType: result.data.ticketType,
                status: result.data.status,
                ...(assignedToId && {assignedToId}),
                dueDate: result.data.dueDate,
                createdBy: session.user.id,
            }
        });

        console.log("Task Created: ", task.id);
    } catch (error: unknown) {
        console.error("Error creating task: ", error);
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message]
                }
            };
        }

        return {
            errors: {
                _form: ["An error occurred. Please try again later."]
            }
        };
    }

    revalidatePath(paths.home());
    revalidatePath(paths.tasksDueToday());
    revalidatePath(paths.tasksAssignedToMe());

    redirect(paths.home());
}