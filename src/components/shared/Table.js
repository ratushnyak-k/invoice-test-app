import React from 'react'
import {
  observer,
} from 'mobx-react'
import {
  TableHeader,
  TableHeaderColumn,
  TableRow,
  Table as MUITable,
  TableBody,
  TableRowColumn,
  TextField,
} from 'material-ui'
import EmptyList from './EmptyList'
import Select from './formComponents/Select'


@observer
class Table extends React.Component {
  onSelectChange(rowId, value) {
    this.props.selectData.onChange(rowId, value)
  }

  onTextFieldChange(rowId, e, value) {
    this.props.textFieldData.onChange(rowId, value)
  }

  onTextFieldBlur(rowId, e) {
    this.props.textFieldData.onBlur(rowId, +e.target.value)
  }

  renderTableContent(item, data, output) {
    const {
      ActionButton,
      onTableAction,
      selectData,
      textFieldData,
    } = this.props

    switch (item.type) {
      case 'action':
        return <ActionButton
          onAction={onTableAction.bind(this, data.id)}
        />
      case 'input':
        return <TextField
          type="number"
          step="1"
          name={`${data.id}-${data[textFieldData.idKey] || 0}-text-input`}
          onBlur={this.onTextFieldBlur.bind(this, data.id)}
          onChange={this.onTextFieldChange.bind(this, data.id)}
          value={data[textFieldData.idKey] || 0}
        />
      case 'select':
        return <Select
          defaultOptionName={selectData.defaultOptionName}
          dropDownItems={selectData.options}
          action={selectData.action}
          actionTitle={selectData.actionTitle}
          onChange={this.onSelectChange.bind(this, data.id)}
          value={data[selectData.idKey] || null}
        />
      default:
        return output
    }
  }


  render() {
    const {
      rowsData,
      tableData,
      relatedKey,
      selectData,
    } = this.props
    return (
      <MUITable
        fixedHeader={true}
        height={'300px'}
      >

        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            {
              rowsData.map((item) => {
                return (
                  <TableHeaderColumn
                    key={`${item.title}-header`}
                  >
                    {item.title}
                  </TableHeaderColumn>
                )
              })
            }
          </TableRow>
        </TableHeader>

        <TableBody
          stripedRows={true}
          displayRowCheckbox={false}
        >
          {
            tableData.length ? tableData.map((data) => {
                return (
                  <TableRow key={`${data.id}-row`}>
                    {
                      rowsData.map((item) => {
                        const dataItem = data[item.key]

                        let output
                        if (item.type === 'date') {
                          output = new Date(dataItem).toLocaleDateString()
                        } else if (item.type === 'price' && selectData.options.length) {
                          const filteredData = selectData.options.filter((item) => {
                            return data[relatedKey] === item.id
                          })[0]
                          if (filteredData) {
                            output = filteredData.price
                          }
                        } else {
                          output = dataItem
                        }

                        return (
                          <TableRowColumn
                            key={`${data.id}-${dataItem}-data`}
                          >
                            {this.renderTableContent(item, data, output)}
                          </TableRowColumn>
                        )
                      })
                    }
                  </TableRow>
                )
              }) :

              <EmptyList />

          }
        </TableBody>
      </MUITable>
    )
  }
}

Table.propTypes = {
  // optionalString: React.PropTypes.string,
}

Table.defaultProps = {}

export default Table
