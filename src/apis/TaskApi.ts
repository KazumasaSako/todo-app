import axios from 'axios';
import { TASK_API_URL } from 'config/ApiConst';
import { GetAuthHeader } from 'utility/Utility';

/** タスク一覧取得 */
export const ListTask = async () => {
  return axios.get(`${TASK_API_URL}/task/list`, {
    headers: await GetAuthHeader()
  })
}