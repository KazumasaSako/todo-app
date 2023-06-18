import * as React from 'react';
import { styled } from '@mui/material/styles';
import { TaskItemType, DestroyTask, EditTask } from 'apis/TaskApi'

import { CssFlex } from 'components/common/atoms/Css/CssFlex';
import Checkbox from 'components/common/molecules/Checkbox';
import Menu from 'components/common/molecules/Menu';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export type ReloadType = 'change' | 'delete' | 'edit';

export type Props = {
  item: TaskItemType;
  onReloadTask: (event: ReloadType) => void;
}

const TaskItem = ({
  item,
  onReloadTask
}: Props) => {
  const ChangeCompletedHandle = () => {
    EditTask(item.task_id, item.title, !item.completed)
      .then(() => {
        onReloadTask('change');
      })
      .catch(() => {
        alert('ステータスの変更に失敗しました。')
      })
  }
  const DeleteTaskHandle = () => {
    DestroyTask(item.task_id)
      .then(() => {
        onReloadTask('delete');
      })
      .catch(() => {
        alert('タスクの削除に失敗しました。')
      })
  }
  const EditTaskHandle = () => {
  }

  return (
    <OverAll elevation={2}>
      <ContentArea>
        <Checkbox
          iconType='Circle'
          checked={item.completed}
          onSetChecked={ChangeCompletedHandle}
        />
        <Typography>
          {item.title}
        </Typography>
      </ContentArea>


      <Menu
        buttonIcon={<MenuIcon />}
        menuItems={[
          {
            text: '編集',
            icon: <EditIcon />,
            onClick: EditTaskHandle
          },
          {
            text: '削除',
            icon: <DeleteIcon />,
            onClick: DeleteTaskHandle
          }
        ]}
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
const StyleMenuIcon = styled(MenuIcon)`
  margin-right: 15px;
`