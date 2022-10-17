

const mealTypeColors: Map<string, string> = new Map<string, string>([
    ["breakfast", 'rgba(238,225,12,0.85)'],
    ["lunch", 'rgba(51,218,45,0.7)'],
    ["dinner", 'rgba(0,196,255,0.7)'],
    ["other", 'rgba(173,167,61,0.44)']
]);

export const generateRandomRgbaColor = () => {
    const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
    const randomByte = () => randomNumber(0, 255)
    const opacity = 0.5;
    return `rgba(${[randomByte(), randomByte(), randomByte(), opacity].join(',')})`
}

export const getMealTypeColor = (mealType: string) => {
    return mealTypeColors.get(mealType);
}
