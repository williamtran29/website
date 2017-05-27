import React from 'react'
import glamorous from 'glamorous'
import Header from 'client/Header'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { provideStore } from 'client/contactStore'
import { Control, Form, Errors, actions } from 'react-redux-form'
import { required } from 'modules/validators'
import * as components from 'modules/components'

const StyledForm = glamorous(Form)({
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

const StyledErrors = glamorous(Errors)({}, (props, theme) => ({
  color: theme.colors.error,
  fontSize: 14,
  margin: '10px 0',
}))

const mapProps = {
  error: props => props.fieldValue.touched && !props.fieldValue.valid,
}

const errorMessages = {
  required: 'Ce champs est requis',
  typeMismatch: 'Email invalide',
}

const ContactForm = ({ onSubmit }) => (
  <div>
    <Header />
    <StyledForm onSubmit={onSubmit} model="contact">
      <glamorous.Div display="flex" flex="1">
        <FormRow>
          <label htmlFor="name">
            Nom
          </label>
          <Control
            component={components.Input}
            model=".name"
            id="name"
            validators={{ required }}
            mapProps={mapProps}
          />
          <StyledErrors show="touched" model=".name" messages={errorMessages} />
        </FormRow>
        <FormRow>
          <label htmlFor="company">
            Société
          </label>
          <Control component={components.Input} model=".company" id="company" mapProps={mapProps} />
          <StyledErrors show="touched" model=".company" messages={errorMessages} />
        </FormRow>
      </glamorous.Div>
      <glamorous.Div display="flex" flex="1">
        <FormRow>
          <label htmlFor="email">
            Email
          </label>
          <Control
            type="email"
            component={components.Input}
            model=".email"
            id="email"
            mapProps={mapProps}
            validators={{ required }}
          />
          <StyledErrors show="touched" model=".email" messages={errorMessages} />
        </FormRow>
        <FormRow>
          <label htmlFor="phone">
            Téléphone
          </label>
          <Control component={components.Input} model=".phone" id="phone" mapProps={mapProps} />
          <StyledErrors show="touched" model=".phone" messages={errorMessages} />
        </FormRow>
      </glamorous.Div>
      <FormRow>
        <label htmlFor="message">
          Message
        </label>
        <Control
          component={components.Textarea}
          model=".message"
          id="message"
          rows={5}
          mapProps={mapProps}
          validators={{ required }}
        />
        <StyledErrors show="touched" model=".message" messages={errorMessages} />
      </FormRow>
      <components.Button margin={10} type="submit">Envoyer</components.Button>
    </StyledForm>
  </div>
)

export default compose(
  provideStore,
  connect(null, dispatch => ({
    onSubmit() {
      dispatch(actions.submit('contact', Promise.resolve({})))
    },
  })),
)(ContactForm)
