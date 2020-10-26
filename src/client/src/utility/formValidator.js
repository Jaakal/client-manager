export const tooLong = (string, length) => 
  string && string.length > length

export const isEmpty = string =>
  string.length === 0

export const notAllLetters = string =>
  !/^[a-zA-Z]+$/.test(string)

export const notANumber = value =>
  value.length === 0 || isNaN(value)

export const isNotUpper = string =>
  string.split('').filter(character =>
    !notANumber(character) || 
      character !== character.toUpperCase()).length !== 0
