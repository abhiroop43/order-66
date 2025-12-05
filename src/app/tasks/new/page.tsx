import type {LookupData} from "@/db/queries/lookups";
import {getLookupsByType} from "@/db/queries/lookups";
import TaskCreateForm from "@/components/tasks/task-create-form";


const NewTaskPage = async () => {
    const ticketTypes: LookupData[] = await getLookupsByType("TICKET_TYPE");
    const statuses: LookupData[] = await getLookupsByType("TICKET_STATUS");

    return <TaskCreateForm ticketTypes={ticketTypes} statuses={statuses}/>;
}
export default NewTaskPage
