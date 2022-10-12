

const mealTypeColors: Map<string, string> = new Map<string, string>([
    ["breakfast", '#fff202'],
    ["lunch", '#29c96a'],
    ["dinner", '#24aad3'],
    ["other", '#7f8165'],
]);

export const generateRandomRgbaColor = () => {
    const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
    const randomByte = () => randomNumber(0, 255)
    const opacity = 0.5;
    return `rgba(${[randomByte(), randomByte(), randomByte(), opacity].join(',')})`
}

export const getMealTypeColor = (mealType: string) => {
    return mealTypeColors.get(mealType) || generateRandomRgbaColor();
}
