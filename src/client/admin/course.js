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
  LongTextInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  required,
  RichTextField,
  TextInput,
} from 'admin-on-rest'

export const CoursesList = props =>
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField label="Path" source="path_id" reference="paths">
        <TextField source="title" />
      </ReferenceField>
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>

const style = {
  floatLeftInput: { float: 'left', marginRight: '50px' },
  floatRightInput: { float: 'right', width: '100px' },
}

export const CourseEdit = props =>
  <Edit {...props}>
    <SimpleForm>
      <DateField
        label="Update date"
        source="updated_at"
        style={style.floatRightInput}
      />

      <TextInput source="title" validate={required} />
      <ReferenceInput label="Path" source="path_id" reference="paths">
        <SelectInput optionText="title" />
      </ReferenceInput>
      <LongTextInput source="outline" validate={required} />
    </SimpleForm>
  </Edit>

export const CourseCreate = props =>
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" validate={required} />
      <ReferenceInput
        label="Path"
        source="path_id"
        reference="paths"
        defaultValue="1"
      >
        <SelectInput optionText="title" />
      </ReferenceInput>
      <LongTextInput source="outline" validate={required} />
    </SimpleForm>
  </Create>
