import * as React from 'react';
import { styled } from '@mui/material/styles';
import { MakeTask } from 'apis/TaskApi'
import { FormatDate, GetDayOfWeek } from 'utility/Utility'

import { CssFlex } from 'components/common/atoms/Css/CssFlex';
import TextField from 'components/common/molecules/TextField';

import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';

export type Props = {
  onMakeTask?: (value: string) => void;
}

const MakeTaslItem = ({
  onMakeTask = () => { }
}: Props) => {
  const [Title, setTitle] = React.useState<string>('');
  const AddTaskHandle = () => {
    MakeTask(Title)
      .then(() => {
        setTitle('');
        onMakeTask(Title);
      })
      .catch(() => {
        alert('タスクの追加に失敗しました。')
      })
  }

  return (
    <OverAll elevation={2}>
      <IconButton
        disabled={Title === ''}
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