import React from "react";

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
export default Button;
