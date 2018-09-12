import api from '../../api/eg-api'
import * as types from '../mutation-types'

const state = {
  recordNewsStorysResources: [],
  recordNewsStoryResources: [],
  authorizationResources: [],
  newsResources: [],
  someResources: []
}

const getters = {
  authorization: state => state.authorization,
  recordNewsStorys: state => state.recordNewsStorys,
  recordNewsStory: state => state.recordNewsStory,
  authorizationResources: state => state.authenticateResources,
  newsResources: state => state.newsResources,
  someResources: state => state.someResources
}

const actions = {
  async recordNewsStorys ({commit}, config) {
    return api.post(config.url, config.body)
      .then(response => {
        commit(types.MUT_RESOURCE, {
          additive: config.additive,
          prop: config.prop,
          body: response.data,
          headers: response.headers
        })
        return response.body
      })
      .catch(e => Promise.reject(e))
  },
  async recordNewsStory ({commit}, config) {
    return api.post(config.url, config.body)
      .then(response => {
        commit(types.MUT_RESOURCE, {
          additive: config.additive,
          prop: config.prop,
          body: response.data,
          headers: response.headers
        })
        return response.body
      })
      .catch(e => Promise.reject(e))
  },
  async authenticate ({commit}, config) {
    return api.post(config.url, config.body)
      .then(response => {
        commit(types.MUT_AUTHORIZATION, {
          additive: config.additive,
          prop: config.prop,
          body: response.data,
          headers: response.headers
        })
        return response.body
      })
      .catch(e => Promise.reject(e))
  },
  async fetchResource ({commit}, config) {
    return api.get(config.url)
      .then(response => {
        commit(types.MUT_RESOURCE, {
          additive: config.additive,
          prop: config.prop,
          body: response.data,
          headers: response.headers
        })
        return response.body
      })
      .catch(e => Promise.reject(e))
  }
}

const mutations = {
  [types.MUT_AUTHORIZATION] (state, resource) {
    const authorization = resource.headers['authorization']
    state['authorization'] = authorization
  },
  [types.MUT_RESOURCE] (state, resource) {
    // state['pages'] = resource.headers.get('x-total-count')
    if (resource.additive) {
      state[resource.prop] = [...state[resource.prop], ...resource.body]
    } else {
      state[resource.prop] = resource.body
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
