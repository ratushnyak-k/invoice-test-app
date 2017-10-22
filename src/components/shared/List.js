import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import { string } from 'prop-types'

import Table from '../shared/Table'
import AddButton from '../shared/buttons/AddButton'
import { tablesConfig } from '../../utils/Constants'

@inject('mainStore')
@observer
class List extends React.Component {
  componentDidMount() {
    const {mainStore, entity, param} = this.props
    mainStore.fetchList(entity, param)
  }

  render() {
    const {
      onAdd,
      actionButton,
      mainStore,
      entity,
      onTableAction,
      title,
      selectData,
      textFieldData,
      relatedKey,
    } = this.props

    return (
      <div>
        <div className="action-wrap">
          <div>
            <h2>{title}</h2>
          </div>
          {
            onAdd &&
            <AddButton
              className="add-button"
              title={entity}
              onAdd={onAdd}
            />
          }
        </div>
        <Table
          onTableAction={onTableAction}
          rowsData={tablesConfig[entity]}
          tableData={mainStore.data[entity]}
          ActionButton={actionButton}
          selectData={selectData}
          textFieldData={textFieldData}
          relatedKey={relatedKey}
        />
      </div>
    )
  }
}

List.propTypes = {
  // optionalString: React.PropTypes.string,
}

List.defaultProps = {}

export default List
