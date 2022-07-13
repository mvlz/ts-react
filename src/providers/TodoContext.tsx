import React, { createContext, useContext } from "react";
import { useTodos as useTodosManager } from "../hooks/useTodos";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;
const TodoContext = createContext<UseTodosManagerResult>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
});

export const TodosProvider: React.FunctionComponent<{
  initialTodos: Todo[];
  children: React.ReactNode;
}> = ({ initialTodos, children }) => (
  <TodoContext.Provider value={useTodosManager(initialTodos)}>
    {children}
  </TodoContext.Provider>
);

export const useTodos = (): Todo[] => {
  const { todos } = useContext(TodoContext);
  return todos;
};

export const useAddTodo = (): UseTodosManagerResult["addTodo"] => {
  const { addTodo } = useContext(TodoContext);
  return addTodo;
};

export const useRemoveTodo = (): UseTodosManagerResult["removeTodo"] => {
  const { removeTodo } = useContext(TodoContext);
  return removeTodo;
};
