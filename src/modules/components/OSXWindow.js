import React from 'react'
import { darken } from 'polished'
import styled from 'styled-components'

const Window = styled.div`
  background: #fff;
  border-top: 1px solid #eee;
  border-radius: 6px;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.4);
`

const TitleBar = styled.div`
  background: linear-gradient(180deg, #ebebeb, #ddd);
  width: 100%;
  height: 22px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  user-select: none;
  cursor: default;
`

const Buttons = styled.div`
  padding-left: 8px;
  padding-top: 5px;
  float: left;
  line-height: 0px;
`
const Button = styled.div`
  background: ${props => props.color};
  width: 10px;
  height: 10px;
  box-shadow: 0 0 0 1px ${props => darken(0.06, props.color)};
  border-radius: 50%;
  display: inline-block;
  margin: 0 5px;
`

const OSXWindow = ({ children, className }) =>
  <Window className={className}>
    <TitleBar>
      <Buttons>
        <Button color="#ff5c5c" />
        <Button color="#ffbd4c" />
        <Button color="#00ca56" />
      </Buttons>
    </TitleBar>
    {children}
  </Window>

export default OSXWindow
