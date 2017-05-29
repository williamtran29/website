import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Button from './Button'

describe('Button', () => {
  it('should render a button', () => {
    const wrapper = shallow(<Button>Hello</Button>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
