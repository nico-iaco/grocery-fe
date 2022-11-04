
export interface Item {
    id: string
    userId: string
    name: string
    vendor: string
    barcode: string
    quantity?: number
    availableQuantity?: number
    unit?: string
}
