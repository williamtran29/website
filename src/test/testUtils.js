/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { shallow } from 'enzyme'
import { ThemeProvider } from 'glamorous'
import theme from 'client/theme'

process.env.NODE_ENV = 'test'

export const shallowWithTheme = (children, options) => {
  const wrapper = shallow(<ThemeProvider theme={theme}>{children}</ThemeProvider>, options)
  const instance = wrapper.root.instance()
  return wrapper.shallow({ context: instance.getChildContext() })
}
