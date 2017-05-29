import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Input from './Input'

describe('Input ', () => {
  it('should render an input', () => {
    const wrapper = shallow(<Input />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should support error', () => {
    const wrapper = shallow(<Input error />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
