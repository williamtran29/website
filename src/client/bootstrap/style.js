import 'glamor/reset'
import { css } from 'glamor'
import theme from 'client/theme'

css.global('html, body', {
  fontFamily: theme.fontFamilies.primary,
})

css.global('*', {
  boxSizing: 'border-box',
})
