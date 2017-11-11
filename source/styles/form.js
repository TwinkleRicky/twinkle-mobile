import styled, {css} from 'styled-components/native'
import {gray, h1FontSize, h2FontSize, h3FontSize, h4FontSize} from './constants'

export const TextInput = styled.TextInput`
  padding-vertical: 5px;
  ${({h1}) => h1 && css`
    font-size: ${h1FontSize};
  `}
  ${({h2}) => h2 && css`
    font-size: ${h2FontSize};
  `}
  ${({h3}) => h3 && css`
    font-size: ${h3FontSize};
  `}
  ${({h4}) => h4 && css`
    font-size: ${h4FontSize};
  `}
`

export const FormControl = styled.View`
  margin-bottom: 24px;
`

export const Separator = styled.View`
  height: 1px;
  border-top-width: 1px;
  border-top-color: ${gray};

  margin-top: 16px;
  margin-bottom: 16px;
`
