// DataTableItem.ts
export interface PropertyDataTableItem {
  id: number
  name: string
  type: string
  street1: string
  street2: string
  country: string
  city: string
  zip_code: string
  ownerName: string
  ownerLastName: string
  owner_email: string
  description: string
}
export interface UnitDataTableItem {
  id: number
  name: string
  complete_address: string
  rooms: number
  bathrooms: number
  space: number
  market_rent: ''
  property: ''
  size: ''
  // unit_image: File[]
  is_main: boolean
  type: ''
  status: ''
  property_name: string
  unit_image: {
    image: File
    is_main: boolean
  }[]
  amenities: {
    alarm: boolean
    wifi: boolean
    disposal: boolean
    furniture: boolean
    kitchen: boolean
    garage: boolean
    view: boolean
    washer: boolean
    refrigerator: boolean
    dryer: boolean
    cable: boolean
    air_conditioner: boolean
    fireplace: boolean
    storage: boolean
    balcony: boolean
  }
  owner: {
    name: string
    email: string
    contact_number: number
    image: string
  }
}
export interface FilterItem {
  item: PropertyDataTableItem
}

export interface property {
  id: number
  title: string
  price: number
  description: string
  image: string
  category: string
  rating: string
}
export interface newProperty {
  name: string
  type: string
  street1: string
  street2: string
  country: string
  city: string
  zip_code: string
  ownerFirstName: string
  ownerLastName: string
  owner_email: string
  description: string
  step: number
}

export interface AddNewUnit {
  UnitName: string
  UnitAddress: string
  bed_digits: number
  bathrooms: number
  Space_Meters: number
  status: string
  apartment_type: string
  units: number
  images: string
}
