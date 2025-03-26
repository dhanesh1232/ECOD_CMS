const ShinyText = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
  shineColor = "#FFFFFF",
  baseColor = "#000000",
  highlightColor = "#FF0000", // Your highlight color (e.g., '#FF0000')
}) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`inline-block bg-clip-text ${disabled ? "" : "animate-shine"} ${className}`}
      style={{
        color: baseColor, // Your text color (e.g., '#000000')
        backgroundImage: `
      linear-gradient(
        120deg,
        ${shineColor} 0%,
        ${highlightColor} 30%,
        ${shineColor} 50%,
        ${baseColor} 70%,
        ${baseColor} 100%
      )`,
        backgroundSize: "300% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        textFillColor: "transparent",
        animationDuration: animationDuration,
        animationTimingFunction: "ease-in-out",
      }}
    >
      <h1 className="">{text}</h1>
    </div>
  );
};

export default ShinyText;
