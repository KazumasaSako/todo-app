import * as React from 'react';
import { styled, css } from '@mui/material/styles';
import { TaskItemType, DestroyTask, EditTask } from 'apis/TaskApi'

import CssFlex from 'components/common/atoms/Css/CssFlex';
import Checkbox from 'components/common/molecules/Checkbox';
import Menu from 'components/common/molecules/Menu';
import { ReloadType } from 'components/pages/todo-iist/Type';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';

export type Props = {
  /** 表示するアイテム */
  item: TaskItemType;
  /** Taskの変更を親に伝えるイベント */
  onReloadTask: (event: ReloadType) => void;
  /** エラー発生イベント */
  onError: (message: string) => void;
}

const TaskItem = ({
  item,
  onReloadTask,
  onError
}: Props) => {
  const ChangeCompletedHandle = () => {
    EditTask(item.task_id, item.title, !item.completed)
      .then(() => {
        onReloadTask('change');
      })
      .catch(() => {
        onError('ステータスの変更に失敗しました。');
      })
  }
  const DeleteTaskHandle = () => {
    DestroyTask(item.task_id)
      .then(() => {
        onReloadTask('delete');
      })
      .catch(() => {
        onError('タスクの削除に失敗しました。');
      })
  }

  return (
    <OverAll elevation={2}>
      <ContentArea>
        <Checkbox
          iconType='Circle'
          checked={item.completed}
          onSetChecked={ChangeCompletedHandle}
        />
        <StyleTitle checked={item.completed}>
          {item.title}
        </StyleTitle>
      </ContentArea>

      <Menu
        buttonIcon={<MenuIcon />}
        menuItems={[{
          text: '削除',
          icon: <DeleteIcon />,
          onClick: DeleteTaskHandle
        }]}
      />
    </OverAll>
  )
}
export default TaskItem;

const OverAll = styled(Paper)`
  position: relative;
  padding: 5px;
  ${CssFlex({ gap: 8, flow: 'row', alignItems: 'center', justifyContent: 'space-between' })}
`
const ContentArea = styled('div')`
  ${CssFlex({ gap: 8, flow: 'row', alignItems: 'center', justifyContent: 'flex-start' })}
`
const StyleTitle = styled(Typography)`
  ${(props: { checked: boolean }) => css`
    ${props.checked && `
      text-decoration: line-through;
    `}
  `}
`