import React from 'react'
import { shallowWithTheme } from 'test/testUtils'
import Input from './Input'

describe('Input ', () => {
  it('should render an input', () => {
    expect(shallowWithTheme(<Input />)).toMatchSnapshotWithGlamor()
  })
})
