const DotByDotLoader = ({ size = "sm", dots = 12, speed = 1.2 }) => {
  const circleClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-14 h-14",
    "2xl": "w-16 h-16",
    "3xl": "w-18 h-18",
    "4xl": "w-20 h-20",
  };
  return (
    <>
      {" "}
      <div className="loader" />
      {/*<div className={`relative ${circleClasses[size]}`}>
      {Array.from({ length: dots }).map((_, i) => (
        <span
          key={i}
          className="absolute w-2 h-2 rounded-full bg-blue-300"
          style={{
            top: "50%",
            left: "50%",
            transform: `rotate(${
              (i * 360) / dots
            }deg) translate(36px) rotate(-${(i * 360) / dots}deg)`,
            transformOrigin: "0 0",
          }}
        />
      ))}
    
      <span
        className="absolute w-2 h-2 rounded-full bg-blue-600 animate-move-highlight"
        style={{
          top: "50%",
          left: "50%",
          transformOrigin: "0 0",
          animation: `move-highlight ${speed}s steps(${dots}) infinite`,
        }}
      />
    </div>*/}
    </>
  );
};

export default DotByDotLoader;
