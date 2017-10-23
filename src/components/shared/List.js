import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'

import Table from './Table'
import AddButton from './buttons/AddButton'
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
      counterData,
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
          counterData={counterData}
          relatedKey={relatedKey}
        />
      </div>
    )
  }
}

export default List
