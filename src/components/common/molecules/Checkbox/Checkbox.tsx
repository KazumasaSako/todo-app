import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

export type IconType = 'Default' | 'Circle';

export type Props = {
  className?: string;
  /** check状態 */
  checked: boolean;
  /** Iconの種類 */
  iconType?: IconType;
  /** checked変更 */
  onSetChecked: (value: boolean) => void;
  /** その他MuiのProps */
  othersProps?: Omit<CheckboxProps, 'className' | 'checked' | 'onchange'>
}

const Checkbox = ({
  className,
  checked,
  iconType = 'Default',
  onSetChecked,
  othersProps
}: Props) => {
  const UseIcon = React.useMemo(() =>
    iconType === 'Circle' && <CircleOutlinedIcon />
    , [iconType]);
  const UseCheckedIcon = React.useMemo(() =>
    iconType === 'Circle' && <CheckCircleIcon />
    , [iconType]);


  return (
    <MuiCheckbox
      className={className}
      checked={checked}
      onChange={e => onSetChecked(e.target.checked)}
      icon={UseIcon}
      checkedIcon={UseCheckedIcon}
      {...othersProps}
    />
  )
}
export default Checkbox;