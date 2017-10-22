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

@inject('productStore')
@inject('modalStore')
@observer
class CreateProductForm extends React.Component {
  constructor() {
    super()
    this.form = new FieldsGroup({
      name: new Field({
        name: 'name',
        value: '',
        validators: [errors.required()],
      }),
      price: new Field({
        name: 'price',
        value: '',
        validators: [errors.required(), errors.min(0)],
      }),
    })
  }

  submit = (e) => {
    e.preventDefault()
    this.props.productStore.addProduct(this.form.data)
    this.props.modalStore.toggleModal('isOpenProduct', false)
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <Input
          fieldData={this.form.fields.name}
          label="Product name"
        />
        <Input
          fieldData={this.form.fields.price}
          label="Price"
          type="number"
        />
        <RaisedButton
          type="submit"
          label="Create"
          fullWidth
          primary
          disabled={!this.form.isValid}
        />
      </form>
    )
  }
}

CreateProductForm.propTypes = {
  // optionalString: React.PropTypes.string,
}

CreateProductForm.defaultProps = {}

export default CreateProductForm
