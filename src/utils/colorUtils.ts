
export const generateRandomRgbaColor = () => {
    const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
    const randomByte = () => randomNumber(0, 255)
    const opacity = 0.5;
    return `rgba(${[randomByte(), randomByte(), randomByte(), opacity].join(',')})`
}
