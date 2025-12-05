import type { LookupData } from "@/db/queries/lookups";
import { getLookupsByType } from "@/db/queries/lookups";
import TaskCreateForm from "@/components/tasks/task-create-form";
import { getTicketDetails } from "@/db/queries/tasks";

interface EditTaskProps {
  params: Promise<{ taskId: string }>;
}

const EditTask = async ({ params }: EditTaskProps) => {
  const { taskId } = await params;
  console.log("Editing task with ID:", taskId);

  const ticketTypes: LookupData[] = await getLookupsByType("TICKET_TYPE");
  const statuses: LookupData[] = await getLookupsByType("TICKET_STATUS");
  const taskData = await getTicketDetails(taskId);

  const formData = new FormData();
  if (taskData) {
    formData.append("title", taskData.title);
    formData.append("description", taskData.description || "");
    formData.append("ticketType", taskData.ticketType || "");
    formData.append("status", taskData.status || "");
    formData.append("assignedToId", taskData.assignedToId || "");
    formData.append(
      "dueDate",
      taskData.dueDate ? taskData.dueDate.toISOString().split("T")[0] : ""
    );
  }

  return (
    <TaskCreateForm
      ticketTypes={ticketTypes}
      statuses={statuses}
      formData={formData}
    />
  );
};

export default EditTask;
