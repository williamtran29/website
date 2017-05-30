/* eslint-disable import/no-extraneous-dependencies */
import 'style/bootstrap'
import React from 'react'
import { storiesOf, action } from '@storybook/react'
import * as components from 'modules/components'

storiesOf('Button', module).add('with text', () => (
  <components.Button onClick={action('clicked')}>Hello Button</components.Button>
))

storiesOf('Input', module).add('basic', () => <components.Input />)
storiesOf('Textarea', module).add('basic', () => <components.Textarea rows={10} cols={50} />)
storiesOf('Alert', module)
  .add('danger', () => <components.Alert ui="danger">Something is wrong!</components.Alert>)
  .add('success', () => <components.Alert ui="success">Something is good!</components.Alert>)
