import * as React from 'react'
import * as classnames from 'classnames'
import {connect} from 'react-redux'
import {RootState} from '../../../redux/index'
import stylesheet from './Register.pcss'
import {bindActionCreators} from 'redux'
import {AuthState} from '../../../redux/auth/reducer'
import {RegisteringUserState} from '../../../redux/auth/register/reducer'
import {registerUser} from '../../../redux/auth/register/actions'
import {login} from '../../../redux/auth/actions'
import * as t from 'tcomb-form'

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const emailType = t.refinement(t.String, function (value) {
  return emailRegex.test(value)
})

const usernameType = t.refinement(t.String, function (value) {
  return value.length > 4
})

const passwordType = t.refinement(t.String, function (value) {
  return value.length > 5
})

const registerFormSchema = t.struct({
  email   : emailType,
  username: usernameType,         // a required string
  password: passwordType, // an optional number
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
  auth: AuthState,
  registeringUser: RegisteringUserState
}

//Redux's state to component's props
const mapStateToProps = (state: RootState) => {
  return {
    auth           : state.auth,
    registeringUser: state.registeringUser
  }
}

//Interface for Redux's dispatch to component's props
interface MapDispatchToProps {
  registerUser,
  login
}

//Redux's dispatch to component's props
const mapDispatchToProps = (dispatch): MapDispatchToProps => {
  const actionCreators = {
    registerUser,
    login
  }

  return bindActionCreators(actionCreators, dispatch)
}

export const Register = connect<MapStateToProps, MapDispatchToProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(
  class Register extends React.Component<MapStateToProps & MapDispatchToProps & OwnProps, OwnState> {
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

    onSubmitRegister(evt) {
      console.log(evt)
      evt.preventDefault()
      const value = this.refs.registerForm.getValue()
      if (value) {
        console.log(value)

        this.props.registerUser(value.email, value.password, value.username).then(() => {
          this.props.login(value.email, value.password)
        })
      }
    }

    _renderRegisterForm() {
      const registerFormOptions = {
        auto  : 'placeholders',
        fields: {
          username: {},
          password: {
            type: 'password'
          }
        }
      }

      return (
        <form onSubmit={(evt) => this.onSubmitRegister(evt)}>
          {
            this.props.registeringUser.error ?
              <div className={classnames('alert alert-danger')} role="alert">
                {
                  this.props.registeringUser.error
                }
              </div>
              :
              null
          }

          <t.form.Form ref="registerForm"
                       options={registerFormOptions}
                       type={registerFormSchema}
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
            this._renderRegisterForm()
          }
        </div>
      )
    }
  }
)