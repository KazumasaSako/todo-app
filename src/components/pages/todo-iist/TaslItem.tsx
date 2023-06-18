import * as React from 'react';
import { styled } from '@mui/material/styles';
import { TaskItemType } from 'apis/TaskApi'
import { FormatDate, GetDayOfWeek } from 'utility/Utility'

import { CssFlex } from 'components/common/atoms/Css/CssFlex';
import Checkbox from 'components/common/molecules/Checkbox';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export type Props = {
  item: TaskItemType
}

const TaskItem = ({
  item
}: Props) => {
  /** item.deadline : Date */
  const DeadlineDate = React.useMemo((): Date => new Date(item.deadline), [item])
  /** item.deadline : 表示用 */
  const DeadlineView = React.useMemo((): string => FormatDate(DeadlineDate, `yyyy年MM月dd日(${GetDayOfWeek(DeadlineDate)}) HH時mm分`), [DeadlineDate])
  /** item.deadline : 表示用 : Color */
  const DeadlineViewColor = React.useMemo((): string => new Date() < DeadlineDate ? 'gray' : 'red', [DeadlineDate])

  return (
    <OverAll elevation={2}>
      <Checkbox
        iconType='Circle'
        checked={item.completed}
        onSetChecked={() => { }}
      />
      <ContentArea>
        <Typography>
          {item.title}
        </Typography>
        <DeadlineArea>
          <CalendarMonthIcon fontSize='small' color='disabled' />
          <Typography color={DeadlineViewColor}>
            {DeadlineView}
          </Typography>
        </DeadlineArea>
      </ContentArea>
    </OverAll>
  )
}
export default TaskItem;

const OverAll = styled(Paper)`
  padding: 5px;
  ${CssFlex({ gap: 8, flow: 'row', alignItems: 'center', justifyContent: 'flex-start' })}
`
const ContentArea = styled('div')`
  ${CssFlex({ gap: 4, flow: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' })}
`
const DeadlineArea = styled('div')`
  padding-left: 8px;
  ${CssFlex({ gap: 4, flow: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' })}
`