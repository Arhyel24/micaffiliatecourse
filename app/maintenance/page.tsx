export default function Maintenance() {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem", // Approx 4xl in Tailwind
          fontWeight: "bold",
          marginBottom: "0.5rem",
        }}
      >
        Website under maintenance
      </h1>
      <p
        style={{
          color: "#718096", // Approx Tailwind's text-gray-600
          fontSize: "1.25rem", // Approx xl in Tailwind
        }}
      >
        This website is currently undergoing scheduled maintenance. We should be
        back shortly.
      </p>
    </div>
  );
}
