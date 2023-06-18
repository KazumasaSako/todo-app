import * as React from 'react';
import { styled } from '@mui/material/styles';
import { ListTask, TaskItemType } from 'apis/TaskApi';

import { CssFlex } from 'components/common/atoms/Css/CssFlex';
import Layout from 'components/templates/Layout';
import TaslItem from 'components/pages/todo-iist/TaslItem';
import AddTaslItem from 'components/pages/todo-iist/MakeTaslItem';

import Typography from '@mui/material/Typography';

const TodoList = () => {
  /** タスク一覧 */
  const [TaskList, setTaskList] = React.useState<TaskItemType[]>([]);
  /** TaskListの取得 */
  const GetTaskList = () => {
    ListTask().then(list => {
      const sortList = list.data.sort((a: TaskItemType, b: TaskItemType) => a.time_stamp < b.time_stamp ? -1 : 1);
      const completeList = sortList.filter(item => item.completed);
      const incompleteList = sortList.filter(item => !item.completed);
      setTaskList(
        incompleteList.concat(completeList)
      );
    })
  }
  React.useEffect(() => {
    GetTaskList();
  }, [])

  return (
    <Layout>
      <OverAll>
        <TaskArea>
          <Typography variant='h5'>タスク</Typography>
          {
            TaskList.map(task =>
              <TaslItem
                key={task.task_id}
                item={task}
                onDestroyTask={() => GetTaskList()}
              />
            )
          }
        </TaskArea>
        <AddTaskArea>
          <AddTaslItem
            onMakeTask={() => GetTaskList()}
          />
        </AddTaskArea>
      </OverAll>
    </Layout>
  )
}
export default TodoList;

const OverAll = styled('div')`
  padding:24px;
  ${CssFlex({ gap: 32, flow: 'column' })}
`
const TaskArea = styled('div')`
  ${CssFlex({ gap: 2, flow: 'column' })}
`
const AddTaskArea = styled('div')`
  
`