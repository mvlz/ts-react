import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "1rem",
      fontWeight: "bold",
    }}
  >
    {children}
  </div>
);

const List = ({
  items,
  onClick,
}: {
  items: string[];
  onClick?: (item: string) => void;
}) => (
  <ul>
    {items.map((item, index) => {
      return (
        <li key={index} onClick={() => onClick?.(item)}>
          {item}
        </li>
      );
    })}
  </ul>
);

interface Payload {
  text: string;
}
interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { title?: string }
> = ({ title, children, style, ...rest }) => (
  <button
    style={{
      ...style,
      backgroundColor: "dodgerblue",
      color: "white",
      fontSize: "xx-large",
    }}
    {...rest}
  >
    {title ?? children}
  </button>
);

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };
const useNumber = (initialValue: number) => useState<number>(initialValue);

type UseNumberValue = ReturnType<typeof useNumber>[0];
type UseNumberSetValue = ReturnType<typeof useNumber>[1];

const Incrementer: React.FunctionComponent<{
  value: UseNumberValue;
  setValue: UseNumberSetValue;
}> = ({ value, setValue }) => (
  <Button onClick={() => setValue(value + 1)} title={`Add - ${value}`} />
);

function App() {
  const onListClick = useCallback((item: string) => {
    alert(item);
  }, []);

  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((resp) => resp.json())
      .then((data) => {
        setPayload(data);
      });
  }, []);

  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
            done: false,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
      default:
        throw new Error();
    }
  }, []);

  const newTodoRef = useRef<HTMLInputElement>(null);
  const OnAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({ type: "ADD", text: newTodoRef.current.value });
      newTodoRef.current.value = "";
    }
  }, []);

  const [value, setValue] = useState(0);

  return (
    <div>
      <Heading title="Introduction" />
      <Box>How are you?</Box>
      <List items={["one", "two", "three"]} onClick={onListClick} />
      <Box>{JSON.stringify(payload)}</Box>
      <Incrementer value={value} setValue={setValue} />
      <Heading title="Todos" />
      <div>
        <input type="text" ref={newTodoRef} />
        <Button onClick={OnAddTodo}>Add Todo</Button>
      </div>
      <div>
        {todos.map((todo) => {
          return (
            <div key={todo.id}>
              {todo.text}
              <Button onClick={() => dispatch({ type: "REMOVE", id: todo.id })}>
                remove
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
