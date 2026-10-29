import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

export const NavbarButton = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <button
      onClick={() => {
        setNavbarOpen((n) => !n);
      }}
    >
      <AiOutlineMenu
        size={"2rem"}
        className={`absolute top-1.5 left-1.5 transition-transform ${navbarOpen ? "" : "rotate-90"}`}
      />
    </button>
  );
};