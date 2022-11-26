//styles
import { NavItem } from "./CustomNavLink.styles";

//router
import { NavLink } from "react-router-dom";

const CustomNavLink = ({ to, activeIcon, inActiveIcon, name }) => {
  return (
    <NavLink
      to={to}
      children={({ isActive }) =>
        isActive ? (
          <NavItem>
            <div className="icon">{activeIcon}</div>
            <div>{name}</div>
          </NavItem>
        ) : (
          <NavItem>
            <div className="icon">{inActiveIcon}</div>
            <div>{name}</div>
          </NavItem>
        )
      }
    ></NavLink>
  );
};

export default CustomNavLink;
