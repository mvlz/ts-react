import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTodos } from "./hooks/useTodos";
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

const useNumber = (initialValue: number) => useState<number>(initialValue);

type UseNumberValue = ReturnType<typeof useNumber>[0];
type UseNumberSetValue = ReturnType<typeof useNumber>[1];

const Incrementer: React.FunctionComponent<{
  value: UseNumberValue;
  setValue: UseNumberSetValue;
}> = ({ value, setValue }) => (
  <Button onClick={() => setValue(value + 1)} title={`Add - ${value}`} />
);

function UL<T>({
  items,
  render,
  itemClick,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  items: T[];
  render: (item: T) => React.ReactNode;
  itemClick: (item: T) => void;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li onClick={() => itemClick(item)} key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

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
      <Box>How are you?</Box>
      <List items={["one", "two", "three"]} onClick={onListClick} />
      <Box>{JSON.stringify(payload)}</Box>
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
