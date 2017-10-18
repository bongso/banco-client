import * as React from 'react'
import * as classnames from 'classnames'
import {connect} from 'react-redux'
import {RootState} from '../../redux/index'
import stylesheet from './ProfileSummary.pcss'
import {bindActionCreators} from 'redux'
import {AuthState} from '../../redux/auth/reducer'
import {login, loginWithAuthToken, loginWithOAuth, logout} from '../../redux/auth/actions'
import {Auth} from '../auth/Auth'
import * as Modal from 'react-modal'
import {IoCloseRound} from 'react-icons/lib/io'
import * as UserAvatar from 'react-user-avatar'

//Interface for Component's props
interface OwnProps {
}

//Interface for Component's state
interface OwnState {
  modalIsOpen: boolean
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
        modalIsOpen: false
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
      const {loginWithAuthToken} = this.props
      loginWithAuthToken()
    }

    openModal() {
      this.setState({modalIsOpen: true})
    }

    afterOpenModal() {
      // references are now sync'd and can be accessed.
    }

    closeModal() {
      this.setState({modalIsOpen: false})
    }

    _renderProfileSummary() {
      const {auth} = this.props

      if (auth && auth.user && auth.user.username) {
        const username = auth.user.username

        return (
          <div className={classnames('profile-summary')}>
            <UserAvatar size="40" name={username} style={{color:'#ffffff'}} />
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

    _renderLoginModal() {
      const modalIsOpen = this.state.modalIsOpen

      return (
        <Modal
          className={classnames('auth-modal')}
          isOpen={modalIsOpen}
          closeTimeoutMS={200}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Login Modal"
        >
          <div className={classnames('auth-modal-container')}>

            <div
              className={classnames('auth-modal-login-container', 'animated', modalIsOpen ? 'slideInLeft' : 'slideOutLeft')}>
              <div className={classnames('auth-modal-header')}>
                <h5 className={classnames('title')}>
                  Login
                </h5>
                <IoCloseRound size={18} onClick={this.closeModal}></IoCloseRound>
              </div>
              <Auth/>
            </div>

            {/*<div className={classnames('auth-modal-introduce-service-container')}>*/}
            {/*service*/}
            {/*</div>*/}
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