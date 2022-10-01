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
}

// https://material.io/resources/color/
// https://mui.com/customization/palette/
// https://mui.com/customization/color/
export const createAppTheme = memoizeOne(() => {
	let theme = createTheme({
		palette: {
			primary: {
				main: amber[500],
				dark: amber[800]
			},
			secondary: {
				main: deepOrange[500],
				dark: deepOrange[800]
			},
			background: {
				default: blueGrey[700],
				paper: blueGrey[800]
			},
			text: {
				primary: "#FEFFF5",
				secondary: "#CECEC2",
				primaryDark: "#19181D",
				secondaryDark: "#5B5765"
			}
		},
		typography: {
			fontFamily: "'Yanone Kaffeesatz', sans-serif",
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