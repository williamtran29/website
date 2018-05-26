import React from 'react'
import gql from 'fraql'
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

LocationAddress.fragments = {
  location: gql`
    fragment _ on Location {
      name
      address
      zipcode
      city
    }
  `,
}

export default LocationAddress
