import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Textarea from './Textarea'

describe('Textarea ', () => {
  it('should render a textarea', () => {
    const wrapper = shallow(<Textarea />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
