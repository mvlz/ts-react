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
import { RootState, store } from "./app/store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo } from "./features/todos/todosSlice";

function App() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const newTodoRef = useRef<HTMLInputElement>(null);

  const OnAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch(addTodo(newTodoRef.current.value));
      newTodoRef.current.value = "";
    }
  }, [dispatch]);

  const [value, setValue] = useState(0);

  return (
    <div>
      <Heading title="Redux Toolkit" />
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
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Remove
            </button>
          </>
        )}
      />
    </div>
  );
}
const JustShowTodos = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  return (
    <UL
      items={todos}
      itemClick={() => {}}
      render={(todo) => <>{todo.text}</>}
    />
  );
};
const AppWrapper = () => (
  <Provider store={store}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
      }}
    >
      <App />
      <JustShowTodos />
    </div>
  </Provider>
);

export default AppWrapper;
