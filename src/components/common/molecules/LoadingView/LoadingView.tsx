import * as React from 'react';
import { styled, css, SxProps, Theme } from '@mui/material/styles';
import CssFlex from 'components/common/atoms/Css/CssFlex';
import CircularProgress from '@mui/material/CircularProgress';

export type ViewType = 'WholePage' | 'ParentElement';
export type Props = {
  className?: string;
  isLoading: boolean;
  view?: ViewType;
}

const LoadingView = ({
  className,
  isLoading,
  view = 'WholePage'
}: Props) => {
  return (
    <>
      {
        isLoading && (
          <StyleOverall view={view} className={className}>
            <CircularProgress size={34} thickness={5} />
          </StyleOverall>
        )
      }
    </>
  )
}
export default LoadingView;

const StyleOverall = styled('div')`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 9999;

  ${CssFlex({ alignItems: 'center', justifyContent: 'center' })}
  ${(props: { view: ViewType }) => css`
    ${props.view === 'WholePage' ? `
      position: fixed;
      top:0;
      left:0;
    `: props.view === 'ParentElement' && `
      position: absolute;
    `}  
  `}
`