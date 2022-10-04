
export interface Meal {
    id?: string;
    name: string;
    description: string;
    mealType: MealType;
    date: Date;

}

export enum MealType {
    BREAKFAST = "breakfast",
    LUNCH = "lunch",
    DINNER = "dinner",
    OTHERS = "others"
}
