import styled from 'styled-components/native'
import {backgroundColor} from './constants'

export const Container = styled.View`
  flex: 1;
  padding-horizontal: 15px;
  background-color: ${backgroundColor}
`

export const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding-horizontal: 15px;
  background-color: ${backgroundColor}
`

export * from './types'
export * from './constants'
export * from './form'
export * from './button'
