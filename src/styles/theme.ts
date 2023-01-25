import { extendTheme, ThemeConfig, ThemeOverride } from "@chakra-ui/react";

// Extend the theme to include custom colors, fonts, etc
const config: Partial<ThemeConfig> = {
  initialColorMode: "system",
};

export const theme = extendTheme({ config });
