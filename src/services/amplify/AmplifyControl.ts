import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';

export const Login = async (username: string, password: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      const userData = await Auth.signIn(username, password);
      resolve(userData)
    } catch (err: any) {
      reject(err.message);
    }
  });
}