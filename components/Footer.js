import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { color } from "@mui/system";

function Copyright() {
	return (
		<Typography
			sx={{
				textAlign: "center",
				color: "#ffffff",
			}}
			variant="body2"
			color="text.secondary"
		>
			{"Copyright © "}
			<Link href="/">Cerulean Blue</Link> {new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

export default function Footer() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
			}}
		>
			<CssBaseline />

			<Box
				component="footer"
				sx={{
					py: 3,
					px: 2,
					mt: "auto",
					backgroundColor: (theme) =>
						theme.palette.mode === "dark"
							? theme.palette.grey[200]
							: theme.palette.grey[800],
				}}
			>
				<Container maxWidth="sm">
					<Copyright />
				</Container>
			</Box>
		</Box>
	);
}
