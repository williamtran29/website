import React from 'react'
import { shallowWithTheme } from 'test/testUtils'
import components from './'

describe('Button', () => {
  it('should render a button', () => {
    expect(
      shallowWithTheme(<components.Button>Hello</components.Button>).shallow(),
    ).toMatchSnapshotWithGlamor()
  })

  it('should render a specific component', () => {
    expect(
      shallowWithTheme(<components.Button component="a">Hello</components.Button>).shallow(),
    ).toMatchSnapshotWithGlamor()
  })
})
