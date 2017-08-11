import React from 'react'
import { List, Datagrid, TextField } from 'admin-on-rest'

export const TrainingsList = props =>
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="updated_at" />
      <TextField source="duration" />
      <TextField source="slug" />
      <TextField source="abstract" />
    </Datagrid>
  </List>
