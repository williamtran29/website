import { Button as BaseButton } from 'smooth-ui'

const Button = BaseButton.extend`
  text-transform: uppercase;
  font-weight: 700;

  @media print {
    display: none;
  }
`

export default Button
