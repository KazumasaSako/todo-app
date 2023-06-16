import { GetUserInfo } from 'services/amplify/AmplifyControl';
import { CognitoUser } from 'amazon-cognito-identity-js';

export type AuthHeaderType = {
  Authorization: string;
  AccessToken: string;
}

/* Api通信の為のHeader作成 */
export const GetAuthHeader = async (): Promise<AuthHeaderType> => {
  const userData = await GetUserInfo();
  const TypeConversion = userData as unknown as {
    signInUserSession: any,
    username: any
  };
  return {
    Authorization: TypeConversion.signInUserSession.idToken.jwtToken,
    AccessToken: TypeConversion.signInUserSession.accessToken.jwtToken
  }
}