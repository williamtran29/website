import React from 'react'
import { shallowWithTheme } from 'test/testUtils'
import components from './'

describe('Input ', () => {
  it('should render an input', () => {
    expect(shallowWithTheme(<components.Input />)).toMatchSnapshotWithGlamor()
  })
})
