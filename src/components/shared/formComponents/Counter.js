import React from 'react'
import {
  observer,
} from 'mobx-react'
import { IconButton } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'


@observer
class Counter extends React.Component {
  onChange(action) {
    let {value, onChange} = this.props
    if (action === '+') {
      value = value + 1
    } else {
      if (value) {
        value = value - 1
      } else {
        return
      }
    }
    onChange(value)
  }

  render() {
    return (
      <div>
        <IconButton
          onClick={this.onChange.bind(this, '-')}
        >
          <ContentRemove color="#ff4081" />
        </IconButton>
        <span className="count">{this.props.value}</span>
        <IconButton
          onClick={this.onChange.bind(this, '+')}
        >
          <ContentAdd color="#ff4081" />
        </IconButton>
      </div>
    )
  }
}

export default Counter
