
export interface Meal {
    id?: string;
    userId: string;
    name: string;
    description: string;
    mealType: MealType;
    date: Date;
    kcal?: number;
    cost?: number;
}

export enum MealType {
    BREAKFAST = "breakfast",
    LUNCH = "lunch",
    DINNER = "dinner",
    OTHERS = "others"
}
