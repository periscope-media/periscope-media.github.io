import api from '../../api/eg-api'
import * as types from '../mutation-types'

const state = {
  someResources: []
}

const getters = {
  someResources: state => state.someResources
}

const actions = {
  async fetchResource ({commit}, config) {
    return api.get(config.url)
      .then(response => {
        commit(types.MUT_RESOURCE, {
          additive: config.additive,
          prop: config.prop,
          body: response.body,
          headers: response.headers
        })
        return response.body
      })
      .catch(e => Promise.reject(e))
  }
}


const mutations = {
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