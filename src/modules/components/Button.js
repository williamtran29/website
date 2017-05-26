import React from 'react'
import { darken } from 'polished'
import glamorous from 'glamorous'

const Button = glamorous(({ component: Component = 'div', ...props }) => <Component {...props} />)(
  {
    borderRadius: 3,
    display: 'inline-block',
    height: 38,
    padding: '0 30px',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: '38px',
    letterSpacing: '.1rem',
    whiteSpace: 'nowrap',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 200ms',
    textDecoration: 'none',
  },
  (props, theme) => ({
    backgroundColor: theme.colors.primary,
    ':hover': {
      backgroundColor: darken(0.2, theme.colors.primary),
    },
  }),
)

export default Button
