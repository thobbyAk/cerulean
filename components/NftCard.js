import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box } from "@mui/system";
import { shortenText } from "../lib/utilts";
import { Tooltip } from "@mui/material";

export default function NftCard({ assetData }) {
	return (
		<Card
			sx={{
				background: "transparent",
				border: "1px solid #ffa100",
				width: "100%",
				overflow: "hidden",
				cursor: "pointer",
				":hover": {
					transform: "scale(1.1)",
					boxShadow: "0 10px 40px 0 rgba(0, 0, 0, 0.4)",
					zIndex: 3,
				},
			}}
		>
			<CardMedia
				component="img"
				height="140"
				image={assetData?.image_url}
				alt={assetData?.name}
			/>
			<CardContent
				sx={{
					p: 3,
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						<Tooltip title={assetData?.name}>
							<Typography
								sx={{
									color: "#8a939b",
								}}
								gutterBottom
								variant="body1"
							>
								{assetData?.name ? shortenText(assetData?.name) : "N/A"}
							</Typography>
						</Tooltip>

						<Typography
							sx={{
								fontSize: "bold",
								color: "white",
							}}
							variant="body2"
						>
							#{shortenText(assetData?.name)}
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						<Typography
							sx={{
								color: "#8a939b",
							}}
							gutterBottom
							variant="body1"
						>
							Price
						</Typography>
						<Typography
							variant="h6"
							sx={{
								fontSize: "bold",
								color: "white",
							}}
						>
							<img
								src="/icons/ethlog.svg"
								alt="eth"
								style={{ height: "20px", marginRight: "3px" }}
							/>
							0.2
						</Typography>
						<IconButton sx={{ color: "white" }} aria-label={`star`}>
							<StarBorderIcon />
						</IconButton>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
}
