import { useCallback, useRef, useState } from "react";
import "./App.css";
import {
  UL,
  Box,
  Button,
  Heading,
  Incrementer,
  Payload,
} from "./components/index";
import { useTodos } from "./hooks/useTodos";

const initialTodos = [{ id: 0, text: "Hey there", done: false }];

function App() {
  const { todos, addTodo, removeTodo } = useTodos(initialTodos);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const OnAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = "";
    }
  }, [addTodo]);

  const [value, setValue] = useState(0);

  return (
    <div>
      <Heading title="Global State" />
      <Box>
        {" "}
        <Payload />
      </Box>
      <Incrementer value={value} setValue={setValue} />
      <Heading title="Todos" />
      <div>
        <input type="text" ref={newTodoRef} />
        <Button onClick={OnAddTodo}>Add Todo</Button>
      </div>
      <UL
        items={todos}
        itemClick={(item) => alert(item.id)}
        render={(todo) => (
          <>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </>
        )}
      />
    </div>
  );
}
const JustShowTodos = () => {
  const { todos } = useTodos(initialTodos);
  return (
    <UL
      items={todos}
      itemClick={() => {}}
      render={(todo) => <>{todo.text}</>}
    />
  );
};
const AppWrapper = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "50% 50%",
    }}
  >
    <App />
    <JustShowTodos />
  </div>
);

export default AppWrapper;
