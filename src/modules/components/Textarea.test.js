import React from 'react'
import { shallowWithTheme } from 'test/testUtils'
import Textarea from './Textarea'

describe('Textarea ', () => {
  it('should render a textarea', () => {
    expect(shallowWithTheme(<Textarea />)).toMatchSnapshotWithGlamor()
  })
})
