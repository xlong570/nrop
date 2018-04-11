var _cache = {}

module.exports = {
  get(key) {
    return _cache[key]
  },
  set(key , value){
    _cache[key] = value
  }
}