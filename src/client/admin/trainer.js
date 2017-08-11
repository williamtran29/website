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
  LongTextInput,
  required,
} from 'admin-on-rest'

export const TrainersList = props =>
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <DateField source="updated_at" />
      <TextField source="picture" />
      <TextField source="slug" />
      <EditButton />
    </Datagrid>
  </List>

const style = {
  floatLeftInput: { float: 'left', marginRight: '50px' },
  floatRightInput: { float: 'right', width: '100px' },
}

export const TrainerEdit = props =>
  <Edit {...props}>
    <SimpleForm>
      <DateField
        label="Update date"
        source="updated_at"
        style={style.floatRightInput}
      />

      <TextInput
        source="first_name"
        validate={required}
        style={style.floatLeftInput}
      />
      <TextInput source="last_name" validate={required} />

      <TextInput source="picture" style={style.floatLeftInput} />
      <TextInput source="slug" validate={required} />
      <LongTextInput source="description" />
    </SimpleForm>
  </Edit>

export const TrainerCreate = props =>
  <Create {...props}>
    <SimpleForm>
      <TextInput
        source="first_name"
        validate={required}
        style={style.floatLeftInput}
      />
      <TextInput source="last_name" validate={required} />

      <TextInput source="picture" style={style.floatLeftInput} />
      <TextInput source="slug" validate={required} />
      <LongTextInput source="description" />
    </SimpleForm>
  </Create>
