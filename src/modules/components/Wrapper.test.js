import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Wrapper from './Wrapper'

describe('Wrapper', () => {
  it('should render by default', () => {
    const wrapper = shallow(<Wrapper>Hello</Wrapper>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should support "flexDirection"', () => {
    const wrapper = shallow(<Wrapper flexDirection="column">Hello</Wrapper>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should support "lgFlexDirection"', () => {
    const wrapper = shallow(<Wrapper lgFlexDirection="column">Hello</Wrapper>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
