
export interface Item {
    id: string
    pantryId: string
    name: string
    vendor: string
    barcode: string
    quantity?: number
    availableQuantity?: number
    unit?: string
    nextExpirationDate?: Date
}
