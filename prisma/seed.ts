import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const ticketTypes = await prisma.lookup.createMany(
        {
            data: [
                {
                    typeCode: "TICKET_TYPE",
                    key: "project",
                    value: "Project",
                    createdBy: "system",
                },
                {
                    typeCode: "TICKET_TYPE",
                    key: "feature",
                    value: "Feature",
                    createdBy: "system",
                },
                {
                    typeCode: "TICKET_TYPE",
                    key: "userStory",
                    value: "User Story",
                    createdBy: "system",
                },
                {
                    typeCode: "TICKET_TYPE",
                    key: "task",
                    value: "Task",
                    createdBy: "system",
                },
                {
                    typeCode: "TICKET_TYPE",
                    key: "testCase",
                    value: "Test Case",
                    createdBy: "system",
                },
                {
                    typeCode: "TICKET_TYPE",
                    key: "bug",
                    value: "Bug",
                    createdBy: "system",
                },
                {
                    typeCode: "TICKET_STATUS",
                    key: "pending",
                    value: "Pending",
                    createdBy: "system",
                },
                {
                    typeCode: "TICKET_STATUS",
                    key: "inProgress",
                    value: "In Progress",
                    createdBy: "system",
                },
                {
                    typeCode: "TICKET_STATUS",
                    key: "completed",
                    value: "Completed",
                    createdBy: "system",
                }
            ],
            skipDuplicates: true,
        }
    )
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

