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
			<Link href="/">Cerulean</Link> {new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

export default function Footer() {
	return (
		<Box
			sx={{
				marginTop: "auto",
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
					backgroundColor: "#04111d",
				}}
			>
				<Container maxWidth="sm">
					<Copyright />
				</Container>
			</Box>
		</Box>
	);
}
