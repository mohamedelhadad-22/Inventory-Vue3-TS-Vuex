// store/index.ts
import axios from 'axios'
import type { PropertyDataTableItem, UnitDataTableItem } from '@/models/DataTableItem'

declare const localStorage: Storage

export interface State {
  property: PropertyDataTableItem[]
  units: UnitDataTableItem[]
}
const mainUrl = process.env.VUE_APP_API_BASE_URL || 'http://192.168.100.36:8000/'
// http://192.168.100.81:8000/  || this is for my local sever
// http://192.168.100.36:8000/  || this for company sever
export default {
  state: {
    property: [],
    units: [],
  } as State,
  getters: {
    getPropertyById: (state: State) => (PropertyId: any) => {
      return state.property.find((Property: PropertyDataTableItem) => Property.id === PropertyId)
    },
    allProperties: (state: State) => state.property,
    // get all units
    allUnits: (state: State) => state.units,
    selectedUnit(state: State) {
      return state.units[0]
    }
  },
  actions: {
    // get product from api
    async fetchProperty({ commit }: { commit: any }) {
      const headers = {
        'Content-Type': `multipart/form-data`,
        Authorization: 'Token ' + localStorage.getItem('token')
      }
      try {
        const res = await axios.get<PropertyDataTableItem[]>(mainUrl + 'api/property/list/', {
          headers
        })

        console.log('headers', headers)
        commit('setProperty', res.data)
        console.log('token from localstorage', localStorage.getItem('token'))
        console.log('store console', [res.data])
      } catch (error) {
        console.log(error)
      }
    },
    async addNewproperty({ commit }: { commit: any }, newproperty: PropertyDataTableItem) {
      const headers = {
        'Content-Type': `multipart/form-data`,
        Authorization: 'Token ' + localStorage.getItem('token')
      }
      try {
        // Assuming the API endpoint is correct and does not require a trailing slash
        const res = await axios.post<PropertyDataTableItem>(
          mainUrl + 'api/property/create/',
          newproperty,
          { headers }
        )
        commit('addNewproperty', res.data)
        console.log('newUnit:', newproperty)
      } catch (error) {
        console.error('Error:', error)
        // Handle error appropriately
      }
    },
    // delete property by ID
    async deletePropertyById({ commit }: { commit: any }, PropertyId: number) {
      const headers = {
        'Content-Type': `multipart/form-data`,
        Authorization: 'Token ' + localStorage.getItem('token')
      }
      try {
        // Assuming the API endpoint is correct and does not require a trailing slash
        await axios.delete(mainUrl + `api/property/${PropertyId}/`, { headers })
        commit('deletepropertyById', PropertyId)
        console.log('Product deleted successfully', PropertyId)
      } catch (error) {
        console.error('Error deleting Property:', error)
        // error appropriately
      }
    },
    // edit property by ID
    async editPropertyById(
      { commit }: { commit: any },
      payload: { PropertyId: number; updatedProperty: PropertyDataTableItem }
    ) {
      const headers = {
        'Content-Type': `multipart/form-data`,
        Authorization: 'Token ' + localStorage.getItem('token')
      }

      try {
        const res = await axios.put(
          mainUrl + `api/property/${payload.PropertyId}/`,
          payload.updatedProperty,
          { headers }
        )

        commit('editPropertyById', res.data)
        console.log('Property edited successfully', res.data)
      } catch (error) {
        console.error('Error editing Property:', error)
        // Handle error appropriately
      }
    },

    // get units of property from api
    async fetchUnits({ commit }: { commit: any }, PropertyId: { propertyId: number }) {
      const headers = {
        'Content-Type': `multipart/form-data`,
        Authorization: 'Token ' + localStorage.getItem('token')
      }
      try {
        console.log('fetchUnits', PropertyId.propertyId)
        const res = await axios.get<UnitDataTableItem[]>(
          mainUrl + `api/property/${PropertyId.propertyId}/unit/list/`,
          { headers }
        )
        commit('setUnits', res.data)
        console.log('store console units data', [res.data])
      } catch (error) {
        console.error('Error fetching units:', error)
        throw new Error('Failed to fetch units')
      }
    },
    // fetch single unit by ID
    async fetchUnit({ commit }: { commit: any }, unitId: number) {
      const headers = {
        'Content-Type': `multipart/form-data`,
        Authorization: 'Token ' + localStorage.getItem('token')
      }
      // Fetch unit data from API using both IDs
      console.log('unitId Store 332 = ', unitId)
      const res = await axios.get<UnitDataTableItem>(mainUrl + `api/property/unit/${unitId}/`, {
        headers
      })
      console.log('response', res)
      console.log('id store', unitId)
      commit('setUnit', res.data)
    },
    // add new unit to the property
    async addNewUnit(
      { commit }: { commit: any },
      payload: { propertyId: number; newUnit: UnitDataTableItem }
    ) {
      const headers = {
        'Content-Type': `multipart/form-data`,
        Authorization: 'Token ' + localStorage.getItem('token')
      }
      console.log('store payload:', payload.newUnit)
      try {
        console.log('store newUnit add:', payload.propertyId, payload.newUnit)
        const res = await axios.post<UnitDataTableItem>(
          mainUrl + `api/property/${payload.propertyId.propertyId}/unit/create/`,
          payload.newUnit,
          { headers }
        )
        console.log('store payload befor:', payload.newUnit)
        commit('addNewUnit', res.data)
        console.log('store newUnit:', res.data)
      } catch (error) {
        console.error('Error adding new unit:', error)
        console.log('store payload:', payload.newUnit)
        throw new Error('Failed to add new unit')
      }
    },

    // edit unit by ID
    async editUnitById(
      { commit }: { commit: any },
      payload: { unitId: number; updatedUnit: UnitDataTableItem }
    ) {
      const headers = {
        'Content-Type': `multipart/form-data`,
        Authorization: 'Token ' + localStorage.getItem('token')
      }
      console.log('updatedUnit', payload.updatedUnit)
      try {
        const res = await axios.put(
          mainUrl + `api/property/unit/${payload.unitId}/`,
          payload.updatedUnit,
          { headers }
        )

        commit('editUnitById', res.data)
        console.log('show data Unit edited successfully', res.data)
      } catch (error) {
        console.error('Error editing unit:', error)
        // Handle error appropriately
      }
    },

    // delete unit by id
    async deleteUnitById({ commit }: { commit: any }, unitId: number) {
      const headers = {
        'Content-Type': `multipart/form-data`,
        Authorization: 'Token ' + localStorage.getItem('token')
      }
      try {
        // Assuming the API endpoint is correct and does not require a trailing slash
        await axios.delete(mainUrl + `api/property/unit/` + unitId + `/`, {
          headers
        })
        commit('deleteUnitById', unitId)
        console.log('Unit deleted successfully', unitId)
      } catch (error) {
        console.error('Error deleting Unit:', error)
        // error appropriately
      }
    }
  },

  mutations: {
    setProperty(state: State, property: PropertyDataTableItem[]) {
      state.property = property
    },
    addNewproperty(state: State, property: PropertyDataTableItem) {
      const newproperty = [...state.property, property]
      state.property = newproperty
      console.log('newproperty', newproperty)
    },
    deletepropertyById(state: State, PropertyId: number) {
      const updatedProperties = state.property.filter((Property) => Property.id !== PropertyId)
      state.property = updatedProperties
      console.log('updatedProperties', updatedProperties)
    },
    // mutation to update a property by ID
    editPropertyById(state: State, updatedProperty: PropertyDataTableItem) {
      const index = state.property.findIndex((property) => property.id === updatedProperty.id)
      if (index !== -1) {
        state.property[index] = { ...state.property[index], ...updatedProperty }
      }
    },
    setUnits(state: State, units: UnitDataTableItem[]) {
      state.units = units
    },
    addNewUnit(state: State, newUnit: UnitDataTableItem) {
      const newUnits = [...state.units, newUnit]
      state.units = newUnits
      console.log('store newUnit:', newUnit)
    },

    // mutation to set a single unit by ID
    setUnit(state: State, unit: UnitDataTableItem) {
      state.units = [unit]
      console.log('unit From Store', unit)
    },
    //  mutation to update a unit by ID
    editUnitById(state: State, updatedUnit: UnitDataTableItem) {
      const index = state.units.findIndex((unit) => unit.id === updatedUnit.id)
      console.log('this is update unit data', updatedUnit)
      if (index !== -1) {
        state.units[index] = { ...state.units[index], ...updatedUnit }
        console.log('State units data', state.units[index])
      }
    },
    // mutation to delete a unit by ID
    deleteUnitById(state: State, unitId: number) {
      const updatedUnits = state.units.filter((unit) => unit.id !== unitId)
      state.units = updatedUnits
      console.log('updatedUnits', updatedUnits)
    }
  }
}
