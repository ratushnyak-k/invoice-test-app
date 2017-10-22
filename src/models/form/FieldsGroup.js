import {
  observable,
  computed,
  action,
  runInAction,
} from 'mobx'

export default class FieldsGroup {
  name

  @observable fieldsName = []
  @observable.ref fields = {}

  @computed
  get isValid() {
    return this.fieldsName.every(fieldName => {
      return this.fields[fieldName].isValid
    })
  }

  @computed
  get isDirty() {
    return this.fieldsName.some(fieldName => {
      return !this.fields[fieldName].isDirty
    })
  }


  @computed
  get data() {
    const data = {}
    this.fieldsName.forEach(fieldName => {
      const field = this.fields[fieldName]
      const {name} = field
      if (!field.isErrorField) {
        data[name || fieldName] = field instanceof FieldsGroup ? field.data : field.value
      }
    })

    return data
  }

  constructor(fields = {}, name) {

    if (typeof fields !== 'object') {
      throw new Error('Property "fields" must be an object!', 'FieldsGroup.js', '40')
    }

    if (!Object.keys(fields).length) {
      throw new Error('Property "fields" must be filled', 'FieldsGroup.js', '44')
    }

    runInAction(`Initialize form:`, () => {
      this.name = name
      this.fieldsName = Object.keys(fields)
      this.fieldsName.forEach(fieldName => {
        this.fields[fieldName] = fields[fieldName]
      })
    })
  }

  @action(`Submit form`)
  submit = (callback) => {
    if (!callback || typeof callback !== 'function') {
      throw new Error(
        'Property "callback" is required and this property must be a function!',
        'FieldsGroup.js',
        '62',
      )
    }

    callback(this.data)
  }

  @action(`Reset form`)
  reset = () => {
    this.fieldsName.forEach(fieldName => {
      this.fields[fieldName].reset()
    })
  }
}