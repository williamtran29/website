import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Alert from './Alert'

describe('Alert', () => {
  it('should render a div', () => {
    const wrapper = shallow(<Alert>Hello</Alert>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should render with ui: success', () => {
    const wrapper = shallow(<Alert ui="success">Hello</Alert>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
