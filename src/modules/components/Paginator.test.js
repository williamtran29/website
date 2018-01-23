import React from 'react'
import { shallow } from 'enzyme'
import Paginator from './Paginator'

describe('Paginator', () => {
  it('should render pages', () => {
    const wrapper = shallow(
      <Paginator
        itemPerPage={4}
        currentPage={2}
        itemCount={50}
        route={index => `/foo/${index}`}
      />,
    )
    const pageIds = wrapper.find('Paginator__PageId')
    const pageLinks = wrapper.find('Paginator__PageLink')
    expect(
      pageIds
        .at(1)
        .children()
        .name(),
    ).toBe('Paginator__CurrentPageIndex')
    expect(
      pageIds
        .find('Paginator__CurrentPageIndex')
        .children()
        .text(),
    ).toBe('2')
    expect(pageLinks.at(5).prop('to')).toEqual('/foo/7')
    expect(pageIds).toHaveLength(Math.ceil(50 / 4))
    expect(pageLinks).toHaveLength(Math.ceil(50 / 4) - 1)
  })
})
