import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SecondaryTitle from './SecondaryTitle'

describe('SecondaryTitle', () => {
  it('should render a h2', () => {
    const wrapper = shallow(<SecondaryTitle>Hello</SecondaryTitle>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
