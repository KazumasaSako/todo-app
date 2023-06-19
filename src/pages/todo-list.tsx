import * as React from 'react';
import { styled } from '@mui/material/styles';
import { ListTask, TaskItemType } from 'apis/TaskApi';
import { GetUserInfo } from 'services/amplify/AmplifyControl';

import CssFlex from 'components/common/atoms/Css/CssFlex';
import CssScrollBar from 'components/common/atoms/Css/CssScrollBar';
import Toast, { MessageItem } from 'components/common/molecules/Toast';
import LoadingView from 'components/common/molecules/LoadingView';
import Layout from 'components/templates/Layout';
import TaslItem from 'components/pages/todo-iist/TaslItem';
import AddTaslItem from 'components/pages/todo-iist/MakeTaslItem';
import { ReloadType } from 'components/pages/todo-iist/Type';

import Typography from '@mui/material/Typography';

const TodoList = () => {
  /** タスク一覧 */
  const [TaskList, setTaskList] = React.useState<TaskItemType[] | undefined>(undefined);
  /** TaskListをSortしたList */
  const SortTaskList = React.useMemo((): TaskItemType[] => {
    if (TaskList === undefined)
      return [];
    const sortList = TaskList.sort((a: TaskItemType, b: TaskItemType) => a.time_stamp < b.time_stamp ? -1 : 1);
    const completeList = sortList.filter(item => item.completed);
    const incompleteList = sortList.filter(item => !item.completed);
    return incompleteList.concat(completeList)
  }, [TaskList])
  /** Torst : Message */
  const [ToastMessageList, setToastMessageList] = React.useState<MessageItem[]>([]);

  /** TaskListの取得 */
  const GetTaskList = () => {
    ListTask().then(list => {
      setTaskList(list.data);
    })
  }
  React.useEffect(() => {
    GetTaskList();
  }, [])


  const ReloadHandle = (event: ReloadType, item?: TaskItemType) => {
    // GetTaskList完了まで待つと、ラグが発生する為、先にデータを変更しておく。
    // addに関しては、ラグは問題ないため、GetTaskListで取得する。
    if (item) {
      switch (event) {
        case 'change':
          setTaskList(
            SortTaskList.map(task =>
              task.task_id === item.task_id ? { ...item, ...{ completed: !item.completed } } : task
            )
          )
          break;
        case 'delete':
          setTaskList(
            SortTaskList.filter(task => task.task_id !== item.task_id)
          )
          break;
      }
    }

    // Toastの表示
    if (event === 'add' || event === 'delete')
      setToastMessageList([
        {
          severity: 'info',
          message: event === 'add' ? 'タスクが追加されました。' :
            event === 'delete' ? 'タスクが削除されました。' :
              ''
        }
      ])

    // Taskの再取得
    GetTaskList();
  };

  const ErrorHandle = (message: string) => {
    setToastMessageList([
      {
        severity: 'error',
        message: message
      }
    ])
  }

  return (
    <Layout>
      <OverAll>
        <ContentArea>
          <Typography variant='h5'>タスク</Typography>
          <TaskArea>
            {
              SortTaskList.map(task =>
                <TaslItem
                  key={task.task_id}
                  item={task}
                  onReloadTask={e => ReloadHandle(e, task)}
                  onError={message => ErrorHandle(message)}
                />
              )
            }
            <LoadingView
              view='ParentElement'
              isLoading={TaskList === undefined}
            />
          </TaskArea>
          <AddTaskArea>
            <AddTaslItem
              onReloadTask={e => ReloadHandle(e)}
              onError={message => ErrorHandle(message)}
            />
          </AddTaskArea>
        </ContentArea>
      </OverAll>
      <Toast
        messageList={ToastMessageList}
        onSetMessageList={list => setToastMessageList(list)}
        variant='standard'
        othersProps={{
          autoHideDuration: 1000,
          anchorOrigin: {
            horizontal: 'right',
            vertical: 'top'
          }
        }}
      />
    </Layout>
  )
}
export default TodoList;

const OverAll = styled('div')`
  padding:24px;
  height: 100%;
  ${CssFlex({ gap: 0, flow: 'row', alignItems: 'center', justifyContent: 'center' })}
`
const ContentArea = styled('div')`
  height: 100%;
  min-width: 700px;
  ${CssFlex({ gap: 4, flow: 'column', justifyContent: 'space-between' })}
  @media only screen and (max-width: 767px){
    min-width: 100%;
  }
`
const TaskArea = styled('div')`
  height: 100%;
  position: relative;
  ${CssFlex({ gap: 6, flow: 'column' })}
  ${CssScrollBar({ color: '#a9a9a9', border_width: '2px' })}
`
const AddTaskArea = styled('div')`
  margin-top: 32px;
`