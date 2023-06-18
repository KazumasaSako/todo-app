import * as React from 'react';
import { styled } from '@mui/material/styles';
import { ListTask, TaskItemType } from 'apis/TaskApi';

import { CssFlex } from 'components/common/atoms/Css/CssFlex';
import Layout from 'components/templates/Layout';
import TaslItem, { ReloadType } from 'components/pages/todo-iist/TaslItem';
import AddTaslItem from 'components/pages/todo-iist/MakeTaslItem';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const TodoList = () => {
  /** タスク一覧 */
  const [TaskList, setTaskList] = React.useState<TaskItemType[]>([]);
  /** TaskListをSortしたList */
  const SortTaskList = React.useMemo((): TaskItemType[] => {
    const sortList = TaskList.sort((a: TaskItemType, b: TaskItemType) => a.time_stamp < b.time_stamp ? -1 : 1);
    const completeList = sortList.filter(item => item.completed);
    const incompleteList = sortList.filter(item => !item.completed);
    return incompleteList.concat(completeList)
  }, [TaskList])

  /** TaskListの取得 */
  const GetTaskList = () => {
    ListTask().then(list => {
      setTaskList(list.data);
    })
  }
  React.useEffect(() => {
    GetTaskList();
  }, [])

  const ReloadHandle = (event: ReloadType, item: TaskItemType) => {
    // GetTaskList完了まで待つと、ラグが発生する為、先にデータを変更しておく。
    switch (event) {
      case 'change':
        setTaskList(
          TaskList.map(task =>
            task.task_id === item.task_id ? { ...item, ...{ completed: !item.completed } } : task
          )
        )
        break;
      case 'delete':
        setTaskList(
          TaskList.filter(task => task.task_id !== item.task_id)
        )
        break;
      case 'edit':
    }
    GetTaskList();
  };

  return (
    <Layout>
      <OverAll>
        <Typography variant='h5'>タスク</Typography>
        <TaskArea>
          {
            SortTaskList.map(task =>
              <TaslItem
                key={task.task_id}
                item={task}
                onReloadTask={e => ReloadHandle(e, task)}
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
  height: 100%;
  ${CssFlex({ gap: 4, flow: 'column', justifyContent: 'space-between' })}
`
const TaskArea = styled('div')`
  overflow: auto;
  height: 100%;
  ${CssFlex({ gap: 2, flow: 'column' })}
`
const AddTaskArea = styled('div')`
  margin-top: 32px;
`