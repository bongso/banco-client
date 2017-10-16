import * as React from 'react'
import * as classnames from 'classnames'
import {connect} from 'react-redux'
import {RootState} from '../../redux/index'
import stylesheet from './Auth.pcss'
import {bindActionCreators} from 'redux'
import {AuthState} from '../../redux/auth/reducer'
import {login, loginWithOAuth, logout} from '../../redux/auth/actions'
import * as t from 'tcomb-form'

const FormSchema = t.struct({
  username  : t.String,         // a required string
  password  : t.String, // an optional number
  rememberMe: t.Boolean   // a boolean
})

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
  login,
  loginWithOAuth,
  logout
}

//Redux's dispatch to component's props
const mapDispatchToProps = (dispatch): MapDispatchToProps => {
  const actionCreators = {
    login,
    loginWithOAuth,
    logout
  }

  return bindActionCreators(actionCreators, dispatch)
}

export const Auth = connect<MapStateToProps, MapDispatchToProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(
  class Auth extends React.Component<MapStateToProps & MapDispatchToProps & OwnProps, OwnState> {
    constructor(props) {
      super(props)
    }

    componentWillReceiveProps(newProps) {
    }

    componentWillMount() {
    }


    _renderLoading() {
      //TODO::display loading
      return null
    }

    onSubmit(evt) {
      evt.preventDefault()
      // const value = this.refs.loginForm.getValue()
      // if (value) {
      //   console.log(value)
      // }
    }

    _renderLoginForm() {
      return (
        <form onSubmit={this.onSubmit}>
          <t.form.Form ref="loginForm" type={FormSchema}/>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      )
    }

    render() {
      return (
        <div className={classnames('chat-container')}>
          <style>{stylesheet}</style>
          {
            this._renderLoginForm()
          }
        </div>
      )
    }
  }
)