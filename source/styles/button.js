import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components/native'
import {TouchableOpacity} from 'react-native'
import {blue, green, orange} from './constants'

const ButtonWrapper = styled.View`
  padding-vertical: 20px;
  flex-direction: column;
  align-items: center;
  border-radius: 100px;
  ${({warning, info, success}) => {
    let color = ''
    if (info) {
      color = css`
        background-color: ${blue};
      `
    }
    if (success) {
      color = css`
        background-color: ${green};
      `
    }
    if (warning) {
      color = css`
        background-color: ${orange};
      `
    }
    return color
  }}
`

const ButtonText = styled.Text`
  color: #fff;
`

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

export function Button({title, onPress, ...rest}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ButtonWrapper {...rest}>
        <ButtonText>{title}</ButtonText>
      </ButtonWrapper>
    </TouchableOpacity>
  )
}
