import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'

const LocationAddressComponent = ({ location, ...props }) => (
  <address {...props}>
    {location.name}
    <br />
    {location.address}
    <br />
    {location.zipcode} {location.city}
  </address>
)

const LocationAddress = styled(LocationAddressComponent)`
  font-style: normal;
`

export const locationAddressFragment = gql`
  fragment LocationAddress on Location {
    name
    address
    zipcode
    city
  }
`

export default LocationAddress
