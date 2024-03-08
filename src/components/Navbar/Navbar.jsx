import style from "./Navbar.module.css";

const Navbar = ({ children }) => {
  return <div className={style["navbar"]}>{children}</div>;
};

export default Navbar;
