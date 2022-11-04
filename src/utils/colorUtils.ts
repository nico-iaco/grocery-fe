

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

export function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
