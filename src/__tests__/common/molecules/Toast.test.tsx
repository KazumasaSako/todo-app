import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act, cleanup, logRoles, waitFor } from '@testing-library/react';
import userEvent, { keyboardKey } from "@testing-library/user-event";

import Toast, { Props, MessageItem, VariantType } from 'components/common/molecules/Toast';

/** *****************************************************
 * Support
 ***************************************************** */
/** Jest用Render */
const TestRender = (props: Omit<Props, 'className' | 'messageList' | 'onSetMessageList'>) => {
  const [MessageList, setMessageList] = React.useState<MessageItem[]>(MessageItemList);
  return (
    <Toast
      className='TestClass'
      messageList={MessageList}
      onSetMessageList={list => setMessageList(list)}
      {...props}
    />
  )
};

const MessageItemList: MessageItem[] = [
  { severity: 'info', message: 'MessageInfo' },
  { severity: 'success', message: 'MessageSuccess' },
  { severity: 'error', message: 'MessageError' },
  { severity: 'warning', message: 'MessageWarning' },
]

/** *****************************************************
 * Main
 ***************************************************** */
describe('props', () => {
  test('className', async () => {
    const { container } = render(
      <TestRender
        othersProps={{
          autoHideDuration: 10000,
          autoFocus: false
        }}
      />
    );
    await waitFor(
      () => screen.getByText('MessageInfo')
    )
    expect(container.firstChild).toHaveClass('TestClass');
  });
  test('messageList, onSetMessageList', async () => {
    render(
      <TestRender
        othersProps={{
          autoHideDuration: 300,
          autoFocus: false
        }}
      />
    );
    for (let i = 0; i < MessageItemList.length; i++) {
      await waitFor(
        () => screen.getByText(MessageItemList[i].message)
      )
      expect(screen.getByText(MessageItemList[i].message)).toBeInTheDocument();
    }
    await waitFor(
      () => expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
    )
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
  });
  test('variant', async () => {
    render(
      <TestRender
        othersProps={{
          autoHideDuration: 300,
          autoFocus: false
        }}
      />
    );
    throw new Error('Unimplemented')
  });
  test('othersProps', async () => {
    render(
      <TestRender
        othersProps={{
          autoHideDuration: 300,
          autoFocus: false
        }}
      />
    );
    throw new Error('Unimplemented')
  });
});