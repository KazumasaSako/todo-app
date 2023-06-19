import * as React from 'react';
import { styled } from '@mui/material/styles';
import { MakeTask } from 'apis/TaskApi'

import CssFlex from 'components/common/atoms/Css/CssFlex';
import TextField from 'components/common/molecules/TextField';
import { ReloadType } from 'components/pages/todo-iist/Type';

import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';

export type Props = {
  /** Taskの変更を親に伝えるイベント */
  onReloadTask: (event: ReloadType) => void;
  /** エラー発生イベント */
  onError: (message: string) => void;
}

const MakeTaslItem = ({
  onReloadTask,
  onError
}: Props) => {
  const [Title, setTitle] = React.useState<string>('');
  const [IsAddTask, setIsAddTask] = React.useState<boolean>(false);
  const AddTaskHandle = () => {
    setIsAddTask(true);
    MakeTask(Title)
      .then(() => {
        setTitle('');
        onReloadTask('add');
      })
      .catch(() => {
        onError('タスクの追加に失敗しました。')
      })
      .finally(() => {
        setIsAddTask(false);
      })
  }

  return (
    <OverAll elevation={2}>
      <IconButton
        disabled={Title === '' || IsAddTask}
        color='primary'
        onClick={() => AddTaskHandle()}
      >
        <AddIcon />
      </IconButton>
      <TextField
        value={Title}
        onSetValue={value => setTitle(value)}
        othersProps={{
          size: 'medium',
          fullWidth: true,
          placeholder: 'タスクの追加',
          required: true,
          variant: 'standard',
        }}
      />
    </OverAll>
  )
}
export default MakeTaslItem;

const OverAll = styled(Paper)`
  padding: 5px;
  ${CssFlex({ gap: 8, flow: 'row', alignItems: 'center', justifyContent: 'flex-start' })}
`