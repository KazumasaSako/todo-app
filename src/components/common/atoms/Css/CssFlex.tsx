import { css } from '@mui/material/styles';

export type FlexFlowType =
  'column' |
  'row' |
  'column-reverse' |
  'row-reverse' |
  'unset'

export type AlignItemsType =
  "start" |
  "center" |
  "end" |
  "flex-start" |
  "flex-end" |
  "unset"

export type JustifyContentType =
  "start" |
  "center" |
  "end" |
  "flex-start" |
  "flex-end" |
  "left" |
  "right" |
  "space-between" |
  "normal"

export type Props = {
  flow?: FlexFlowType;
  gap?: number;
  alignItems?: AlignItemsType;
  justifyContent?: JustifyContentType
}

export const CssFlex = ({
  flow = 'column',
  gap = 3,
  alignItems,
  justifyContent
}: Props) => css`
  display: flex;
  flex-flow: ${flow};
  gap:${gap}px;
  align-items: ${alignItems};
  justify-content: ${justifyContent};
`
export default CssFlex;