import fetch from '@/api/httpFetch.js'
/* bizSetKind */
  export function getParentCodeListApi () {
    return fetch.post("/bizframe/dict/addDictEntry.json", form)
  }
