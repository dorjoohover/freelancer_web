'use client'
import { colorsTuple, createTheme } from "@mantine/core";

export const theme = createTheme({
  // Controls --mantine-font-family
  fontFamily: "Arial, sans-serif",

  // Controls --mantine-font-family-monospace
  fontFamilyMonospace: "Courier New, monospace",

  headings: {
    // Controls --mantine-font-family-headings
    fontFamily: "Open Sans, sans-serif",
  },
  colors: {
    dark: colorsTuple("#343434"),
    brand: colorsTuple("#FF8600"),
    gray: colorsTuple('#d9d9d9'),
    textGray: colorsTuple('#9aaa97'),
  },
});
