"use server";
import { db } from "@/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import paths from "@/paths";

interface DeleteTaskFormState {
  errors: {
    _form?: string[];
  };
}

export const deleteTask = async (
  ticketId: string
): Promise<DeleteTaskFormState> => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      errors: {
        _form: ["You must be logged in to create a task"],
      },
    };
  }

  try {
    const task = await db.ticket.findFirst({
      where: {
        id: ticketId,
      },
    });

    if (!task) {
      return {
        errors: {
          _form: ["Task not found"],
        },
      };
    }

    if (task.createdBy !== session.user.id) {
      return {
        errors: {
          _form: ["You do not have permission to delete this task"],
        },
      };
    }

    await db.ticket.delete({
      where: {
        id: ticketId,
      },
    });

    console.log("Task deleted successfully. ", task.id);
  } catch (error: unknown) {
    console.error("Error deleting task: ", error);
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    }

    return {
      errors: {
        _form: ["An unknown error occurred while deleting the task"],
      },
    };
  }

  revalidatePath(paths.home());
  revalidatePath(paths.tasksDueToday());
  revalidatePath(paths.tasksAssignedToMe());

  return { errors: { _form: [] } };
};
