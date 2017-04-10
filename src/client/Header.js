import React from 'react'
import Anchor from 'grommet/components/Anchor'
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Menu from 'grommet/components/Menu'
import TechnologyIcon from 'grommet/components/icons/base/Technology'
import { Link } from 'react-router-dom'

export default () => (
  <Header justify="center" colorIndex="neutral-4">
    <Box
      size={{ width: { max: 'xxlarge' } }}
      direction="row"
      responsive={false}
      justify="start"
      align="center"
      pad={{ horizontal: 'medium' }}
      flex="grow"
    >
      <TechnologyIcon colorIndex="brand" size="large" />
      <Box pad="small" />
      <Menu label="Label" inline direction="row" flex="grow">
        <Anchor to="/" tag={Link}>Formations</Anchor>
        <Anchor to="/about" tag={Link}>Nous contacter</Anchor>
      </Menu>
    </Box>
  </Header>
)
