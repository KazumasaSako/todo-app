import * as React from 'react';
import { styled } from '@mui/material/styles';
import { TaskItemType } from 'apis/TaskApi'

import { CssFlex } from 'components/common/atoms/Css/CssFlex';
import Checkbox from 'components/common/molecules/Checkbox';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export type Props = {
  item: TaskItemType
}

const TaskItem = ({
  item
}: Props) => {
  return (
    <OverAll elevation={2}>
      <Checkbox
        iconType='Circle'
        checked={item.completed}
        onSetChecked={() => { }}
      />
      <Typography>
        {item.title}
      </Typography>
    </OverAll>
  )
}
export default TaskItem;

const OverAll = styled(Paper)`
  padding: 5px;
  ${CssFlex({ gap: 8, flow: 'row', alignItems: 'center', justifyContent: 'flex-start' })}
`