import React from 'react'
import glamorous from 'glamorous'
import Header from 'client/Header'
import components from 'modules/components'

const Form = glamorous.form({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  width: '100%',
  maxWidth: 800,
  margin: '0 auto',
})

const FormRow = glamorous.div({
  display: 'flex',
  flex: '1 0 auto',
  flexDirection: 'column',
  margin: '10px',
  '& label': {
    marginBottom: '5px',
  },
})

export default () => (
  <div>
    <Header />
    <Form>
      <glamorous.Div display="flex" flex="1">
        <FormRow>
          <label htmlFor="name">
            Nom
          </label>
          <components.Input type="text" name="name" id="name" />
        </FormRow>
        <FormRow>
          <label htmlFor="company">
            Société
          </label>
          <components.Input type="text" name="company" id="company" />
        </FormRow>
      </glamorous.Div>
      <glamorous.Div display="flex" flex="1">
        <FormRow>
          <label htmlFor="email">
            Email
          </label>
          <components.Input type="text" name="email" id="email" />
        </FormRow>
        <FormRow>
          <label htmlFor="phone">
            Téléphone
          </label>
          <components.Input type="text" name="phone" id="phone" />
        </FormRow>
      </glamorous.Div>
      <FormRow>
        <label htmlFor="message">
          Message
        </label>
        <components.Textarea name="message" id="message" rows={5} />
      </FormRow>
      <components.Button margin={10}>Envoyer</components.Button>
    </Form>
  </div>
)
