import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Todo {
    id: number;
    done: boolean;
    text: string;
}

export interface TodosSliceState {
    todos: Todo[];
}
const initialState: TodosSliceState = {
    todos: [],
}

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state: TodosSliceState, action: PayloadAction<string>) => {
            state.todos = [
                ...state.todos,
                {
                    id: state.todos.length,
                    text: action.payload,
                    done: false,
                },
            ];
        },
        removeTodo: (state: TodosSliceState, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(({ id }) => id !== action.payload);
        },
    },
})

export const { addTodo, removeTodo } = todosSlice.actions

export default todosSlice.reducer