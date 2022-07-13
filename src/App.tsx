import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { UL, Box, Button, Heading, Incrementer } from "./components/index";
import {
  useTodos,
  useAddTodo,
  useRemoveTodo,
  TodosProvider,
} from "./providers/TodoContext";

interface Payload {
  text: string;
}

function App() {
  const todos = useTodos();
  const addTodo = useAddTodo();
  const removeTodo = useRemoveTodo();

  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((resp) => resp.json())
      .then((data) => {
        setPayload(data);
      });
  }, []);

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
      <Heading title="Introduction" />
      <Box>{payload?.text}</Box>
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
  const todos = useTodos();
  return (
    <UL
      items={todos}
      itemClick={() => {}}
      render={(todo) => <>{todo.text}</>}
    />
  );
};
const AppWrapper = () => (
  <TodosProvider initialTodos={[{ id: 0, text: "Hey there", done: false }]}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
      }}
    >
      <App />
      <JustShowTodos />
    </div>
  </TodosProvider>
);

export default AppWrapper;
