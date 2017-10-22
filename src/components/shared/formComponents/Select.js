import React from 'react'
import {
  observer,
} from 'mobx-react'
import {
  Divider,
  DropDownMenu,
  MenuItem,
} from 'material-ui'


@observer
class Select extends React.Component {
  onChange(e, key, value) {

    if (value === 'button') {
      this.props.action()
    } else {
      this.props.onChange(value)
    }
  }

  render() {
    const {
      dropDownItems,
      value,
      actionTitle,
      action,
      defaultOptionName,
      defaultOptionValue,
    } = this.props
    return (
      <DropDownMenu
        value={value}
        onChange={::this.onChange}
      >
        <MenuItem
          value={defaultOptionValue || null}
          primaryText={defaultOptionName}
        />
        {
          dropDownItems.map((item) => {
            return (
              <MenuItem
                key={`${item.id}-dropdown-item`}
                value={item.id}
                primaryText={item.name}
              />
            )
          })
        }
        {action &&
        [
          <Divider key={`divider-${actionTitle}`} />,
          <MenuItem
            key={`action-button-${actionTitle}`}
            value="button"
            primaryText={actionTitle}
          />,
        ]
        }
      </DropDownMenu>
    )
  }
}

Select.propTypes = {
  // optionalString: React.PropTypes.string,
}

Select.defaultProps = {}

export default Select
