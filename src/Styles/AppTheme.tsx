import { createTheme, responsiveFontSizes, Theme } from "@mui/material";
import { amber, blueGrey, deepOrange } from "@mui/material/colors";
import memoizeOne from "memoize-one";

declare module '@mui/material/styles' {
	interface TypeText {
		primaryDark: string;
		secondaryDark: string;
	}

	// allow configuration using `createTheme`
	interface TypeTextOptions {
		primaryDark?: string;
		secondaryDark?: string;
	}
	
	interface TypeBackground {
		paperDark: string;
	}
	
	interface TypeBackgroundOptions {
		paperDark?: string;
	}
}

// https://material.io/resources/color/
// https://mui.com/customization/palette/
// https://mui.com/customization/color/
export const createAppTheme = memoizeOne(() => {
	let theme = createTheme({
		palette: {
			primary: {
				main: "#F0E5B1",
			},
			secondary: {
				main: "#A39B71"
			},
			background: {
				default: "#E3F1FF",
				paper: "#BED6F0",
				paperDark: ""
			},
			text: {
				primary: "#1C2229",
				secondary: "#627387"
			}
		},
		typography: {
			fontFamily: "'Fira Sans', sans-serif",
			h1: {
				'@media (min-width:200px)': {
					fontSize: '2.0rem',
				},
			},
			h4: {
				'@media (min-width:200px)': {
					fontSize: '1.2rem',
				},
			},
			h5: {
				'@media (min-width:200px)': {
					fontSize: '1.0rem',
				},
			},
			body1: {
				letterSpacing: "0.04rem",
				'@media (min-width:200px)': {
					fontSize: '0.8rem',
				},
				'@media (min-width:600px)': {
					fontSize: '1.0rem',
				}
			},
			button: {
				letterSpacing: "0.04rem"
			}
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					body: {
						overflow: "hidden"
					}
				}
			}
		}
	});

	theme = responsiveFontSizes(theme);
	return theme;
});