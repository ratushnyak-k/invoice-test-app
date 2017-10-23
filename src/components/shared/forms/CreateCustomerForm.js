import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import FieldsGroup from '../../../models/form/FieldsGroup'
import Field from '../../../models/form/Field'
import Input from '../formComponents/Input'
import { RaisedButton } from 'material-ui'
import { validationErrors as errors } from '../../../utils/helpers'

@inject('customerStore')
@inject('modalStore')
@observer
class CreateCustomerForm extends React.Component {
  constructor(props) {
    super(props)
    const {data} = this.props
    this.form = new FieldsGroup({
      name: new Field({
        name: 'name',
        value: data.name,
        validators: [errors.required()],
      }),
      address: new Field({
        name: 'address',
        value: data.address,
        validators: [errors.required()],
      }),
      phone: new Field({
        name: 'phone',
        value: data.phone,
        validators: [errors.required()],
      }),
    })
  }

  submit = (e) => {
    e.preventDefault()
    if (this.props.data.id) {
      this.props.customerStore.updateCustomer(this.props.data.id, this.form.data)
    } else {
      this.props.customerStore.addCustomer(this.form.data)
    }
    this.props.modalStore.toggleModal('isOpenCustomer', false)

  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <Input
          fieldData={this.form.fields.name}
          label="Customer's name"
        />
        <Input
          fieldData={this.form.fields.address}
          label="Address"
        />
        <Input
          fieldData={this.form.fields.phone}
          label="Phone"
        />
        <RaisedButton
          type="submit"
          className="submit"
          label={this.props.data.id ? 'Update' : 'Create'}
          fullWidth
          primary
          disabled={!this.form.isValid}
        />
      </form>
    )
  }
}

export default CreateCustomerForm
