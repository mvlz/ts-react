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
export default List;
