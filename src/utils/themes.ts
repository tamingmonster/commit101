export type ThemeColor = 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'gray';

export const themes: Record<ThemeColor, {
  primary: string; // keyword, variable names, icons
  secondary: string; // strings, secondary highlights
  accent: string; // punctuation, borders
}> = {
  blue: {
    primary: 'text-blue-600',
    secondary: 'text-green-600',
    accent: 'text-gray-400',
  },
  purple: {
    primary: 'text-purple-600',
    secondary: 'text-yellow-600',
    accent: 'text-gray-400',
  },
  green: {
    primary: 'text-emerald-600',
    secondary: 'text-blue-600',
    accent: 'text-gray-400',
  },
  orange: {
    primary: 'text-orange-600',
    secondary: 'text-teal-600',
    accent: 'text-gray-400',
  },
  red: {
    primary: 'text-red-600',
    secondary: 'text-amber-600',
    accent: 'text-gray-400',
  },
  gray: {
    primary: 'text-gray-800',
    secondary: 'text-gray-600',
    accent: 'text-gray-400',
  },
};

export const themeLabels: Record<ThemeColor, string> = {
  blue: 'VS Code Blue',
  purple: 'Dracula Purple',
  green: 'Forest Green',
  orange: 'Sunset Orange',
  red: 'Crimson Red',
  gray: 'Monochrome',
};
