import { MoveRight, Rocket } from "lucide-react";
import Link from "next/link";

const Buttons = ({
  first_label,
  first_styles = "",
  first_nav = "",
  second_label,
  second_styles = "",
  second_nav = "",
  icon,
  buttonAction = () => {},
}) => {
  const icons = () => {
    switch (icon) {
      case "right-arrow":
        return <MoveRight size={16} />;
      case "rocket":
        return <Rocket size={16} />;
      default:
        return null;
    }
  };
  return (
    <>
      {first_label &&
        (first_nav.includes("/") ? (
          <Link
            href={first_nav}
            className={first_styles}
            aria-label={first_label}
          >
            {first_label} {icons(icon)}
          </Link>
        ) : (
          <button type="button" onClick={buttonAction} className={first_styles}>
            {first_label}
          </button>
        ))}
      {second_label && (
        <Link
          href={second_nav}
          className={second_styles}
          aria-label={second_label}
        >
          {second_label}
        </Link>
      )}
    </>
  );
};

export default Buttons;
