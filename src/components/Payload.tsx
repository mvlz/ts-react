import React, { useEffect, useState } from "react";

interface Payload {
  text: string;
}
const PayloadComponent = () => {
  const [payload, setPayload] = useState<Payload | null>(null);
  useEffect(() => {
    fetch("/data.json")
      .then((resp) => resp.json())
      .then((data) => {
        setPayload(data);
      });
  }, []);
  return <>{payload?.text}</>;
};
export default PayloadComponent;
