import glamorous from 'glamorous'

const Input = glamorous.input(
  {
    borderRadius: 3,
    display: 'inline-block',
    height: 38,
    padding: '0 10px',
    fontSize: 15,
    lineHeight: '38px',
    transition: 'border-color 200ms',
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  (props, theme) => ({
    fontFamily: theme.fontFamilies.primary,
    borderColor: theme.colors.gray,
    color: theme.colors.grayDark,
    ':focus': {
      borderColor: theme.colors.primary,
      outline: 0,
    },
  }),
)

export default Input
