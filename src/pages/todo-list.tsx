import * as React from 'react';
import { styled } from '@mui/material/styles';
import { ListTask, TaskItemType } from 'apis/TaskApi'

import TaslItem from 'components/pages/todo-iist/TaslItem';

const TodoList = () => {
  /** タスク一覧 */
  const [TaskList, setTaskList] = React.useState<TaskItemType[]>([]);
  React.useEffect(() => {
    ListTask().then(list => {
      const sortList = list.data.sort((a: TaskItemType, b: TaskItemType) => a.deadline < b.deadline ? -1 : 1);
      const completeList = sortList.filter(item => item.completed);
      const incompleteList = sortList.filter(item => !item.completed);
      setTaskList(
        incompleteList.concat(completeList)
      );
    })
  }, [])

  return (
    <>
      {
        TaskList.map(task =>
          <TaslItem key={task.task_id} item={task} />
        )
      }
    </>
  )
}
export default TodoList;