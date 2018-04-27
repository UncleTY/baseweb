import fetch from '@/api/httpFetch.js'
export function getMenuList () {
  return fetch.get("/bizframe/dict/list.json")
}
export function getMenuTree () {
  return fetch.get("/bizframe/menu/menuTree.json")
}