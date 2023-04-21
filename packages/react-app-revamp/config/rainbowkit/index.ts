import { Theme } from "@rainbow-me/rainbowkit";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "./../../tailwind.config";

const tailwindTheme: any = resolveConfig(tailwindConfig).theme;

export const jokeDAOTheme: Partial<Theme> = {
  fonts: {
    body: tailwindTheme.fontFamily.sans.toString(),
  },
  colors: {
    actionButtonBorder: "transparent",
    accentColor: tailwindTheme.colors.primary[10],
    accentColorForeground: tailwindTheme.colors.primary[1],
    error: tailwindTheme.colors.negative[10],
    connectButtonInnerBackground: "rgba(255, 255, 255, 0.1)",
    connectButtonBackground: tailwindTheme.colors.neutral[2],
    connectButtonBackgroundError: tailwindTheme.colors.negative[1],
    connectButtonTextError: tailwindTheme.colors.negative[11],
    modalTextDim: tailwindTheme.colors.neutral[10],
    modalTextSecondary: tailwindTheme.colors.neutral[11],
    closeButtonBackground: tailwindTheme.colors.neutral[0],
    closeButton: tailwindTheme.colors.neutral[11],
    actionButtonSecondaryBackground: tailwindTheme.colors.primary[1],
    modalBorder: tailwindTheme.colors.neutral[4],
    generalBorder: tailwindTheme.colors.neutral[4],
    generalBorderDim: tailwindTheme.colors.neutral[2],
    menuItemBackground: tailwindTheme.colors.primary[2],
    modalBackground: tailwindTheme.colors.neutral[0],
    modalBackdrop: "rgba(0, 0, 0, 0.5)",
    connectionIndicator: tailwindTheme.colors.positive[11],
    standby: tailwindTheme.colors.primary[11],
    connectButtonText: tailwindTheme.colors.primary[11], // example value, adjust as needed
    modalText: tailwindTheme.colors.neutral[11], // example value, adjust as needed
    profileAction: tailwindTheme.colors.primary[11], // example value, adjust as needed
    profileActionHover: tailwindTheme.colors.primary[9], // example value, adjust as needed
    profileForeground: tailwindTheme.colors.primary[1], // example value, adjust as needed
    selectedOptionBorder: tailwindTheme.colors.primary[11], // example value, adjust as needed
    actionButtonBorderMobile: "transparent",
  },
  radii: {
    actionButton: "12px",
    connectButton: "12px",
    menuButton: "12px",
    modal: "12px",
    modalMobile: "12px",
  },
};
