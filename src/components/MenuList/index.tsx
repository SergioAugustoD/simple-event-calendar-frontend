import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MenuButton, MenuItem, MenuList } from "./styles";

type MenuProps = {
  isOpen: boolean;
  handleToggleMenu: () => void;
  handleLogout: () => void;
};

const Menu: React.FC<MenuProps> = ({
  isOpen,
  handleToggleMenu,
  handleLogout,
}) => {
  const navigate = useNavigate();

  const handleMenuClick = (route: string) => {
    handleToggleMenu();
    navigate(route);
  };

  return (
    <MenuList isOpen={isOpen}>
      <MenuItem>
        <MenuButton onClick={() => handleMenuClick("/events")}>
          Eventos
        </MenuButton>
      </MenuItem>
      <MenuItem>
        <MenuButton onClick={() => handleMenuClick("/events-confirmation")}>
          Meus Eventos
        </MenuButton>
      </MenuItem>
      <MenuItem>
        <MenuButton onClick={() => handleMenuClick("/about")}>About</MenuButton>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <MenuButton>
          <FiLogOut />
        </MenuButton>
      </MenuItem>
    </MenuList>
  );
};

export default Menu;
