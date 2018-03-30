import React from 'react'
import { FORM_ERROR } from 'final-form'
import { Form, Field } from 'react-final-form'
import { validate as validateEmail } from 'email-validator'
import {
  Alert,
  FormGroup,
  Input,
  Textarea,
  Row,
  Col,
  ControlFeedback,
} from 'smooth-ui'
import Label from './Label'
import Button from './Button'
import RequiredMark from './RequiredMark'

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)
const required = value => (value ? undefined : 'Ce champs est requis')
const mustBeEmail = value =>
  validateEmail(value) ? undefined : 'Email invalide'

const InputGroup = ({
  input,
  meta,
  requiredMark,
  label,
  controlComponent: ControlComponent = Input,
  ...props
}) => (
  <FormGroup>
    <Label htmlFor={input.name}>
      {label} {requiredMark && <RequiredMark />}
    </Label>
    <ControlComponent
      {...input}
      control
      id={input.name}
      valid={meta.touched ? meta.valid : undefined}
      {...props}
    />
    {meta.error &&
      meta.touched && (
        <ControlFeedback valid={false}>{meta.error}</ControlFeedback>
      )}
  </FormGroup>
)

class ContactForm extends React.Component {
  static defaultProps = {
    submitLabel: 'Envoyer',
  }

  handleSubmit = async values => {
    const result = await fetch('/api/contact', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(values),
    })

    if (result.status !== 200) {
      return { [FORM_ERROR]: 'Une erreur est survenue, veuillez réeessayer.' }
    }

    return undefined
  }

  render() {
    const { submitLabel } = this.props

    return (
      <Form onSubmit={this.handleSubmit}>
        {({ handleSubmit, submitting, submitError, submitSucceeded }) => (
          <form noValidate onSubmit={handleSubmit}>
            {submitError && <Alert variant="danger">{submitError}</Alert>}
            {submitSucceeded && (
              <Alert variant="success">
                Merci, nous vous répondrons dans les plus brefs délais !
              </Alert>
            )}
            {!submitSucceeded && (
              <React.Fragment>
                <Row>
                  <Col sm={12} md={6}>
                    <Field
                      name="name"
                      autoComplete="name"
                      label="Nom complet"
                      validate={required}
                      requiredMark
                      component={InputGroup}
                    />
                  </Col>
                  <Col sm={12} md={6}>
                    <Field
                      name="company"
                      autoComplete="organization"
                      label="Entreprise"
                      component={InputGroup}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={6}>
                    <Field
                      name="email"
                      autoComplete="email"
                      type="email"
                      label="Email"
                      validate={composeValidators(required, mustBeEmail)}
                      requiredMark
                      component={InputGroup}
                    />
                  </Col>
                  <Col sm={12} md={6}>
                    <Field
                      name="phone"
                      autoComplete="tel"
                      type="tel"
                      label="Téléphone"
                      component={InputGroup}
                    />
                  </Col>
                </Row>
                <FormGroup>
                  <Field
                    name="message"
                    label="Message"
                    rows={5}
                    controlComponent={Textarea}
                    component={InputGroup}
                  />
                </FormGroup>
                <Button
                  type="submit"
                  style={{ marginTop: 20 }}
                  disabled={submitting}
                >
                  {submitLabel}
                </Button>
              </React.Fragment>
            )}
          </form>
        )}
      </Form>
    )
  }
}

