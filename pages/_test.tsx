import * as React from 'react'
import {Provider} from 'react-redux'
import {Layout} from '../src/components/layout/Layout'
import {StaticPage} from './_page'

export default class extends StaticPage<{}> {
  render() {
    return (
      <Provider store={this.store}>
        <Layout>
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">봉소랩스</h4>
            <p>로그인하세요.</p>
            <hr/>
            <p className="mb-0">
              <button
                type={'button'}
                className={'col-12 btn btn-default'}
                onClick={_ => {
                  localStorage.setItem('reduxPersist:persist', JSON.stringify({
                    userInfo: {
                      provider: 'tester',
                      name    : 'tester',
                      photo   : 'https://cad.onshape.com/images/placeholder-user.png',
                      jwt     : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9uIjoib3duZXIiLCJwcm92aWRlciI6ImdpdGh1YiIsIm5hbWUiOiJ0ZXN0ZXIiLCJpYXQiOjE1MDY3MTE2ODB9.HZONuE8asBSBf0-718fNbWrwtAIx8BT2AWiJgxswYiM'
                    }
                  }))
                  location.reload()
                }}
              >
                로그인 proxy
              </button>
            </p>
          </div>
        </Layout>
      </Provider>
    )
  }
}