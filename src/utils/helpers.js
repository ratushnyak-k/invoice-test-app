import { validationErrorMessages as msg } from './Constants'

export const validationErrors = {
  required: () => {
    return function (value) {
      return !(value.toString().trim()) ? msg.required : null
    }
  },

  min: (minValue) => {
    return function (value) {
      return value < minValue ? msg.min : null
    }
  },
}
