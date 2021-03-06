import React from 'react'
import {
  observer,
} from 'mobx-react'
import {
  Dialog,
} from 'material-ui'

@observer
class ModalWrapper extends React.Component {
  render() {
    return (
      <Dialog
        title={this.props.title}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.onClose}
      >
        {this.props.children}
      </Dialog>
    )
  }
}

export default ModalWrapper
