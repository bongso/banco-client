import * as React from 'react'
import * as classnames from 'classnames'
import {connect} from 'react-redux'
import {RootState} from '../../../redux/index'
import stylesheet from './Login.pcss'
import {bindActionCreators} from 'redux'
import {AuthState} from '../../../redux/auth/reducer'
import {login, loginWithOAuth, logout} from '../../../redux/auth/actions'
import * as t from 'tcomb-form'

const loginFormSchema = t.struct({
  username: t.String,         // a required string
  password: t.String, // an optional number
  // rememberMe: t.Boolean   // a boolean
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

export const Login = connect<MapStateToProps, MapDispatchToProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(
  class Login extends React.Component<MapStateToProps & MapDispatchToProps & OwnProps, OwnState> {
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

    onSubmitLogin(evt) {
      console.log(evt)
      evt.preventDefault()
      const value = this.refs.loginForm.getValue()
      if (value) {
        console.log(value)

        this.props.login(value.username, value.password)
      }
    }

    _renderLoginForm() {
      const loginFormOptions = {
        auto  : 'placeholders',
        fields: {
          username: {},
          password: {
            type: 'password'
          }
        }
      }

      return (
        <form onSubmit={(evt) => this.onSubmitLogin(evt)}>
          {
            this.props.auth.error ?
              <div className={classnames('alert alert-danger')} role="alert">
                {
                  this.props.auth.error
                }
              </div>
              :
              null
          }
          
          <t.form.Form ref="loginForm"
                       options={loginFormOptions}
                       type={loginFormSchema}
          />
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      )
    }

    render() {
      return (
        <div>
          <style>{stylesheet}</style>
          {
            this._renderLoginForm()
          }
        </div>
      )
    }
  }
)