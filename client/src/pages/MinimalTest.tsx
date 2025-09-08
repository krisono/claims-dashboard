export default function MinimalTest() {
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "20px",
        fontSize: "24px",
        minHeight: "100vh",
      }}
    >
      <h1>MINIMAL TEST - React is Working!</h1>
      <p>If you can see this, React is rendering properly.</p>
      <div
        style={{
          backgroundColor: "lightblue",
          padding: "10px",
          margin: "10px 0",
        }}
      >
        This is a test div with inline styles
      </div>
    </div>
  );
}
