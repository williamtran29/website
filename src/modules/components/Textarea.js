import glamorous from 'glamorous'

const Textarea = glamorous.textarea(
  {
    borderRadius: 3,
    display: 'inline-block',
    padding: '5px 10px',
    fontSize: 15,
    lineHeight: 1.4,
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

export default Textarea