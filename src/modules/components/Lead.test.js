import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Lead from './Lead'

describe('Lead', () => {
  it('should render a p', () => {
    const wrapper = shallow(<Lead>Hello</Lead>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
