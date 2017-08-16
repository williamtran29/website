import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  EditButton,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  required,
  LongTextInput,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
} from 'admin-on-rest'

export const TrainingsList = props =>
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField label="Path" source="path_id" reference="paths">
        <TextField source="title" />
      </ReferenceField>
      <TextField source="title" />
      <TextField source="abstract" />
      <NumberField source="rank" />
      <TextField source="icon" />
      <TextField source="slug" />
      <EditButton />
    </Datagrid>
  </List>

const style = {
  floatLeftInput: { float: 'left', marginRight: '50px' },
  floatRightInput: { float: 'right', width: '100px' },
}

export const TrainingEdit = props =>
  <Edit {...props}>
    <SimpleForm>
      <DateField
        label="Update date"
        source="updated_at"
        style={style.floatRightInput}
      />
      <TextInput source="title" validate={required} />

      <ReferenceInput
        label="Path"
        source="path_id"
        reference="paths"
        allowEmpty
      >
        <SelectInput optionText="title" />
      </ReferenceInput>

      <NumberInput source="rank" />
      <LongTextInput source="abstract" validate={required} />
      <LongTextInput source="description" />
      <LongTextInput source="objectives" validate={required} />
      <LongTextInput source="prerequisites" validate={required} />
      <TextInput source="icon" />
      <TextInput source="slug" />
      <TextInput source="social_icon" validate={required} />
      <TextInput source="social_title" validate={required} />
      <LongTextInput source="social_abstract" validate={required} />
    </SimpleForm>
  </Edit>

export const TrainingCreate = props =>
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" validate={required} />
      <ReferenceInput
        label="Path"
        source="path_id"
        reference="paths"
        allowEmpty
      >
        <SelectInput optionText="title" />
      </ReferenceInput>
      <NumberInput source="rank" />
      <LongTextInput source="abstract" validate={required} />
      <LongTextInput source="description" />
      <LongTextInput source="objectives" validate={required} />
      <LongTextInput source="prerequisites" validate={required} />
      <TextInput source="icon" />
      <TextInput source="slug" />
      <TextInput source="social_icon" validate={required} />
      <TextInput source="social_title" validate={required} />
      <LongTextInput source="social_abstract" validate={required} />
    </SimpleForm>
  </Create>
