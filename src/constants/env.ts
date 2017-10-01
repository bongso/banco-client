import * as qs from 'querystring'

export const DEV = process.env.NODE_ENV !== 'production'

export const GA_TRACKING_ID = ''
export const NA_TRACKING_ID = ''
export const FA_TRACKING_ID = ''
export const SENTRY_TRACKING_ID = ''

export const SITE_NAME = '봉소랩스 ops'
export const SITE_TITLE = '봉소랩스 ops'
export const SITE_DESCRIPTION = '크롤링 데이터 관리'
export const SITE_IMAGE = 'https://avatars2.githubusercontent.com/u/31210784?v=4&s=200'

const GITHUB_CLIENT_ID = '8dc6e18c7457e3b6e5e4'
const LOGIN_GITHUB_REQUEST_URI = 'https://github.com/login/oauth/authorize'

const SLACK_CLIENT_ID = '16709086454.247870125634'
const LOGIN_SLACK_REQUEST_URI = 'https://slack.com/oauth/authorize'

const API_URL = DEV
  ? 'http://localhost:3000'
  : 'https://hl4z5bks96.execute-api.ap-northeast-2.amazonaws.com/dev'
export const LOGIN_GITHUB_REQUEST_URL = [
  LOGIN_GITHUB_REQUEST_URI,
  qs.stringify({
    client_id: GITHUB_CLIENT_ID,
    scope: ['read:org'].join(',')
  })
].join('?')
export const LOGIN_SLACK_REQUEST_URL = [
  LOGIN_SLACK_REQUEST_URI,
  qs.stringify({
    client_id: SLACK_CLIENT_ID,
    scope: ['team:read', 'usergroups:read', 'pins:read', 'stars:read'].join(',')
  })
].join('?')
export const API_NEWS = `${API_URL}/news`
