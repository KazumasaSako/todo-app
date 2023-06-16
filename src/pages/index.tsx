import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Login, ChangeTemporaryPassword } from 'services/amplify/AmplifyControl';

import { CssFlex } from 'components/common/atoms/Css/CssFlex';
import TextField from 'components/common/molecules/TextField';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const Index = () => {
  const Router = useRouter();
  const [Username, setUsername] = React.useState<string>('');
  const [Password, setPassword] = React.useState<string>('');
  const ButtonDisabled = React.useMemo(() =>
    Username === '' || Password === ''
    , [Username, Password])

  const [IsLogin, setIsLogin] = React.useState<boolean>(false);
  const LoginHandle = () => {
    setIsLogin(true);
    Login(Username, Password)
      .then((userData) => {
        // 仮パスワード変更の必要なし
        if (!('challengeName' in userData)) {
          Router.push({ pathname: '/todo-list' });
        }
        // 仮パスワード変更の必要あり
        else if (userData.challengeName == "NEW_PASSWORD_REQUIRED") {
          ChangeTemporaryPassword(userData, Password)
            .then(() => {
              Router.push({ pathname: '/todo-list' });
            })
        }
      })
      .catch(() => {
        alert('ユーザー名またはパスワードが違います。');
      })
      .finally(() => {
        setIsLogin(false);
      })
  };

  return (
    <OverAll>
      <StylePaper elevation={4}>
        <TitleArea>
          <ListAltIcon fontSize='large' />
          <Typography variant='h4'>TODO APP</Typography>
        </TitleArea>

        <TextField
          value={Username}
          onSetValue={value => setUsername(value)}
          viewType='text'
          startAdornment={<PersonIcon color='disabled' />}
          othersProps={{
            size: 'small',
            fullWidth: true,
            label: 'ユーザー名',
            placeholder: 'ユーザー名を入力',
            required: true,
            variant: 'standard',
          }}
        />
        <TextField
          value={Password}
          onSetValue={value => setPassword(value)}
          viewType='password'
          startAdornment={<LockIcon color='disabled' />}
          othersProps={{
            size: 'small',
            fullWidth: true,
            label: 'パスワード',
            placeholder: 'パスワードを入力',
            required: true,
            variant: 'standard',
          }}
        />

        <LoginButton
          variant='contained'
          fullWidth
          disabled={ButtonDisabled}
          loading={IsLogin}
          onClick={LoginHandle}
        >
          ログイン
        </LoginButton>
      </StylePaper>
    </OverAll>
  )
}
export default Index;

const OverAll = styled('div')`
  padding:30px;
  height: 100%;
  ${CssFlex({ alignItems: 'center', justifyContent: 'center' })};
`
const TitleArea = styled('div')`
  ${CssFlex({ flow: 'row', alignItems: 'center', justifyContent: 'center' })};
  margin-bottom: 50px;
  &>svg{
    font-size: 48px;
  }
`
const StylePaper = styled(Paper)`
  width: 500px;
  height: fit-content;
  padding:40px;  
  ${CssFlex({ gap: 16, flow: 'column', alignItems: 'center', justifyContent: 'flex-start' })};
`
const LoginButton = styled(LoadingButton)`
  margin-top: 32px;
`