export default ContactForm
// import React from 'react'
// import styled from 'styled-components'
// import recompact from 'recompact'
// import theme from 'client/style/legacyTheme'
// import { required } from 'modules/validators'
// import Alert from 'client/components/Alert'
// import Button from 'client/components/Button'
// import Input from 'client/components/Input'
// import Textarea from 'client/components/Textarea'
//
// const StyledForm = styled(Form)`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   margin: '0 auto';
// `
//
// const FormGroup = styled.div`
//   display: flex;
//   flex: 1 0 auto;
//   flex-direction: column;
//   margin: 10px;
// `
//
// const Label = styled.label`
//   margin-bottom: 5px;
//   font-size: 12px;
//   text-transform: uppercase;
//   letter-spacing: 0.1em;
//   font-weight: 600;
// `
//
// const FormRow = styled.div`
//   display: flex;
//   flex: 1;
//   flex-direction: column;
//   margin: 0 -10px;
//
//   @media (min-width: ${theme.medias.phablet}) {
//     flex-direction: row;
//   }
// `
//
// const StyledErrors = styled(Errors)`
//   color: ${theme.colors.danger};
//   font-size: 14px;
//   margin: 10px 0;
// `
//
// const RequiredMark = () => <span style={{ color: theme.colors.danger }}>*</span>
//
// const AlertMessage = connect(state => ({
//   status: state.forms.forms.contact.$form.pending
//     ? 'PENDING'
//     : state.forms.forms.contact.$form.errors === true
//       ? 'ERROR'
//       : state.forms.forms.contact.$form.validity === true ? 'SUCCESS' : null,
// }))(({ status }) => {
//   switch (status) {
//     case 'ERROR':
//       return <Alert ui="danger">Erreur, veuillez rééessayer.</Alert>
//     case 'SUCCESS':
//       return (
//         <Alert ui="success">
//           Merci, nous vous répondrons dans les plus brefs délais !
//         </Alert>
//       )
//     default:
//       return null
//   }
// })
//
// const mapProps = {
//   error: props => props.fieldValue.touched && !props.fieldValue.valid,
// }
//
// const errorMessages = {
//   required: 'Ce champs est requis',
//   typeMismatch: 'Email invalide',
// }
//
// const ContactForm = ({
//   className,
//   onSubmit,
//   initialMessage = '',
//   messageRequired = false,
//   messageLabel = 'Commentaire',
//   submitLabel = 'Envoyer',
//   success,
//   pending,
// }) => (
//   <StyledForm className={className} onSubmit={onSubmit} model="forms.contact">
//     <AlertMessage />
//     {!success && (
//       <div>
//         <FormRow>
//           <FormGroup>
//             <Label htmlFor="name">
//               Nom complet <RequiredMark />
//             </Label>
//             <Control.input
//               component={Input}
//               autoComplete="name"
//               model=".name"
//               id="name"
//               validators={{ required }}
//               mapProps={mapProps}
//             />
//             <StyledErrors
//               show="touched"
//               model=".name"
//               messages={errorMessages}
//             />
//           </FormGroup>
//           <FormGroup>
//             <Label htmlFor="company">Société</Label>
//             <Control.input
//               component={Input}
//               autoComplete="organization"
//               model=".company"
//               id="company"
//               mapProps={mapProps}
//             />
//             <StyledErrors
//               show="touched"
//               model=".company"
//               messages={errorMessages}
//             />
//           </FormGroup>
//         </FormRow>
//         <FormRow>
//           <FormGroup>
//             <Label htmlFor="email">
//               Email <RequiredMark />
//             </Label>
//             <Control.input
//               type="email"
//               autoComplete="email"
//               component={Input}
//               model=".email"
//               id="email"
//               mapProps={mapProps}
//               validators={{ required }}
//             />
//             <StyledErrors
//               show="touched"
//               model=".email"
//               messages={errorMessages}
//             />
//           </FormGroup>
//           <FormGroup>
//             <Label htmlFor="phone">Téléphone</Label>
//             <Control.input
//               component={Input}
//               autoComplete="tel"
//               model=".phone"
//               id="phone"
//               mapProps={mapProps}
//             />
//             <StyledErrors
//               show="touched"
//               model=".phone"
//               messages={errorMessages}
//             />
//           </FormGroup>
//         </FormRow>
//         <FormRow>
//           <FormGroup>
//             <Label htmlFor="message">{messageLabel}</Label>
//             <Control.textarea
//               component={Textarea}
//               model=".message"
//               id="message"
//               rows={5}
//               mapProps={mapProps}
//               validators={messageRequired ? { required } : undefined}
//               defaultValue={initialMessage}
//             />
//             <StyledErrors
//               show="touched"
//               model=".message"
//               messages={errorMessages}
//             />
//           </FormGroup>
//         </FormRow>
//         <Button type="submit" style={{ marginTop: 20 }} disabled={pending}>
//           {submitLabel}
//         </Button>
//       </div>
//     )}
//   </StyledForm>
// )
//
// const fetchContact = async values => {
//   const result = await fetch('/api/contact', {
//     method: 'post',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify(values),
//   })
//
//   if (result.status !== 200) {
//     throw new Error('Error while fetching contact')
//   }
//
//   return true
// }
//
// export default recompact.compose(
//   connect(
//     state => ({
//       pending: state.forms.forms.contact.$form.pending,
//       success: state.forms.forms.contact.$form.validity === true,
//     }),
//     (dispatch, props) => ({
//       onResetForm() {
//         dispatch(actions.reset('forms.contact'))
//       },
//       onSubmit(values) {
//         dispatch(
//           actions.submit(
//             'forms.contact',
//             fetchContact({
//               ...values,
//               subject: props.subject,
//             }),
//           ),
//         )
//       },
//     }),
//   ),
//   recompact.lifecycle({
//     componentWillMount() {
//       this.props.onResetForm()
//     },
//   }),
// )(ContactForm)
