import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  NumberField,
  required,
} from 'admin-on-rest'

export const PathsList = props =>
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <NumberField source="rank" />
      <TextField source="color" />
      <TextField source="icon" />
      <EditButton />
    </Datagrid>
  </List>

const style = {
  floatLeftInput: { float: 'left', marginRight: '50px' },
  floatRightInput: { float: 'right', width: '100px' },
}

export const PathEdit = props =>
  <Edit {...props}>
    <SimpleForm>
      <DateField
        label="Update date"
        source="updated_at"
        style={style.floatRightInput}
      />
      <TextInput source="title" validate={required} />
      <NumberInput source="rank" validate={required} />
      <TextInput source="color" />
      <TextInput source="icon" />
    </SimpleForm>
  </Edit>

export const PathCreate = props =>
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" validate={required} />
      <NumberInput source="rank" validate={required} />
      <TextInput source="color" />
      <TextInput source="icon" />
    </SimpleForm>
  </Create>
