import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act, cleanup, logRoles } from '@testing-library/react';

import Menu, { Props, MenuItemType } from 'components/common/molecules/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

/** *****************************************************
 * Support
 ***************************************************** */
/** Jest用Render */
const TestRender = (props: Omit<Props, 'className'>) => {
  return (
    <Menu
      className='TestClass'
      {...props}
    />
  )
};

const MenuItem: MenuItemType[] = [
  { text: 'MenuText1' },
  { text: 'MenuText2' }
]

/** *****************************************************
 * Main
 ***************************************************** */
describe('props', () => {
  test('className', async () => {
    const { container } = render(<TestRender buttonIcon={<MenuIcon />} menuItems={MenuItem} />);
    expect(container.firstChild).toHaveClass('TestClass');
  });
  test('buttonIcon', async () => {
    render(<TestRender buttonIcon={<MenuIcon />} menuItems={MenuItem} />);
    expect(screen.queryByTestId('MenuIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('WidgetsIcon')).not.toBeInTheDocument();

    cleanup();

    render(<TestRender buttonIcon={<WidgetsIcon />} menuItems={MenuItem} />);
    expect(screen.queryByTestId('MenuIcon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('WidgetsIcon')).toBeInTheDocument();
  });
  test('menuItems:text', async () => {
    const menuItem: MenuItemType[] = [
      { text: 'MenuText1' },
      { text: 'MenuText2' }
    ]

    render(<TestRender buttonIcon={<MenuIcon />} menuItems={menuItem} />);
    expect(screen.queryByText(menuItem[0].text)).not.toBeInTheDocument();
    expect(screen.queryByText(menuItem[1].text)).not.toBeInTheDocument();
    act(() => {
      screen.getByRole('button').click();
    })
    expect(screen.queryByText(menuItem[0].text)).toBeInTheDocument();
    expect(screen.queryByText(menuItem[1].text)).toBeInTheDocument();
  });
  test('menuItems:icon', async () => {
    const menuItem: MenuItemType[] = [
      { text: 'MenuText1', icon: <AddIcon /> },
      { text: 'MenuText2', icon: <DeleteIcon /> }
    ]

    render(<TestRender buttonIcon={<MenuIcon />} menuItems={menuItem} />);
    expect(screen.queryByTestId('AddIcon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('DeleteIcon')).not.toBeInTheDocument();
    act(() => {
      screen.getByRole('button').click();
    })
    expect(screen.queryByTestId('AddIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('DeleteIcon')).toBeInTheDocument();
  });
  test('menuItems:onClick', async () => {
    const menuText1Handle = jest.fn();
    const menuText2Handle = jest.fn();
    const menuItem: MenuItemType[] = [
      { text: 'MenuText1', onClick: menuText1Handle },
      { text: 'MenuText2', icon: <DeleteIcon />, onClick: menuText2Handle }
    ]

    render(<TestRender buttonIcon={<MenuIcon />} menuItems={menuItem} />);
    expect(menuText1Handle).toBeCalledTimes(0);
    expect(menuText2Handle).toBeCalledTimes(0);
    act(() => {
      screen.getByRole('button').click();
    });
    act(() => {
      screen.getByText(menuItem[0].text).click();
      screen.getByText(menuItem[1].text).click();
    });
    expect(menuText1Handle).toBeCalledTimes(1);
    expect(menuText2Handle).toBeCalledTimes(1);
  });
  test('othersButtonProps', async () => {
    render(
      <TestRender
        buttonIcon={<MenuIcon />}
        menuItems={MenuItem}
        othersButtonProps={{
          sx: {
            color: 'red'
          }
        }}
      />);
    expect(screen.getByRole('button')).toHaveStyle({
      color: 'red'
    });
  });
  test('othersButtonProps', async () => {
    const {
      container
    } = render(
      <TestRender
        buttonIcon={<MenuIcon />}
        menuItems={MenuItem}
        othersMenuProps={{
          sx: {
            color: 'red'
          }
        }}
      />);
    act(() => {
      screen.getByRole('button').click();
    });
    expect(screen.getByRole('presentation')).toHaveStyle({
      color: 'red'
    });
  });
});