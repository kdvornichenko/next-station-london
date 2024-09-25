type TColors = '#ED127B' | '#00ADEF' | '#40B93C' | '#602F93';

export const colorNames = {
    pink: '#ED127B',
    blue: '#00ADEF',
    green: '#40B93C',
    purple: '#602F93',
} as const;

// Типы ключей colorNames (строковые названия цветов)
export type TColorNames = keyof typeof colorNames;

// Типы значений colorNames (хэш-коды)
export type TColorValues = (typeof colorNames)[TColorNames];
