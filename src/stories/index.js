/* eslint-disable import/no-extraneous-dependencies */
import 'client/bootstrap/style'
import React from 'react'
import { ThemeProvider } from 'glamorous'
import { storiesOf, action } from '@storybook/react'
import theme from 'client/theme'
import * as components from 'modules/components'

const themeDecorator = getStory => <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>

storiesOf('Button', module)
  .addDecorator(themeDecorator)
  .add('with text', () => (
    <components.Button onClick={action('clicked')}>Hello Button</components.Button>
  ))

storiesOf('Input', module).addDecorator(themeDecorator).add('basic', () => <components.Input />)
storiesOf('Textarea', module)
  .addDecorator(themeDecorator)
  .add('basic', () => <components.Textarea rows={10} cols={50} />)
