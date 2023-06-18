import axios, { AxiosResponse } from 'axios';
import { TASK_API_URL } from 'config/ApiConst';
import { GetAuthHeader } from 'utility/Utility';

export type TaskItemType = {
  user_id: string;
  task_id: string;
  title: string;
  completed: boolean;
  time_stamp: string;
}

/** タスク一覧取得 */
export const ListTask = async (): Promise<AxiosResponse<TaskItemType[]>> => {
  return axios.get(`${TASK_API_URL}/task/list`, {
    headers: await GetAuthHeader()
  })
}

/** タスク作成 */
export const MakeTask = async (titie: string): Promise<AxiosResponse<TaskItemType[]>> => {
  return axios.post(`${TASK_API_URL}/task/make`, {
    title: titie
  }, { headers: await GetAuthHeader() })
}

/** タスク削除 */
export const DestroyTask = async (taskID: string): Promise<AxiosResponse<TaskItemType[]>> => {
  return axios.delete(`${TASK_API_URL}/task/destroy`, {
    params: {
      task_id: taskID
    },
    headers: await GetAuthHeader(),
  })
}

/** タスク編集 */
export const EditTask = async (task_id: string, title: string, completed: boolean): Promise<AxiosResponse<TaskItemType[]>> => {
  return axios.put(`${TASK_API_URL}/task/edit`, {
    task_id: task_id,
    title: title,
    completed: completed
  }, { headers: await GetAuthHeader() }
  )
}