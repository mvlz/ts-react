import { useCallback, useRef, useState } from "react";
import { useTodos } from "./hooks/useTodos";
import "./App.css";
import {
  UL,
  Box,
  Button,
  Heading,
  Incrementer,
  Payload,
} from "./components/index";

function App() {
  const { todos, addTodo, removeTodo } = useTodos([
    { id: 0, text: "Hey there", done: false },
  ]);

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
      <Box>
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

export default App;
