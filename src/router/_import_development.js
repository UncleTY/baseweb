module.exports = function (file) {
  return  resolve => require(['@/views/' + file + '.vue'], resolve)
}