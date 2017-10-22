import {
  observable,
  computed,
  action,
  runInAction,
} from 'mobx'

export default class Field {
  name
  @observable initialValue
  @observable value
  @observable isTouched = false
  @observable.ref validators = []
  @observable serverErrors = []

  @computed
  get isDirty() {
    return this.initialValue !== this.value
  }

  @computed
  get clientErrors() {
    return this.validators
      .map(validator => {
        return validator(this.value)
      })
      .filter(message => message !== null)
  }

  @action.bound
  setServerErrors(errors) {
    this.serverErrors = errors
  }

  @computed
  get isValid() {
    return !this.clientErrors.length && !this.serverErrors.length
  }

  @computed
  get hasErrors() {
    return this.clientErrors.length && this.serverErrors.length
  }

  constructor({name, value = '', validators, isErrorField = false}) {

    if (!name) throw new Error('Property "name" is required!', 'Fields.js', '41')

    runInAction(`Initialize form field: '${name}'`, () => {
      this.name = name
      this.initialValue = !Array.isArray(value) ? value : ''
      this.value = this.initialValue

      this.isErrorField = isErrorField

      if (Array.isArray(value)) {
        this.validators = value
      } else {
        this.validators = Array.isArray(validators) ? validators : []
      }
    })
  }

  @action(`Update field value`)
  update = newValue => {
    this.isTouched = true
    this.value = newValue
    this.serverErrors = []
  }

  @action(`Reset field value`)
  reset = () => {
    this.isTouched = false
    this.value = this.initialValue
  }
}
