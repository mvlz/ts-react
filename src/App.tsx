import React, { useCallback } from 'react';
import './App.css';

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;


const Box = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "1rem",
      fontWeight: "bold",
    }}>
    {children}
  </div>
)

const List = ({ items, onClick }: { items: string[], onClick?: (item: string) => void }) => (
  <ul>
    {items.map((item, index) => {
      return <li key={index} onClick={()=>onClick?.(item)}>{item}</li>
    })}
  </ul>
)

function App() {

  const onListClick = useCallback((item: string) => {
    alert(item);
  },[])
  

  return (
    <div>
      <Heading title='Introduction' />
      <Box>
        How are you?
      </Box>
      <List items={['one', 'two', 'three']} onClick={onListClick} />
    </div>
  );
}

export default App;
