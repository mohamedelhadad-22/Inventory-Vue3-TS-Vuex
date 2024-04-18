// store/index.ts
import axios from 'axios'
import type { UnitDataTableItem } from '@/models/DataTableItem'

declare const localStorage: Storage

export interface State {
  units: UnitDataTableItem[]
}

export default {
  state: {
    units: []
  } as State,
  getters: {
    // get units of property from api
    getUnitById: (state: State) => (unitId: any) => {
      return state.units.find((unit: UnitDataTableItem) => unit.id === unitId)
    },
    allUnits: (state: State) => state.units
  },

  actions: {
    // get units of property from api
    async fetchUnits({ commit }: { commit: any }, PropertyId: { propertyId: string }) {
      const headers = {
        'Content-Type': `multipart/form-data`,
        Authorization: 'Token ' + localStorage.getItem('token')
      }
      try {
        console.log('fetchUnits', PropertyId.propertyId)
        const res = await axios.get<UnitDataTableItem[]>(
          `http://192.168.100.36:8000/api/property/${PropertyId.propertyId}/unit/list/`,
          { headers }
        )
        commit('setUnits', res.data)
        console.log('store console units data', [res.data])
      } catch (error) {
        console.error('Error fetching units:', error)
        throw new Error('Failed to fetch units')
      }
    },
    // add new unit to the property
    async addNewUnit(
      { commit }: { commit: any },
      PropertyId: { propertyId: string },
      newUnit: UnitDataTableItem
    ) {
      const headers = {
        'Content-Type': `application/json`,
        Authorization: 'Token ' + localStorage.getItem('token')
      }
      try {
        const res = await axios.post<UnitDataTableItem>(
          `http://192.168.100.36:8000/api/property/${PropertyId.propertyId}/unit/create/`,
          newUnit,
          { headers }
        )
        commit('setUnits', res.data)
        console.log('store newUnit:', newUnit)
      } catch (error) {
        console.error('Error adding new unit:', error)
        throw new Error('Failed to add new unit')
      }
    }
  },
  mutations: {
    setUnits(state: State, data: UnitDataTableItem[]) {
      state.units = data
    },
    addNewUnit(state: State, newUnit: UnitDataTableItem) {
      const newUnits = [...state.units, newUnit]
      state.units = newUnits
      console.log('store newUnit:', newUnit)
    }
  }
}
