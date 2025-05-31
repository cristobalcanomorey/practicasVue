import type { Task } from "@/types";
//CRUD
export function apiGetTasks():Task[]{
	// Llamada a Api
	return [
		{
			"id": 1,
			"title": "Tarea 1",
			"priority": false,
			"done": false
		},
		{
			"id": 2,
			"title": "Tarea 2",
			"priority": true,
			"done": true
		}
	] as Task[]
}

export function apiPutTask(newTask:Task){
	// Insert a API
	console.log(newTask)
}

export function apiDelTask(task:Task){
	// Delete a API
	console.log(task)
}

export function apiUpdateTask(updatedTask: Task){
	// Update a API
	console.log(updatedTask)
}
