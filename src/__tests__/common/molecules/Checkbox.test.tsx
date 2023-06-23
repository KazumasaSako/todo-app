import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act, cleanup, logRoles } from '@testing-library/react';

import Checkbox, { Props } from 'components/common/molecules/Checkbox'

/** *****************************************************
 * Support
 ***************************************************** */
/** Jest用Render */
const TestRender = (props: Omit<Props, 'className' | 'checked' | 'onSetChecked'>) => {
  const [CheckValue, setCheckValue] = React.useState<boolean>(false);
  return (
    <Checkbox
      className='TestClass'
      checked={CheckValue}
      onSetChecked={value => setCheckValue(value)}
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
  test('checked, onSetChecked', async () => {
    render(<TestRender />);
    const input: HTMLInputElement = screen.getByRole('checkbox');
    expect(input).not.toBeChecked();
    act(() => {
      input.click();
    })
    expect(input).toBeChecked();
  });
  test('iconType', async () => {
    render(<TestRender iconType='Default' />);
    expect(screen.queryByTestId('CheckBoxOutlineBlankIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('CircleOutlinedIcon')).not.toBeInTheDocument();

    cleanup();

    render(<TestRender iconType='Circle' />);
    expect(screen.queryByTestId('CheckBoxOutlineBlankIcon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('CircleOutlinedIcon')).toBeInTheDocument();
  });
  test('othersProps', async () => {
    const { container } = render(
      <TestRender
        othersProps={{
          sx: {
            color: 'red'
          }
        }}
      />
    );
    expect(container.firstChild).toHaveStyle({
      color: 'red'
    });
  });
});