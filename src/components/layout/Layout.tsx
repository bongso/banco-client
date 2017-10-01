import * as React from 'react'
import * as classnames from 'classnames'
import Head from 'next/head'
import stylesheet from './Layout.pcss'
export class Layout extends React.Component<{}, {}> {
  render() {
    const {children} = this.props
    return (
      <div>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <style {...{jsx: true}}>{stylesheet}</style>
        </Head>
        {children}
      </div>
    )
  }
}
