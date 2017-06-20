import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MainTitle from './MainTitle'

describe('MainTitle', () => {
  it('should render a h1', () => {
    const wrapper = shallow(<MainTitle>Hello</MainTitle>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
