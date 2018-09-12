import axios from 'axios'

axios.interceptors.response.use((response) => {
  if (response.headers['authorization']) {
    axios.defaults.headers.common['Authorization'] = response.headers['authorization']
  }
  return response
})

export default {
  async get (url) {
    return axios.get(url)
      .then(r => Promise.resolve(r))
      .catch(e => Promise.reject(e))
  },
  async post (url, request, config) {
    return axios.post(url, request, config)
      .then(r => Promise.resolve(r))
      .catch(e => Promise.reject(e))
  },
  async put (url, request) {
    return axios.put(url, request)
      .then(r => Promise.resolve(r))
      .catch(e => Promise.reject(e))
  },
  async delete (url) {
    return axios.delete(url)
      .then(r => Promise.resolve(r))
      .catch(e => Promise.reject(e))
  }
}
