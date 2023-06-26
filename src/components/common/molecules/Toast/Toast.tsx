import * as React from 'react';
import { styled, css, SxProps, Theme } from '@mui/material/styles';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import Alert, { AlertColor, } from '@mui/material/Alert';

export type VariantType = 'standard' | 'filled' | 'outlined';
export type MessageItem = {
  message: string;
  severity: AlertColor;
}

export type Props = {
  className?: string;
  /** Alert:variant */
  variant?: VariantType;
  /** 表示するMessageのList */
  messageList: MessageItem[];
  /** messageList変更イベント */
  onSetMessageList: (list: MessageItem[]) => void;
  /** その他MuiのProps */
  othersProps?: Omit<SnackbarProps, 'className' | 'open' | 'onClose'>
}

const Toast = ({
  className,
  variant = 'filled',
  messageList,
  onSetMessageList,
  othersProps
}: Props) => {
  const [IsOpen, setIsOpen] = React.useState<boolean>(false);
  const [Message, setMessage] = React.useState<MessageItem>({ message: '', severity: 'info' });
  const SnackbarCloseHandle = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway')
      return;
    CloseHandle();
  }
  const CloseHandle = () => {
    setIsOpen(false);
    const list = Array.from(messageList);
    list.shift();
    onSetMessageList(list);
  }

  React.useEffect(() => {
    if (messageList.length <= 0)
      return;
    setTimeout(() => {
      setMessage(messageList[0])
      setIsOpen(true);
    }, 100)
  }, [messageList])

  return (
    <>
      <Snackbar
        open={IsOpen}
        onClose={SnackbarCloseHandle}
        className={className}
        {...othersProps}
      >
        <Alert elevation={6} onClose={CloseHandle} severity={Message.severity} variant={variant} sx={{ width: '100%' }}>
          {Message.message}
        </Alert>
      </Snackbar>
    </>
  )
}
export default Toast;
