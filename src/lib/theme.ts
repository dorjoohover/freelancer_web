"use client";
import {
  colorsTuple,
  createTheme,
  darken,
  defaultVariantColorsResolver,
  parseThemeColor,
  rem,
  rgba,
  VariantColorsResolver,
} from "@mantine/core";
const variantColorResolver: VariantColorsResolver = (input) => {
  const parsedColor = parseThemeColor({
    color: input.color || colorsTuple("#FF8600"),
    theme: input.theme,
  });
  const defaultResolvedColors = defaultVariantColorsResolver(input);

  // Override some properties for variant
  if (
    parsedColor.isThemeColor &&
    parsedColor.color === "lime" &&
    input.variant === "filled"
  ) {
    return {
      ...defaultResolvedColors,
      color: "var(--mantine-color-black)",
      hoverColor: "var(--mantine-color-black)",
    };
  }

  // Completely override variant
  if (input.variant === "light") {
    return {
      background: rgba(parsedColor.value, 0.1),
      hover: rgba(parsedColor.value, 0.5),
      border: `${rem(1)} solid ${parsedColor.value}`,
      color: darken(parsedColor.value, 0.1),
    };
  }

  // Add new variants support
  if (input.variant === "danger") {
    return {
      background: "var(--mantine-color-red-9)",
      hover: "var(--mantine-color-red-8)",
      color: "var(--mantine-color-white)",
      border: "none",
    };
  }
  if (input.variant === "underline") {
    return {
      background: "transparent",
      border: "",
      hover: "none",

      color: darken(parsedColor.value, 0.1),
    };
  }
  return {
    ...defaultResolvedColors,

    hover: rgba(parsedColor.value, 0.5),
  };
};
export const theme = createTheme({
  variantColorResolver: variantColorResolver,
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
    gray: colorsTuple("#d9d9d9"),
    darkGray: colorsTuple("#a5a5a5"),
    textGray: colorsTuple("#9aaa97"),
    labelGray: colorsTuple("#676767"),
  },
});
