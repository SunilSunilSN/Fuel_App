// theme.ts
export const lightTheme = {
  colors: {
    background: '#dc2626',
    gradient: ['#f97316', '#dc2626', '#f59e0b'],
    iconBackground: 'rgba(255,255,255,0.2)',
    textPrimary: '#fff',
    textSecondary: '#fff',
    dot: 'rgba(255,255,255,0.8)',
  },
  spacing: {
    iconPadding: 30,
    contentGap: 16,
    dotsGap: 8,
  },
  fontSize: {
    title: 40,
    subtitle: 16,
  },
  shadow: {
    color: '#000',
    offset: { width: 0, height: 10 },
    opacity: 0.5,
    radius: 25,
  },
};

export const darkTheme = {
  colors: {
    background: '#000000',
    gradient: ['#111111', '#333333', '#555555'],
    iconBackground: 'rgba(255,255,255,0.1)',
    textPrimary: '#fff',
    textSecondary: '#ccc',
    dot: 'rgba(255,255,255,0.6)',
  },
  spacing: lightTheme.spacing,
  fontSize: lightTheme.fontSize,
  shadow: lightTheme.shadow,
};
