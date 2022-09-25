
export interface Transaction {
    id: string
    vendor: string
    quantity: number
    availableQuantity: number
    unit: string
    price: number
    expirationDate: Date
}
