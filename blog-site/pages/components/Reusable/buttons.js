import { MoveRight } from "lucide-react";
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
  return (
    <>
      {first_label &&
        (first_nav.includes("/") ? (
          <Link
            href={first_nav}
            className={first_styles}
            aria-label={first_label}
          >
            {first_label} {icon && <MoveRight />}
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
