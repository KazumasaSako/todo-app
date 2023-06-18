import * as React from 'react';
import { styled } from '@mui/material/styles';
import { ListTask, TaskItemType } from 'apis/TaskApi'

import Layout from 'components/templates/Layout';
import TaslItem from 'components/pages/todo-iist/TaslItem';

const TodoList = () => {
  /** タスク一覧 */
  const [TaskList, setTaskList] = React.useState<TaskItemType[]>([]);
  React.useEffect(() => {
    ListTask().then(list => {
      const sortList = list.data.sort((a: TaskItemType, b: TaskItemType) => a.time_stamp < b.time_stamp ? -1 : 1);
      const completeList = sortList.filter(item => item.completed);
      const incompleteList = sortList.filter(item => !item.completed);
      setTaskList(
        incompleteList.concat(completeList)
      );
    })
  }, [])

  return (
    <Layout>
      {
        TaskList.map(task =>
          <TaslItem key={task.task_id} item={task} />
        )
      }
    </Layout>
  )
}
export default TodoList;