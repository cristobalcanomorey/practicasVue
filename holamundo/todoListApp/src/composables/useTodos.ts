import { reactive, ref } from 'vue'
import type { Todo } from '@/types/todo'

const todos = ref<Todo[]>([])

export function useTodos(){
    const addTodo = (text: string) => {
        todos.value.push({
            id: todos.value.length + 1,
            text,
            done: false,
            oculto: false
        })
    }
    const toggleTodo = (id: number) => {
        const todo = todos.value.find(t => t.id === id)
        if (todo) todo.done = !todo.done
    }
    const removeTodo = (id: number) => {
        todos.value = todos.value.filter(t => t.id !== id)
    }

    const toggleOcultarDones = () => {
        todos.value.forEach(todo => {
            if(todo.done){
                toggleOcultarTodo(todo)
            }
        })
    }

    const toggleOcultarTodo = (todo: Todo) => {
        todo.oculto = !todo.oculto
    }

    return {
        todos,
        addTodo,
        toggleTodo,
        removeTodo,
        toggleOcultarDones
    }
}