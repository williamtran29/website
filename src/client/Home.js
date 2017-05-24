import React from 'react'
import glamorous from 'glamorous'
import Header from 'client/Header'

const Cover = glamorous.div({
  backgroundImage: "url('/images/home-cover.png')",
  backgroundSize: 'cover',
  height: 700,
})

export default () => (
  <div>
    <Header transparent />
    <Cover />
  </div>
)
