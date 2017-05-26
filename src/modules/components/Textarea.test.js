import React from 'react'
import { shallowWithTheme } from 'test/testUtils'
import components from './'

describe('Textarea ', () => {
  it('should render a textarea', () => {
    expect(shallowWithTheme(<components.Textarea />)).toMatchSnapshotWithGlamor()
  })
})
