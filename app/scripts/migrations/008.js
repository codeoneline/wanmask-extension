const version = 8

/*

This migration breaks out the NoticeController substate

*/

import { cloneDeep } from 'lodash'

export default {
  version,

  migrate: function (originalVersionedData) {
    const versionedData = cloneDeep(originalVersionedData)
    versionedData.meta.version = version
    try {
      const state = versionedData.data
      const newState = transformState(state)
      versionedData.data = newState
    } catch (err) {
      console.warn(`WanchainMask Migration #${version}` + err.stack)
    }
    return Promise.resolve(versionedData)
  },
}

function transformState (state) {
  const newState = {
    ...state,
    NoticeController: {
      noticesList: state.noticesList || [],
    },
  }
  delete newState.noticesList

  return newState
}
