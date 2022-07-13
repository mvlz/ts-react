import React from "react";
import { UseNumberValue, UseNumberSetValue } from "../hooks/useNumber";
import Button from "./Button";

const Incrementer: React.FunctionComponent<{
  value: UseNumberValue;
  setValue: UseNumberSetValue;
}> = ({ value, setValue }) => (
  <Button onClick={() => setValue(value + 1)} title={`Add - ${value}`} />
);
export default Incrementer;
