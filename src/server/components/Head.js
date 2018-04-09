import React from 'react'

const Head = ({ helmet }) => (
  <React.Fragment>
    {helmet.title.toComponent()}
    {helmet.meta.toComponent()}
    {helmet.link.toComponent()}
  </React.Fragment>
)

export default Head
