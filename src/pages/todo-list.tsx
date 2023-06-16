import * as React from 'react';
import { styled } from '@mui/material/styles';
import { ListTask } from 'apis/TaskApi'

const TodoList = () => {
  React.useEffect(() => {
    ListTask().then(list => {
      console.log(list.data);
    })
  }, [])
  return (
    <>
      TodoList
    </>
  )
}
export default TodoList;