import * as React from 'react'
import {connect} from 'react-redux'
import {actions, DispatchProps, RootState} from '../redux/index'
import {bookmarkNews, NewsState} from '../redux/news/index'
import {BootstrapTable as Table, TableHeaderColumn as Th} from 'react-bootstrap-table'
import {SystemState} from '../redux/system/index'
import {HALF_DAY} from '../constants/index'
import {Style} from './Style'
import stylesheet from './News.pcss'
import {PersistState} from '../redux/persist/index'
import * as classnames from 'classnames'
import {Spinner} from './Spinner'
import {Next} from './Next'

interface S extends NewsState, SystemState, PersistState {
}

interface O {
}
type Props = S & DispatchProps & O
interface State {
  bookmarking: Set<number>
}
export const News = connect<S, DispatchProps, O>(
  (state: RootState) => ({
    ...state.news,
    ...state.system,
    ...state.persist
  }),
  actions
)(
  class News extends React.Component<Props, State> {
    static defaultProps = {
      list:    [],
      loading: true,
    }
    static md_hidden    = 'hidden-md-down'

    state = {
      bookmarking: new Set()
    }

    constructor(props) {
      super(props)
      this.formatBookmark = this.formatBookmark.bind(this)
    }

    render() {
      const {list, loading, meta} = this.props
      const hiddenColumnProps     = {className: News.md_hidden, columnClassName: News.md_hidden}

      return (
        <div>
          <Style>{stylesheet}</Style>
          {meta && <h4>{list.length}/{meta.totalCount}</h4>}
          <Table data={list} options={{noDataText: this.noText(loading)}} trClassName={News.highlightIn24Hours}>
            <Th width="80" dataField="번호" dataAlign="center" isKey {...hiddenColumnProps} >번호</Th>
            <Th width="110" dataField="name" dataAlign="center">소스</Th>
            <Th width="110" dataField="_" dataAlign="center" dataFormat={this.formatId}>크롤링일자</Th>
            <Th width="110" dataField="작성일자" dataAlign="center" {...hiddenColumnProps}>작성일자</Th>
            <Th dataField="제목" dataAlign="center" dataFormat={this.formatTitle}>제목</Th>
            <Th width="110" dataField="접수일정" dataAlign="center" {...hiddenColumnProps}>접수일정</Th>
            <Th width="70" dataField="bookmarkers" dataAlign="center" {...hiddenColumnProps}
                dataFormat={this.formatBookmarkers}>
              <i className={'fa fa-users fa-lg'}/>
            </Th>
            <Th width="60" dataField="_" dataAlign="center" dataFormat={this.formatBookmark}>
              <i className={'fa fa-heart fa-lg'}/>
            </Th>
          </Table>
          {meta && (loading
              ? <Spinner size={3}/>
              : list.length !== meta.totalCount && <Next {...meta} next={page => this.props.actions.getNews({page})}/>
          )}
        </div>
      )
    }

    componentDidMount() {
      if (this.props.boot) {
        this.props.actions.getNews()
      }
    }

    componentWillReceiveProps(props) {
      if (!this.props.boot && props.boot) {
        this.props.actions.getNews()
      }
    }

    private static highlightIn24Hours(row, cell) {
      const date = News.extractDateFromId(row._id).getTime()
      if (News.isIn12Hours(date)) {
        return 'text-bold'
      }
    }

    private static isIn12Hours(date) {
      return Date.now() - date < HALF_DAY
    }

    private static extractDateFromId(id) {
      return new Date(parseInt(id.substring(0, 8), 16) * 1000)
    }

    private formatId(cell, row) {
      const date = News.extractDateFromId(row._id)
      if (News.isIn12Hours(date)) {
        return <div>{date.toISOString().slice(11, 19)}</div>
      }
      return <div>{date.toISOString().slice(0, 10)}</div>
    }

    private formatTitle(cell, row) {
      return <a href={row.url} target="_blank">{cell}</a>
    }

    private formatBookmarkers(cell, {_id, bookmarkers = []}) {
      const placeholder = 'https://cad.onshape.com/images/placeholder-user.png'
      const people      = bookmarkers
        .slice(-3)
        .reverse()
      const imageProps  = {
        width:     32,
        height:    32,
        className: 'like-user-photo'
      }

      return (
        <div title={`${bookmarkers.length} 명이 좋아합니다.`}>
          {people.map(person => <img key={person.name} src={person.photo || placeholder} alt={person.name} {...imageProps} />)}
          {bookmarkers.length > 3 && <img src={placeholder} alt=""  {...imageProps} />}
        </div>
      )
    }

    private formatBookmark(cell, {_id, bookmarkers = []}) {
      const bookmarker = Boolean(bookmarkers.find(bookmarker => bookmarker.name === this.props.userInfo.name))

      if (this.state.bookmarking.has(_id)) {
        return <Spinner size={'lg'}/>
      }
      return (
        <i
          className={classnames('fa fa-lg', {'fa-heart-o': !bookmarker, 'fa-heart': bookmarker})}
          onClick={bookmarker
            ? () => this.bookmarking(this.props.actions.unBookmarkNews, _id)
            : () => this.bookmarking(this.props.actions.bookmarkNews, _id)
          }
        />
      )
    }

    private async bookmarking(action: typeof bookmarkNews, id) {
      this.state.bookmarking.add(id)
      this.setState({bookmarking: new Set(this.state.bookmarking)})

      await action(id)

      this.state.bookmarking.delete(id)
      this.setState({bookmarking: new Set(this.state.bookmarking)})
    }


    private noText(loading) {
      return loading
        ? <Spinner size={3}/>
        : '데이터가 없습니다.'
    }
  }
)