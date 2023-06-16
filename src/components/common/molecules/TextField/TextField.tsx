import * as React from 'react';
import { styled } from '@mui/material/styles';

import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

export type ViewType = 'text' | 'password';

export type Props = {
  /** Value */
  value: string;
  /** TextField Type */
  viewType?: ViewType;
  /** TextFieldの先頭につけるNode */
  startAdornment?: React.ReactNode;
  /** Value変更 */
  onSetValue: (value: string) => void;
  /** その他MuiのProps */
  othersProps?: Omit<TextFieldProps, 'value' | 'onChange' | 'InputProps' | 'type'>
}

const TextField = ({
  value,
  viewType = 'text',
  startAdornment,
  onSetValue,
  othersProps
}: Props) => {
  const [ShowPassword, setShowPassword] = React.useState(false);
  const Type = React.useMemo((): ViewType => {
    if (viewType === 'password')
      return ShowPassword ? 'text' : 'password'
    return viewType;
  }, [viewType, ShowPassword])
  const EndAdornment = React.useMemo(() =>
    viewType === 'password' && (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowPassword(!ShowPassword)}
          onMouseDown={event => event.preventDefault()}
          edge="end"
        >
          {ShowPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment >
    )
    , [viewType, ShowPassword])

  return (
    <StyleTextField
      value={value}
      onChange={e => onSetValue(e.target.value)}
      type={Type}
      InputProps={{
        startAdornment: startAdornment,
        endAdornment: EndAdornment
      }}
      {...othersProps}
    />
  )
}
export default TextField;

const StyleTextField = styled(MuiTextField)`
  background-color: #fff;

  &>div>input:-webkit-autofill {
    box-shadow: 0 0 0 1000px #fff inset;
  }
  &>div>svg {
    margin-right: 5px;
  }
  &>label>span{
    color:red;
  }
`