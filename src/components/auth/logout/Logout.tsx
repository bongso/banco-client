import * as React from 'react'
import * as classnames from 'classnames'
import {connect} from 'react-redux'
import {RootState} from '../../../redux/index'
import stylesheet from './Logout.pcss'
import {bindActionCreators} from 'redux'
import {AuthState} from '../../../redux/auth/reducer'
import {logout} from '../../../redux/auth/actions'

//Interface for Component's props
interface OwnProps {
}

//Interface for Component's state
interface OwnState {
}

//Interface for Redux's state to component's props
interface MapStateToProps {
  auth: AuthState
}

//Redux's state to component's props
const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth
  }
}

//Interface for Redux's dispatch to component's props
interface MapDispatchToProps {
  logout
}

//Redux's dispatch to component's props
const mapDispatchToProps = (dispatch): MapDispatchToProps => {
  const actionCreators = {
    logout
  }

  return bindActionCreators(actionCreators, dispatch)
}

export const Logout = connect<MapStateToProps, MapDispatchToProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(
  class Logout extends React.Component<MapStateToProps & MapDispatchToProps & OwnProps, OwnState> {
    constructor(props) {
      super(props)
    }

    componentWillReceiveProps(newProps) {
    }

    componentWillMount() {
    }

    logout() {
      this.props.logout()
    }

    _renderLoading() {
      //TODO::display loading
      return null
    }

    _renderLogout() {
      const isLoggedIn = this.props.auth.isLoggedIn
      if (isLoggedIn) {
        return (
          <span className={classnames('clickable')} onClick={() => this.logout()}>
            Logout
          </span>
        )
      }

      return null
    }

    render() {
      return (
        <div>
          <style>{stylesheet}</style>
          {
            this._renderLogout()
          }
        </div>
      )
    }
  }
)