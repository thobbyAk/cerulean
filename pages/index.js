import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import NftCard from "../components/NftCard";
import axios from "axios";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "../components/Footer";

export default function Home() {
	//sets value of loader component to false on pageload
	const [loading, setLoading] = useState(false);
	//sets default of the url for the fetch nft collection  api
	const [url] = useState(
		"https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=200&include_orders=false"
	);
	//sets default value for nft collection data
	const [nftData, setNftData] = useState([]);
	//sets default boolean value for nft data availability
	const [startDate, setStartDate] = React.useState(null);
	const [openStart, setOpenStart] = React.useState(false);
	const [endDate, setEndDate] = React.useState(null);
	const [openEnd, setOpenEnd] = React.useState(false);

	const getNftCollections = async () => {
		setLoading(true);
		await axios
			.get(url)
			.then((response) => {
				if (response) {
					filterNftsWithoutnames(response?.data?.assets);
				}
			})
			.catch(function (error) {
				if (error.response) {
				}
			});
	};

	const filterNftsWithoutnames = async (data) => {
		const newArray = await data.filter(function (currentElement) {
			return currentElement.name !== null;
		});

		setNftData(newArray);
		setLoading(false);
	};
	const searchNft = async (event) => {
		setLoading(true);
		if (event.key === "Enter") {
			console.log("response searching", event.target.value);
			if (event.target.value !== "") {
				searchExistingNftData(event.target.value);
			}
		}
	};

	const searchExistingNftData = async (value) => {
		const searchArray = [];
		const searchResult = nftData.find((element) => element.name === value);
		console.log("searchf", searchResult);
		if (searchResult) {
			searchArray.push(searchResult);

			setNftData(searchArray);
			setLoading(false);
		} else {
			setNftData([]);
			setLoading(false);
		}
	};

	const filterAssets = async () => {
		setLoading(true);

		const filteredData = await nftData.filter((element) => {
			var date = new Date(element?.collection?.created_date);
			console.log("elementDate", new Date(date));

			return date >= startDate && date <= endDate;
		});
		setNftData(filteredData);
		setLoading(false);
	};

	useEffect(() => {
		getNftCollections();
	}, []);

	return (
		<>
			<Header searchNft={searchNft} />
			<Box sx={{ p: 4, background: "#000000", minHeight: "100vh" }}>
				<Grid container spacing={{ xs: 2, md: 2 }}>
					<Grid item xs={12} md={2}>
						<Box
							sx={{
								border: "1px solid white",
								width: "100%",
								borderRadius: "8px",
								p: 2,
							}}
						>
							<Typography sx={{ color: "#ffffff" }}>Filters</Typography>
							<Typography
								sx={{
									mt: 3,
									mb: 1,
									color: "#ffffff",
								}}
							>
								Date
							</Typography>

							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									desktopModeMediaQuery=""
									autoOk={true}
									open={openStart}
									onOpen={() => setOpenStart(true)}
									allowSameDateSelection={true}
									label="From"
									views={["day"]}
									value={startDate || undefined}
									onChange={(newValue) => {
										setStartDate(newValue);
										setOpenStart(false);
									}}
									PopperProps={{
										disablePortal: true,
									}}
									PaperProps={{
										sx: {
											border: "1px solid #3E4042",
											borderRadius: (theme) => Number(theme.shape.borderRadius) / 2,
											"&& .Mui-selected": {
												backgroundColor: (theme) => theme.palette.primary.main,
												"&, & .MuiList-root": {
													color: "rgb(217, 217, 217)",
												},
											},
											"&& .Mui-selected:hover": {
												backgroundColor: (theme) => theme.palette.primary.dark,
											},
											"& .MuiPaper-root": {
												color: "rgb(110, 118, 125)",
											},
											"&& .MuiPickersDay-today": {
												borderColor: "rgb(217, 217, 217)",
											},
											svg: {
												color: "rgb(217, 217, 217)",
											},
											button: {
												color: "rgb(217, 217, 217)",
												backgroundColor: "transparent",
												":hover": {
													backgroundColor: "rgba(255,255,255,0.1)",
													color: "rgb(217, 217, 217)",
												},
												":disabled": {
													color: "rgb(110, 118, 125)",
												},
											},
											span: {
												color: "rgb(217, 217, 217)",
											},
											bgcolor: "#000000",
											color: "rgb(217, 217, 217)",
										},
									}}
									inputFormat="MMM d, Y"
									InputAdornmentProps={{
										position: "start",
									}}
									OpenPickerButtonProps={{ disableRipple: true }}
									renderInput={(params) => (
										<TextField
											fullWidth
											{...params}
											onClick={(e) => setOpenStart(true)}
											sx={{
												input: {
													color: "rgb(217, 217, 217)",
												},
												label: {
													color: "#ffffff",
												},
												"& .MuiOutlinedInput-root": {
													"& fieldset": {
														borderColor: "rgb(110, 118, 125)",
													},
													"&:hover fieldset": {
														borderColor: (theme) => theme.palette.primary.main,
													},

													"& svg": {
														color: "rgb(217, 217, 217)",
													},
													"&:hover button": {
														backgroundColor: "transparent",
													},
												},
											}}
											InputLabelProps={{ shrink: true }}
											helperText={null}
										/>
									)}
								/>
							</LocalizationProvider>

							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									desktopModeMediaQuery=""
									autoOk={true}
									open={openEnd}
									onOpen={() => setOpenEnd(true)}
									allowSameDateSelection={true}
									label="To"
									views={["day"]}
									value={endDate || undefined}
									onChange={(newValue) => {
										setEndDate(newValue);
										setOpenEnd(false);
									}}
									minDate={startDate}
									PopperProps={{
										disablePortal: true,
									}}
									PaperProps={{
										sx: {
											border: "1px solid #3E4042",
											borderRadius: (theme) => Number(theme.shape.borderRadius) / 2,
											"&& .Mui-selected": {
												backgroundColor: (theme) => theme.palette.primary.main,
												"&, & .MuiList-root": {
													color: "rgb(217, 217, 217)",
												},
											},
											"&& .Mui-selected:hover": {
												backgroundColor: (theme) => theme.palette.primary.dark,
											},
											"& .MuiPaper-root": {
												color: "rgb(110, 118, 125)",
											},
											"&& .MuiPickersDay-today": {
												borderColor: "rgb(217, 217, 217)",
											},
											svg: {
												color: "rgb(217, 217, 217)",
											},
											button: {
												color: "rgb(217, 217, 217)",
												backgroundColor: "transparent",
												":hover": {
													backgroundColor: "rgba(255,255,255,0.1)",
													color: "rgb(217, 217, 217)",
												},
												":disabled": {
													color: "rgb(110, 118, 125)",
												},
											},
											span: {
												color: "rgb(217, 217, 217)",
											},
											bgcolor: "#000000",
											color: "rgb(217, 217, 217)",
										},
									}}
									inputFormat="MMM d, Y"
									InputAdornmentProps={{
										position: "start",
									}}
									OpenPickerButtonProps={{ disableRipple: true }}
									renderInput={(params) => (
										<TextField
											fullWidth
											{...params}
											onClick={(e) => setOpenEnd(true)}
											sx={{
												mt: 3,
												input: {
													color: "rgb(217, 217, 217)",
												},
												label: {
													color: "#ffffff",
												},
												"& .MuiOutlinedInput-root": {
													"& fieldset": {
														borderColor: "rgb(110, 118, 125)",
													},
													"&:hover fieldset": {
														borderColor: (theme) => theme.palette.primary.main,
													},

													"& svg": {
														color: "rgb(217, 217, 217)",
													},
													"&:hover button": {
														backgroundColor: "transparent",
													},
												},
											}}
											InputLabelProps={{ shrink: true }}
											helperText={null}
										/>
									)}
								/>
							</LocalizationProvider>

							<Button
								fullWidth
								variant="contained"
								sx={{
									mt: 3,
									textTransform: "none",
									background: "#04111d",
									borderRadius: "5px",
									":hover": {
										background: "#1f262e",
									},
								}}
								onClick={filterAssets}
							>
								Apply Filter
							</Button>
						</Box>
					</Grid>

					<Grid item xs={12} md={10}>
						{loading ? (
							<>
								<div
									style={{
										display: "flex",
										width: "100vw",
										height: "100vh",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<CircularProgress size={120} />
								</div>
							</>
						) : (
							<>
								{nftData?.length > 0 ? (
									<Box
										sx={{
											width: "100%",
											p: 2,
										}}
									>
										<Grid
											container
											spacing={{ xs: 2, md: 3 }}
											columns={{ xs: 4, sm: 8, md: 12 }}
										>
											{nftData.map((data) => {
												return (
													<Grid key={data.id} item xs={12} sm={4} md={3}>
														<NftCard assetData={data} />
													</Grid>
												);
											})}
										</Grid>
									</Box>
								) : (
									<>
										<Typography
											variant="h6"
											sx={{
												color: "#ffffff",
												textAlign: "center",
											}}
										>
											No Assets Available
										</Typography>
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<Button
												fullWidth
												variant="contained"
												sx={{
													width: "200px",
													mt: 3,
													textTransform: "none",
													background: "#04111d",
													borderRadius: "5px",
													":hover": {
														background: "#1f262e",
													},
												}}
												onClick={getNftCollections}
											>
												Reset
											</Button>
										</Box>
									</>
								)}
							</>
						)}
					</Grid>
				</Grid>
			</Box>
			<Footer />
		</>
	);
}
