export default function ErrorPage({ error, resetError }: { error: Error | null; resetError: () => void }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      {error && (
        <div>
          <strong>{error.message}</strong>
          <pre>{error.stack}</pre>
        </div>
      )}
      <button type="button" onClick={resetError}>
        Try again
      </button>
    </div>
  );
}
