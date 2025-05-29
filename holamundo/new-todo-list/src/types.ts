export interface Task {
	id: number;
	title: string;
	done: boolean;
	priority: boolean;
}

export type TaskFilter = "all" | "todo" | "completed" | "priority";