
export interface FoodDetail {
    image_url: string;
    generic_name: string;
    image_nutrition_url: string;
    nutriments: NutrimentsDto;
}

export interface NutrimentsDto {
    potassium_100g: number;
    calcium_unit: string;
    proteins_unit: string;
    "vitamin-a_label": string;
    "monounsaturated-fat_100g": number;
    iron_unit: string;
    "vitamin-c_unit": string;
    "saturated-fat": number;
    "trans-fat": number;
    salt_unit: string;
    iron_label: string;
    sugars_unit: string;
    calcium_label: string;
    "satured-fat_unit": string;
    "trans-fat_label": string;
    "nutrition-score-fr": number;
    sodium_unit: string;
    fiber_unit: string;
    "trans-fat_unit": string;
    "nutrition-score-uk": number;
    cholesterol_100g: number;
    "energy-kcal_unit": string;
    fat_unit: string;
    "nova-group": number;
    "polyunsaturated-fat_100g": number;
    "vitamin-a": number;
    "vitamin-c_label": string;
    "vitamin-c": number;
    "vitamin-a_unit": string;
    alcohol_unit: string;
    carbohydrates_unit: string;
    "energy-kcal": number;
}
