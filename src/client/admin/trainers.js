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
  DisabledInput,
  TextInput,
  LongTextInput,
  // DeleteButton,
  // required,
} from 'admin-on-rest'
import { clUrl } from 'modules/cloudinary'

export const TrainersList = props =>
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <DateField source="updated_at" />
      <TextField source="cloudinary_id" />
      <TextField source="slug" />
      <EditButton />
      {/* <DeleteButton /> */}
    </Datagrid>
  </List>

export const TrainerEdit = props =>
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="cloudinary_id" />
      <TextInput source="slug" />
      <LongTextInput source="description" />
    </SimpleForm>
  </Edit>

export const TrainerCreate = props =>
  <Create {...props}>
    <SimpleForm>
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="cloudinary_id" />
      <TextInput source="slug" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
