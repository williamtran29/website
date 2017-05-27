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
    borderColor: props.error ? theme.colors.error : theme.colors.gray,
    color: theme.colors.grayDark,
    ':focus': {
      borderColor: props.error ? theme.colors.error : theme.colors.grayDark,
      outline: 0,
    },
  }),
)

export default Input
