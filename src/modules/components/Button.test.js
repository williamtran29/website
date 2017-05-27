import React from 'react'
import { shallowWithTheme } from 'test/testUtils'
import Button from './Button'

describe('Button', () => {
  it('should render a button', () => {
    expect(shallowWithTheme(<Button>Hello</Button>).shallow()).toMatchSnapshotWithGlamor()
  })

  it('should render a specific component', () => {
    expect(
      shallowWithTheme(<Button component="a">Hello</Button>).shallow(),
    ).toMatchSnapshotWithGlamor()
  })
})
