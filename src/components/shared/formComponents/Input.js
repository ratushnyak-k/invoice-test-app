import React from 'react'
import TextField from 'material-ui/TextField'
import { observer } from 'mobx-react'

@observer
class Input extends React.Component {

  onChange = (e, value) => {
    e.preventDefault()
    this.props.fieldData.update(value)
  }

  render() {
    const {fieldData, label, className, type} = this.props
    const {serverErrors, clientErrors, isTouched, value} = fieldData
    const errors = serverErrors.length ? serverErrors : clientErrors

    return (
      <div className={className}>
        <TextField
          style={{width: '100%'}}
          type={type || 'text'}
          errorText={isTouched && errors[0]} // zero index means that is first priority error
          floatingLabelText={label}
          onChange={this.onChange}
          value={value}
        />
      </div>
    )
  }
}

export default Input