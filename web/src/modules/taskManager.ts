
import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";



let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
    tasks = [...initialTasks];
}

export function getActiveTasks(): Task[] {
    const firstIncompleteGroup = Math.min(
        ...tasks.filter(task => !task.completed).map(task => task.group)
    );
    return tasks.filter(task => !task.completed && task.group === firstIncompleteGroup);
}

export function getCompletedTasks(): Task[] {
    const completedTasks = tasks.filter(task => task.completed);
    return completedTasks;
}

export function getAllTasks(): Task[] {
    return tasks
}

export function completeTask(taskTitle: string): void {
    const task = tasks.find(task => task.title === taskTitle);
    if (task) {
        task.completed = true;
        const nextTaskInGroup = tasks.find(t => t.group === task.group && !t.completed);
        if (!nextTaskInGroup) {
            const nextGroupTasks = tasks.filter(t => t.group === task.group + 1 && !t.completed);
            if (nextGroupTasks.length > 0) {
                nextGroupTasks[0].completed = false;
            }
        }
    }
}

export function createTask(title: string, description: string, persona: string, group: number): void {
    const newTask = new Task(tasks.length + 1, title, description, persona, group);
    tasks.push(newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
    tasks = tasks.map((task)=> (task.id === taskId ? {...task, ...updatedTask} : task))
}

export function deleteTask(taskId: number): void {
    tasks = tasks.filter(task => task.id !== taskId)
}

export function getNonActiveTask(): Task[] {
    const activeTasks = tasks.filter(task => !task.completed);
    const sortedTasks = activeTasks.toSorted((a, b) => a.group - b.group);
    const topGroupNumber = sortedTasks[0].group
    const filteredTasks = sortedTasks.filter((task)=> task.group!==topGroupNumber)
    return filteredTasks
}