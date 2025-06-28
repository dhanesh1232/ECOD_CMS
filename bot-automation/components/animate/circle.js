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
    </>
  );
};

export default DotByDotLoader;
