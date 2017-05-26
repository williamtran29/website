import React from 'react'
import { darken } from 'polished'
import glamorous from 'glamorous'

const Button = glamorous(
  ({ component: Component = 'button', ...props }) => <Component {...props} />,
  {
    forwardProps: ['component', 'to'],
    rootEl: 'button',
  },
)(
  {
    borderRadius: 3,
    display: 'inline-block',
    height: 38,
    padding: '0 30px',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: '38px',
    whiteSpace: 'nowrap',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 200ms',
    textDecoration: 'none',
    border: 0,
  },
  (props, theme) => ({
    backgroundColor: theme.colors.primary,
    ':hover': {
      backgroundColor: darken(0.2, theme.colors.primary),
      outline: 'none',
    },
    ':focus': {
      backgroundColor: darken(0.2, theme.colors.primary),
      outline: 'none',
    },
    ...props,
  }),
)

export default Button
