import * as React from 'react'
import {Provider} from 'react-redux'
import {Channel} from '../src/components/channel/Channel'
import {Layout} from '../src/components/layout/Layout'
import {StaticPage} from './_page'

export default class extends StaticPage<{}> {
  render() {
    const channelName = this.props.url && this.props.url.query && this.props.url.query.channelName || null

    return (
      <Provider store={this.store}>
        <Layout>
          <Channel channelName={channelName}/>
        </Layout>
      </Provider>
    )
  }
}