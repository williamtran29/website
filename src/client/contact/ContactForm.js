import React from 'react'
import styled from 'styled-components'
import recompact from 'recompact'
import theme from 'style/theme'
import { connect } from 'react-redux'
import { Control, Form, Errors, actions } from 'react-redux-form'
import { required } from 'modules/validators'
import Alert from 'modules/components/Alert'
import Button from 'modules/components/Button'
import Input from 'modules/components/Input'
import Textarea from 'modules/components/Textarea'

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: '0 auto';
`

const FormGroup = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  margin: 10px;
`

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
`

const FormRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0 -10px;

  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
  }
`

const StyledErrors = styled(Errors)`
  color: ${theme.colors.danger};
  font-size: 14px;
  margin: 10px 0;
`

const RequiredMark = () => <span style={{ color: theme.colors.danger }}>*</span>

const AlertMessage = connect(state => ({
  status: state.forms.forms.contact.$form.pending
    ? 'PENDING'
    : state.forms.forms.contact.$form.errors === true
      ? 'ERROR'
      : state.forms.forms.contact.$form.validity === true ? 'SUCCESS' : null,
}))(({ status }) => {
  switch (status) {
    case 'ERROR':
      return <Alert ui="danger">Erreur, veuillez rééessayer.</Alert>
    case 'SUCCESS':
      return (
        <Alert ui="success">
          Merci, nous vous répondrons dans les plus brefs délais !
        </Alert>
      )
    default:
      return null
  }
})

const mapProps = {
  error: props => props.fieldValue.touched && !props.fieldValue.valid,
}

const errorMessages = {
  required: 'Ce champs est requis',
  typeMismatch: 'Email invalide',
}

const ContactForm = ({
  className,
  onSubmit,
  initialMessage = '',
  messageRequired = false,
  messageLabel = 'Commentaire',
  submitLabel = 'Envoyer',
  success,
}) => (
  <StyledForm className={className} onSubmit={onSubmit} model="forms.contact">
    <AlertMessage />
    {!success && (
      <div>
        <FormRow>
          <FormGroup>
            <Label htmlFor="name">
              Nom complet <RequiredMark />
            </Label>
            <Control.input
              component={Input}
              autoComplete="name"
              model=".name"
              id="name"
              validators={{ required }}
              mapProps={mapProps}
            />
            <StyledErrors
              show="touched"
              model=".name"
              messages={errorMessages}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="company">Société</Label>
            <Control.input
              component={Input}
              autoComplete="organization"
              model=".company"
              id="company"
              mapProps={mapProps}
            />
            <StyledErrors
              show="touched"
              model=".company"
              messages={errorMessages}
            />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label htmlFor="email">
              Email <RequiredMark />
            </Label>
            <Control.input
              type="email"
              autoComplete="email"
              component={Input}
              model=".email"
              id="email"
              mapProps={mapProps}
              validators={{ required }}
            />
            <StyledErrors
              show="touched"
              model=".email"
              messages={errorMessages}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phone">Téléphone</Label>
            <Control.input
              component={Input}
              autoComplete="tel"
              model=".phone"
              id="phone"
              mapProps={mapProps}
            />
            <StyledErrors
              show="touched"
              model=".phone"
              messages={errorMessages}
            />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label htmlFor="message">{messageLabel}</Label>
            <Control.textarea
              component={Textarea}
              model=".message"
              id="message"
              rows={5}
              mapProps={mapProps}
              validators={messageRequired ? { required } : undefined}
              defaultValue={initialMessage}
            />
            <StyledErrors
              show="touched"
              model=".message"
              messages={errorMessages}
            />
          </FormGroup>
        </FormRow>
        <Button type="submit" style={{ marginTop: 20 }}>
          {submitLabel}
        </Button>
      </div>
    )}
  </StyledForm>
)

const fetchContact = async values => {
  const result = await fetch('/api/contact', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(values),
  })
  if (result.statusCode !== 200) {
    throw new Error('Error while fetching contact')
  }

  return true
}

export default recompact.compose(
  connect(
    state => ({
      success: state.forms.forms.contact.$form.validity === true,
    }),
    (dispatch, props) => ({
      onResetForm() {
        dispatch(actions.reset('forms.contact'))
      },
      onSubmit(values) {
        dispatch(
          actions.submit(
            'forms.contact',
            fetchContact({
              ...values,
              subject: props.subject,
            }),
          ),
        )
      },
    }),
  ),
  recompact.lifecycle({
    componentWillMount() {
      this.props.onResetForm()
    },
  }),
)(ContactForm)
