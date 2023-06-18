import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

export type IconType = 'Default' | 'Circle';

export type Props = {
  checked: boolean;
  iconType?: IconType;
  onSetChecked: (value: boolean) => void;
  othersProps?: Omit<CheckboxProps, 'checked' | 'onchange'>
}

const Checkbox = ({
  checked,
  iconType = 'Default',
  onSetChecked,
  othersProps
}: Props) => {
  const UseIcon = React.useMemo(() =>
    iconType === 'Circle' && <CircleOutlinedIcon />
    , []);
  const UseCheckedIcon = React.useMemo(() =>
    iconType === 'Circle' && <CheckCircleIcon />
    , []);


  return (
    <MuiCheckbox
      checked={checked}
      onChange={e => onSetChecked(e.target.checked)}
      icon={UseIcon}
      checkedIcon={UseCheckedIcon}
      {...othersProps}
    />
  )
}
export default Checkbox;