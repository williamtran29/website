/* eslint-disable react/no-danger */
import React from 'react'

const JsonLd = ({ children }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(children) }}
  />
)

export default JsonLd
