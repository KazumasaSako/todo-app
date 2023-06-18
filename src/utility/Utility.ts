import { GetUserInfo } from 'services/amplify/AmplifyControl';
import { CognitoUser } from 'amazon-cognito-identity-js';

export type AuthHeaderType = {
  Authorization: string;
  AccessToken: string;
}

/** 
 * Api通信の為のHeader作成
 */
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

/**
 * Dateフォーマット成形  
 * yyyy - 年  
 * MM - 月  
 * dd - 日  
 * HH - 時  
 * mm - 分  
 * ss - 秒  
 * SSS - ms
 */
export const FormatDate = (date: Date, format: string) => {
  format = format.replace(/yyyy/g, date.getFullYear().toString())
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
  format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2))
  format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2))
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
  format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3))
  return format
}

/** 
 * 曜日取得
 */
export const GetDayOfWeek = (date: Date): string => {
  const WeekItems = ["日", "月", "火", "水", "木", "金", "土"];
  return WeekItems[date.getDay()]
}
