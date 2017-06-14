import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import H1 from './H1'

describe('H1', () => {
  it('should render a h1', () => {
    const wrapper = shallow(<H1>Hello</H1>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
