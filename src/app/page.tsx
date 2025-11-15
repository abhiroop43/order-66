import TaskList from "@/components/tasks/task-list";
import {auth} from "@/auth";
import React from "react";
import Greetings from "@/components/greetings";
import {getTicketsForUser} from "@/db/queries/tasks";

const Home = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    let homePageContent: React.ReactNode;

    if (userId) {
        const tickets = await getTicketsForUser(userId);
        console.log(tickets);
        homePageContent = (<div className="flex items-center justify-center">
            <TaskList tickets={tickets}/>
        </div>);
    } else {
        homePageContent = <Greetings/>;
    }

    return homePageContent;
}

export default Home;
