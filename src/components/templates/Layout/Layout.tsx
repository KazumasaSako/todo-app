import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { APP_NAME } from 'utility/Const';
import { Logout } from 'services/amplify/AmplifyControl';

import { CssFlex } from 'components/common/atoms/Css/CssFlex';

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ListAltIcon from '@mui/icons-material/ListAlt';

export type Props = {
  children: React.ReactNode;
}

const Layout = ({
  children
}: Props) => {
  const Router = useRouter();
  const LogoutHandle = () => {
    Logout().then(() => {
      Router.push({ pathname: '/' })
    })
  }

  return (
    <>
      <Header position="static">
        <TitleArea>
          <ListAltIcon fontSize='medium' />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {APP_NAME}
          </Typography>
        </TitleArea>
        <Button color="inherit" onClick={() => LogoutHandle()}>
          Logout
        </Button>
      </Header>
      <Body>
        {children}
      </Body>
    </>
  )
}
export default Layout;

const HeaderHeight = '60px';

const Header = styled(AppBar)`
  ${CssFlex({ flow: 'row', alignItems: 'center', justifyContent: 'space-between' })};
  padding:0px 20px;
  height:${HeaderHeight};
`
const Body = styled('div')`
  height:calc(100% - ${HeaderHeight});
`
const TitleArea = styled('div')`
  ${CssFlex({ flow: 'row', alignItems: 'center', justifyContent: 'center' })};
`