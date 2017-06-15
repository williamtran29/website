import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import H2 from './H2'

describe('H2', () => {
  it('should render a h2', () => {
    const wrapper = shallow(<H2>Hello</H2>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
