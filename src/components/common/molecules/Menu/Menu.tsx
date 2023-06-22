import * as React from 'react';
import { styled } from '@mui/material/styles';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MuiMenu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export type MenuItemType = {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export type Props = {
  className?: string;
  /** IconButtonに表示するNode */
  buttonIcon: React.ReactNode;
  /** Menuに表示するアイテム */
  menuItems: MenuItemType[];
  /** IconButton:MuiのProps */
  othersButtonProps?: Omit<IconButtonProps, 'onClick'>;
  /** Menu:MuiのProps */
  othersMenuProps?: Omit<MenuProps, 'anchorEl' | 'open' | 'onClose'>;
}

const Menu = ({
  className,
  buttonIcon,
  menuItems,
  othersButtonProps,
  othersMenuProps
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={className}>
      <IconButton
        onClick={handleClick}
        {...othersButtonProps}
      >
        {buttonIcon}
      </IconButton >

      <MuiMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        {...othersMenuProps}
      >
        {
          menuItems.map(item =>
            <MenuItem
              key={item.text}
              onClick={() => item.onClick && item.onClick()}
            >
              {
                item.icon && (
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                )
              }
              <ListItemText>
                {item.text}
              </ListItemText>
            </MenuItem>
          )
        }
      </MuiMenu>
    </div>
  )
}
export default Menu;