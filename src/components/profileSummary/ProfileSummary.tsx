import * as React from 'react'
import * as classnames from 'classnames'
import {connect} from 'react-redux'
import {RootState} from '../../redux/index'
import stylesheet from './ProfileSummary.pcss'
import {bindActionCreators} from 'redux'
import {AuthState} from '../../redux/auth/reducer'
import {login, loginWithAuthToken, loginWithOAuth, logout} from '../../redux/auth/actions'
import {Login} from '../auth/login/Login'
import {Register} from '../auth/register/Register'
import * as Modal from 'react-modal'
import {IoCloseRound} from 'react-icons/lib/io'
import * as UserAvatar from 'react-user-avatar'

//Interface for Component's props
interface OwnProps {
}

//Interface for Component's state
interface OwnState {
  isOpenedModal: boolean,
  isOpenedRegisterView: boolean
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
  loginWithAuthToken,
  loginWithOAuth,
  logout
}

//Redux's dispatch to component's props
const mapDispatchToProps = (dispatch): MapDispatchToProps => {
  const actionCreators = {
    login,
    loginWithAuthToken,
    loginWithOAuth,
    logout
  }

  return bindActionCreators(actionCreators, dispatch)
}

export const ProfileSummary = connect<MapStateToProps, MapDispatchToProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(
  class ProfileSummary extends React.Component<MapStateToProps & MapDispatchToProps & OwnProps, OwnState> {
    constructor(props) {
      super(props)

      this.state = {
        isOpenedModal       : false,
        isOpenedRegisterView: false
      }

      this.openModal = this.openModal.bind(this)
      this.afterOpenModal = this.afterOpenModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
    }

    componentWillReceiveProps(newProps) {
      if (newProps.auth.isLoggedIn && this.props.auth.isLoggedIn != newProps.auth.isLoggedIn) {
        this.closeModal()
      }
    }

    componentWillMount() {
      const {loginWithAuthToken, logout} = this.props
      loginWithAuthToken().then(null, () => {
        logout()
      })
    }

    openModal() {
      this.setState({isOpenedModal: true})
    }

    afterOpenModal() {
      // references are now sync'd and can be accessed.
    }

    closeModal() {
      this.setState({isOpenedModal: false})
    }

    logout() {
      this.props.logout()
    }

    openRegisterView() {
      this.setState({isOpenedRegisterView: true})

    }

    closeRegisterView() {
      this.setState({isOpenedRegisterView: false})
    }


    _renderProfileSummary() {
      const {auth} = this.props

      if (auth && auth.user && auth.user.username) {
        const username = auth.user.username

        return (
          <div className={classnames('profile-summary')} onClick={() => this.openModal()}>
            <UserAvatar size="40" name={username} style={{color: '#ffffff'}}/>
            <a><h6 className={classnames('username')}>
              {
                username
              }
            </h6></a>
          </div>
        )
      }

      return (
        <div className={classnames('profile-summary clickable')} onClick={() => this.openModal()}>
          <UserAvatar size="40" color={'#aaaaaa'} name="Anonymous"/>
          <a><h6 className={classnames('username')}>Login</h6></a>
        </div>
      )
    }

    _renderRegister() {
      const isOpenedRegisterView = this.state.isOpenedRegisterView

      if (!isOpenedRegisterView) {
        return null
      }

      return (
        <div>
          <div className={classnames('auth-modal-header')}>
            <h5 className={classnames('title')}>
              Register
            </h5>
            <IoCloseRound size={18} className={classnames('clickable')} onClick={this.closeModal}></IoCloseRound>
          </div>
          <Register/>

          <button type="button" className={classnames('btn btn-block btn-link')}
                  onClick={() => this.closeRegisterView()}>
            Login
          </button>
        </div>
      )
    }

    _renderLogin() {
      const isOpenedRegisterView = this.state.isOpenedRegisterView

      if (isOpenedRegisterView) {
        return null
      }

      return (
        <div>
          <div className={classnames('auth-modal-header')}>
            <h5 className={classnames('title')}>
              Login
            </h5>
            <IoCloseRound size={18} className={classnames('clickable')} onClick={this.closeModal}></IoCloseRound>
          </div>
          <Login/>

          <button type="button" className={classnames('btn btn-block btn-link')}
                  onClick={() => this.openRegisterView()}>
            Register
          </button>
        </div>
      )
    }

    _renderProfile() {
      const user = this.props.auth.user

      return (
        <div>
          <div className={classnames('auth-modal-header')}>
            <h5 className={classnames('title')}>
              {user.username}
            </h5>
            <IoCloseRound size={18} className={classnames('clickable')} onClick={this.closeModal}></IoCloseRound>
          </div>
          <div className={classnames('auth-profile-container')}>
            <UserAvatar size="200" name={user.username} style={{color: '#ffffff'}}/>
          </div>
          <div className={classnames('auth-profile-menu-container')}>
            <button type="button" className={classnames('btn btn-block btn-link')}
                    onClick={() => this.logout()}>
              Logout
            </button>
          </div>
        </div>
      )
    }

    _renderLoginModal() {
      const isOpenedModal = this.state.isOpenedModal
      const user = this.props.auth.user
      return (
        <Modal
          className={classnames('auth-modal')}
          isOpen={isOpenedModal}
          closeTimeoutMS={200}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Login Modal"
        >
          <div className={classnames('auth-modal-container')}>
            <div
              className={classnames('auth-modal-login-container', 'animated', isOpenedModal ? 'slideInLeft' : 'slideOutLeft')}>

              {
                user ?
                  this._renderProfile() :
                  <div>
                    {this._renderLogin()}
                    {this._renderRegister()}
                  </div>
              }

            </div>
          </div>
        </Modal>
      )
    }

    render() {
      return (
        <div className={classnames('profile-summary-container')}>
          <style>{stylesheet}</style>
          {
            this._renderProfileSummary()
          }
          {
            this._renderLoginModal()
          }
        </div>
      )
    }
  }
)