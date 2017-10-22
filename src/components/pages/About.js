import React from 'react'
import {
  inject,
  observer,
} from 'mobx-react'

//@inject('')
@observer
class Home extends React.Component {
  render() {
    return (
      <div>Home</div>
    )
  }
}

Home.propTypes = {
  // optionalString: React.PropTypes.string,
}

Home.defaultProps = {}

export default Home
