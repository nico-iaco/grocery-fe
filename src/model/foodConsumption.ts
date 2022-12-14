
export interface FoodConsumption {
    id?: string;
    mealId: string;
    foodId?: string;
    transactionId?: string;
    foodName: string;
    quantityUsed: number;
    quantityUsedStd: number;
    unit: string;
    kcal: number;
    cost?: number;
}
