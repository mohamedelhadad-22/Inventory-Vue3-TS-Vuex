export interface linkObject {
    index: number
    name: string
    path: string
    icon: string
}

export interface linkList {
    subcategory: string
    // links: Array<linkObject>;
    links: linkObject[]
}
