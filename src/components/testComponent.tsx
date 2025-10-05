import { useState } from "react";

export default function TestComponent() {
  const [isError, setIsError] = useState(false);
  if (isError) {
    throw new Error("TestComponent simulated error");
  }

  return (
    <button type="button" onClick={() => setIsError(true)}>
      Simulate Error
    </button>
  );
}
