import { styled, css } from '@mui/material/styles';

export type Props = {
  width?: string;
  border_width?: string;
  color?: string;
}

export const CssScrollBar = ({
  width = '10px',
  border_width = '4px',
  color = '#e0e0e0'
}: Props) => css`
  overflow: auto;
  ::-webkit-scrollbar {
    width: ${width};
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 100px;
    box-shadow: inset 0 0 ${width} ${width} ${color};
    border: solid ${border_width} transparent;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
`
export default CssScrollBar;