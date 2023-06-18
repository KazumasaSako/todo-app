import axios, { AxiosResponse } from 'axios';
import { TASK_API_URL } from 'config/ApiConst';
import { GetAuthHeader } from 'utility/Utility';

export type TaskItemType = {
  user_id: string;
  task_id: string;
  title: string;
  completed: boolean;
  deadline: string;
  time_stamp: string;
}

/** タスク一覧取得 */
export const ListTask = async (): Promise<AxiosResponse<TaskItemType[]>> => {
  return axios.get(`${TASK_API_URL}/task/list`, {
    headers: await GetAuthHeader()
  })
}