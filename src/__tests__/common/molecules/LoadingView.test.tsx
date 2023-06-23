import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act, cleanup, logRoles } from '@testing-library/react';

import LoadingView, { Props } from 'components/common/molecules/LoadingView'

/** *****************************************************
 * Support
 ***************************************************** */
/** Jest用Render */
const TestRender = (props: Omit<Props, 'className'>) => {
  return (
    <LoadingView
      className='TestClass'
      {...props}
    />
  )
};

/** *****************************************************
 * Main
 ***************************************************** */
describe('props', () => {
  test('className', async () => {
    const { container } = render(<TestRender isLoading={true} />);
    expect(container.firstChild).toHaveClass('TestClass');
  });
  test('isLoading', async () => {
    render(<TestRender isLoading={true} />);
    expect(screen.queryByRole('progressbar')).toBeInTheDocument();

    cleanup();

    render(<TestRender isLoading={false} />);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  test('view', async () => {
    render(<TestRender isLoading={true} view='ParentElement' />);
    expect(screen.getByRole('progressbar').parentElement).toHaveStyle({
      position: 'absolute'
    });
    expect(screen.getByRole('progressbar').parentElement).not.toHaveStyle({
      position: 'fixed'
    });

    cleanup();

    render(<TestRender isLoading={true} view='WholePage' />);
    expect(screen.getByRole('progressbar').parentElement).not.toHaveStyle({
      position: 'getByRole'
    });
    expect(screen.getByRole('progressbar').parentElement).toHaveStyle({
      position: 'fixed'
    });
  });
});