import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act, cleanup, logRoles, waitFor } from '@testing-library/react';

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
        variant='standard'
        othersProps={{
          autoHideDuration: 300,
          autoFocus: false
        }}
      />
    );
    await waitFor(
      () => screen.getByText('MessageInfo')
    )
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standard');
    expect(screen.getByRole('alert')).not.toHaveClass('MuiAlert-filled');

    cleanup();

    render(
      <TestRender
        variant='filled'
        othersProps={{
          autoHideDuration: 300,
          autoFocus: false
        }}
      />
    );
    await waitFor(
      () => screen.getByText('MessageInfo')
    )
    expect(screen.getByRole('alert')).not.toHaveClass('MuiAlert-standard');
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-filled');
  });
  test('othersProps', async () => {
    render(
      <TestRender
        othersProps={{
          autoHideDuration: 100,
          autoFocus: false
        }}
      />
    );
    await waitFor(
      () => new Promise(resolve => setTimeout(resolve, 800))
    )
    expect(screen.queryByText('MessageInfo')).not.toBeInTheDocument();

    cleanup();

    render(
      <TestRender
        othersProps={{
          autoHideDuration: 10000,
          autoFocus: false
        }}
      />
    );
    await waitFor(
      () => new Promise(resolve => setTimeout(resolve, 800))
    )
    expect(screen.queryByText('MessageInfo')).toBeInTheDocument();
  });
});
describe('others', () => {
  test('ToastをCloseできることの確認', async () => {
    render(
      <TestRender
        othersProps={{
          autoHideDuration: 10000,
          autoFocus: true
        }}
      />
    );
    for (let i = 0; i < MessageItemList.length; i++) {
      await waitFor(
        () => screen.getByText(MessageItemList[i].message)
      )
      expect(screen.getByText(MessageItemList[i].message)).toBeInTheDocument();
      act(() => {
        screen.getByRole('button').click();
      })
    }
  });
  test('torst以外のUIをクリックした際に、torstが閉じないことの確認', async () => {
    render(
      <>
        <button>TestButton</button>
        <TestRender
          othersProps={{
            autoHideDuration: 10000,
            autoFocus: true
          }}
        />
      </>
    );
    for (let i = 0; i < (MessageItemList.length + 1); i++) { //念のため+1回確認しておく
      await waitFor(
        () => new Promise(resolve => setTimeout(resolve, 500))
      )
      act(() => {
        screen.getByRole('button', { name: 'TestButton' }).click();
      })
    }
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});