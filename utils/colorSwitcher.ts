import { colors, TColorValues } from "@/store/colors.store";

const colorsList = [colors.blue, colors.pink, colors.green, colors.purple]

export const startColorSwitcher = (
    callback: (color: TColorValues | null) => void,
    interval: number = 1000
) => {
    let colorIndex = 0;

    // Устанавливаем интервал для переключения цветов
    const intervalId = setInterval(() => {
        callback(colorsList[colorIndex]);
        colorIndex = (colorIndex + 1) % colorsList.length;
    }, interval);

    // Возвращаем функцию для остановки интервала
    return () => {
        clearInterval(intervalId);
    };
};
