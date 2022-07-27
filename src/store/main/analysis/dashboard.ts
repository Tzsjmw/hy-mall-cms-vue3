import { Module } from 'vuex'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale,
  getAmountList
} from '@/service/main/analysis/dashboard'

import { IDashboardState } from './types'
import { IRootState } from '../../types'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: [],
      topPanelDatas: []
    }
  },
  mutations: {
    changeTopPanelDatas(state, list) {
      state.topPanelDatas = list
    },
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryCountResult.data)

      const categorySaleResult = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categorySaleResult.data)

      const categoryFavorResult = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryFavorResult.data)

      const addressGoodsResult = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsResult.data)

      const topPanelDataResult = await getAmountList()
      commit('changeTopPanelDatas', topPanelDataResult.data)
    }
  }
}

export default dashboardModule
