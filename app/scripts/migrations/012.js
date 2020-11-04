const version = 12

/*

This migration modifies our notices to delete their body after being read.

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
      console.warn(`WanMask Migration #${version}` + err.stack)
    }
    return Promise.resolve(versionedData)
  },
}

function transformState (state) {
  const newState = state
  newState.NoticeController.noticesList.forEach((notice) => {
    if (notice.read) {
      notice.body = ''
    }
  })
  return newState
}
