const paths = {
    home() {
        return '/'
    },
    createNewTask() {
        return '/tasks/new'
    },
    TaskDetail(taskId: string) {
        return `/tasks/${taskId}`
    },
    tasksAssignedToMe() {
        return '/tasks/assigned-to-me'
    },
    tasksDueToday() {
        return '/tasks/due-today'
    }
}

export default paths;