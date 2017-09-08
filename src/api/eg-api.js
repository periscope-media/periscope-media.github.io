import Vue from 'vue'

export default {
  async get (url) {
    return Vue.http.get(url)
      .then(r => Promise.resolve(r))
      .catch(e => Promise.reject(e))
  },
  async post (url, request) {
    return Vue.http.post(url, request)
      .then(r => Promise.resolve(r))
      .catch(e => Promise.reject(e))
  },
  async put (url, request) {
    return Vue.http.put(url, request)
      .then(r => Promise.resolve(r))
      .catch(e => Promise.reject(e))
  },
  async delete (url) {
    return Vue.http.delete(url)
      .then(r => Promise.resolve(r))
      .catch(e => Promise.reject(e))
  }
}
