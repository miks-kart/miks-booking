import { Slant as Hamburger } from "./Slant.js";

function MobileMenuToggle({
  className,
  ariaLabel = "Toggle navigation",
  onClick,
  isOpen,
  color,
  bg,
}) {
  return (
    <span className={`lg:hidden ${className}`}>
      <Hamburger
        color={(color || bg) && !isOpen ? "#1e1e1e" : "white"}
        toggled={isOpen}
        toggle={onClick}
        label={ariaLabel}
        distance="sm"
        size={26}
      />
    </span>
  );
}

export default MobileMenuToggle;
