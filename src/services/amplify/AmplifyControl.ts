import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';

/** ログイン */
export const Login = async (username: string, password: string): Promise<CognitoUser> => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await Auth.signIn(username, password);
      resolve(userData)
    } catch (err: any) {
      reject(err.message);
    }
  });
}

/** 仮パスワード変更 */
export const ChangeTemporaryPassword = async (userData: any, newPassword: string): Promise<CognitoUser> => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Auth.completeNewPassword(userData, newPassword);
      resolve(data)
    } catch (err: any) {
      reject(err.message);
    }
  });
}

/** ログアウト */
export const Logout = async (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await Auth.signOut();
      resolve()
    } catch (err: any) {
      reject(err.message);
    }
  });
}

/** ユーザー情報取得 */
export const GetUserInfo = async (): Promise<CognitoUser> => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await Auth.currentAuthenticatedUser()
      resolve(userData)
    } catch (err: any) {
      reject(err.message);
    }
  });
}