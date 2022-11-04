
export interface Transaction {
    id: string
    seller: string
    quantity: number
    quantityStd: number
    availableQuantity: number
    unit: string
    price: number
    expirationDate: Date
    purchaseDate: Date
}
