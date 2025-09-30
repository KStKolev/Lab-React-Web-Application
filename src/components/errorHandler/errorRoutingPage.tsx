import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorRoutingPage() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <p>{error.status}</p>
        <p>{error.statusText}</p>
      </div>
    );
  }
  if (error instanceof Error) {
    return <p>{error.message}</p>;
  }
  return <p>Unknown error</p>;
}
