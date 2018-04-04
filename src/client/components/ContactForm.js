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
