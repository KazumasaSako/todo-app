import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act, cleanup, logRoles } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import TextField, { Props, ViewType } from 'components/common/molecules/TextField';
import AddIcon from '@mui/icons-material/Add';

/** *****************************************************
 * Support
 ***************************************************** */
/** Jest用Render */
const TestRender = (props: Omit<Props, 'className' | 'value' | 'onSetValue'>) => {
  const [TextValue, setTextValue] = React.useState<string>('');
  return (
    <TextField
      className='TestClass'
      value={TextValue}
      onSetValue={value => setTextValue(value)}
      {...props}
    />
  )
};

/** *****************************************************
 * Main
 ***************************************************** */
describe('props', () => {
  test('className', async () => {
    const { container } = render(<TestRender />);
    expect(container.firstChild).toHaveClass('TestClass');
  });
  test('value, onSetValue', async () => {
    render(<TestRender />);

    const INPUT_TEXT = 'ChangeText';
    const textBox = screen.getByRole('textbox');

    expect(textBox).toHaveValue('');

    await userEvent.type(textBox, INPUT_TEXT)
    expect(textBox).toHaveValue(INPUT_TEXT);

    await userEvent.type(textBox, '{backspace}{backspace}')
    expect(textBox).toHaveValue(INPUT_TEXT.slice(0, -2));
  });
  test('startAdornment', async () => {
    render(<TestRender startAdornment={<AddIcon />} />);
    expect(screen.queryByTestId('AddIcon')).toBeInTheDocument();
  });
  test('viewType', async () => {
    render(<TestRender viewType='text' othersProps={{ placeholder: 'TextField' }} />);
    expect(screen.getByPlaceholderText("TextField")).toHaveAttribute('type', 'text');
    expect(screen.getByPlaceholderText("TextField")).not.toHaveAttribute('type', 'password');

    cleanup();

    render(<TestRender viewType='password' othersProps={{ placeholder: 'TextField' }} />);
    expect(screen.getByPlaceholderText("TextField")).not.toHaveAttribute('type', 'text');
    expect(screen.getByPlaceholderText("TextField")).toHaveAttribute('type', 'password');
  });
  test('othersProps', async () => {
    render(
      <TestRender
        othersProps={{
          placeholder: 'TextField',
        }}
      />);
    expect(screen.getByPlaceholderText("TextField")).toBeInTheDocument();
  });
});
describe('others', () => {
  test('初期値が入力できることの確認', async () => {
    const text = 'initValue';
    render(<TextField
      value={text}
      onSetValue={jest.fn}
    />);
    expect(screen.getByRole('textbox')).toHaveValue(text);
  });
  test('viewType:passwordの際に、textとpasswordの切り替えができる事の確認', async () => {
    render(<TestRender viewType='password' othersProps={{ placeholder: 'TextField' }} />);
    expect(screen.getByPlaceholderText("TextField")).toHaveAttribute('type', 'password');
    expect(screen.getByPlaceholderText("TextField")).not.toHaveAttribute('type', 'text');
    expect(screen.queryByTestId('VisibilityIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('VisibilityOffIcon')).not.toBeInTheDocument();

    act(() => {
      screen.getByTestId('VisibilityIcon').parentElement!.click();
    })
    expect(screen.getByPlaceholderText("TextField")).not.toHaveAttribute('type', 'password');
    expect(screen.getByPlaceholderText("TextField")).toHaveAttribute('type', 'text');
    expect(screen.queryByTestId('VisibilityIcon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('VisibilityOffIcon')).toBeInTheDocument();
  });
});