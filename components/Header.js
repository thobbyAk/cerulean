import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { ethers, providers } from "ethers";
import tokenABI from "../lib/tokenABI.json";
import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { shortenAddress } from "../lib/utilts";
import styles from "../styles/Home.module.css";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

const providerOptions = {};

//usdc contract address on Ethereum mainet
const tokenAddress = {
	address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
	token: "USDC",
};
export default function Header({ searchNft }) {
	const isMobile = useMediaQuery("(max-width:599px)");

	// walletConnected keep track of whether the user's wallet is connected or not
	const [walletConnected, setWalletConnected] = useState(false);
	const [account, setAccount] = useState("");
	const [mobileView, showMobileView] = useState(false);
	const [balanceModal, setBalanceModal] = useState(false);

	const [ethBalance, setEthBalance] = useState(0);
	const [usdcBalance, setUsdcBalance] = useState(0);

	const [web3Modal, setWeb3Modal] = useState(null);
	// Empty web3 instance
	const web3 = new Web3(
		new Web3.providers.HttpProvider(
			"https://mainnet.infura.io/v3/5a168b18189b4b72a9dd20ab26620b43"
		)
	);
	const [anchorEl, setAnchorEl] = useState(null);

	useEffect(() => {
		const providerOptions = {};

		const newWeb3Modal = new Web3Modal({
			cacheProvider: true,
			network: "mumbai",
			providerOptions,
		});

		setWeb3Modal(newWeb3Modal);
	}, []);

	async function connectWallet() {
		const provider = await web3Modal.connect();
		addListeners(provider);
		const ethersProvider = new providers.Web3Provider(provider);
		const userAddress = await ethersProvider.getSigner().getAddress();
		const userBalance = await ethersProvider.getBalance(userAddress);
		console.log("userBalance", ethers.utils.formatUnits(userBalance));
		setEthBalance(web3.utils.fromWei(userBalance.toString()));
		setAccount(userAddress);
		getUsdcBalance(userAddress);
		setWalletConnected(true);
	}

	const getUsdcBalance = async (address) => {
		const tokenInstance = new web3.eth.Contract(
			tokenABI.balanceOfABI,
			tokenAddress.address
		);
		console.log("token Instance", tokenInstance);
		const balance = await tokenInstance.methods.balanceOf(address).call();
		console.log("balance Instance", balance);

		setUsdcBalance(balance);
	};

	useEffect(() => {
		// connect automatically and without a popup if user is already connected
		if (web3Modal && web3Modal.cachedProvider) {
			connectWallet();
		}
	}, [web3Modal]);

	async function addListeners(web3ModalProvider) {
		web3ModalProvider.on("accountsChanged", (accounts) => {
			connectWallet();
		});

		// Subscribe to chainId change
		web3ModalProvider.on("chainChanged", (chainId) => {
			connectWallet();
		});
	}

	const handleClick = (event) => {
		if (anchorEl !== event.currentTarget) {
			setAnchorEl(event.currentTarget);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const disconnectWallet = async () => {
		await web3Modal.clearCachedProvider();

		handleClose();
		setWalletConnected(false);
	};

	const handleOpenMobileMenu = () => {
		if (mobileView) {
			showMobileView(false);
		} else {
			showMobileView(true);
		}
	};

	const modalStyle = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 320,
		bgcolor: "#04111d",
		borderRadius: "25px",
		boxShadow: 24,
		p: 4,
	};

	return (
		<>
			{/* Balance modal */}
			<Modal
				BackdropProps={{
					timeout: 500,
				}}
				closeAfterTransition
				onClose={() => {
					setBalanceModal(false);
				}}
				open={balanceModal}
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
			>
				<Box sx={modalStyle}>
					<div className={styles.modal_box}>
						<IconButton
							aria-label="close"
							onClick={() => {
								setBalanceModal(false);
							}}
							className={styles.close_button}
							sx={{
								":hover": {
									backgroundColor: "rgba(255,255,255,0.1)",
								},
							}}
						>
							<CloseIcon
								sx={{
									color: "rgb(217, 217, 217)",
								}}
							/>
						</IconButton>
						<div className={styles.modal_body}>
							<Typography
								variant="h5"
								sx={{
									color: "#ffffff",
								}}
							>
								Wallet Balance
							</Typography>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "flex-start",
								}}
							>
								<Typography
									sx={{
										textAlign: "left",
										color: "#ffffff",
									}}
									variant="body1"
								>
									ETH: {ethBalance}
								</Typography>
								<Typography
									sx={{
										textAlign: "left",
										color: "#ffffff",
									}}
									variant="body1"
								>
									USDC: {usdcBalance}
								</Typography>
							</Box>
						</div>
					</div>
				</Box>
			</Modal>
			<AppBar
				position="static"
				sx={{
					background: "#04111d",
				}}
			>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="/"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },

								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							Cerulean
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenMobileMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								flexGrow: 1,
							}}
						>
							<div className={styles.searchBar}>
								<div className={styles.searchIcon}>
									<SearchIcon />
								</div>
								<input
									onKeyPress={(event) => {
										searchNft(event);
									}}
									className={styles.searchInput}
									placeholder="Search Assets"
								/>
							</div>

							<Typography
								variant="h5"
								noWrap
								component="a"
								href=""
								sx={{
									ml: 3,
									alignItems: "center",
									display: { xs: "flex", md: "none" },
									fontFamily: "monospace",
									fontWeight: 700,
									letterSpacing: ".3rem",
									color: "inherit",
									textDecoration: "none",
								}}
							>
								CB
							</Typography>
						</Box>

						<Box
							sx={{
								display: { xs: "none", md: "flex" },
								flexGrow: 0,
							}}
						>
							{walletConnected ? (
								<>
									<Button
										aria-owns={anchorEl ? "simple-menu" : undefined}
										aria-haspopup="true"
										onClick={handleClick}
										onMouseOver={handleClick}
										sx={(theme) => ({
											[theme.breakpoints.down("md")]: {
												height: "36px",
												fontSize: "12px",
												padding: "8px 5px",
											},
											borderRadius: "64px",
											border: "1px solid #ffd602",
											background: "transparent",
											":hover": {
												background: "transparent",
											},
										})}
										variant="contained"
									>
										{shortenAddress(account)}
									</Button>
									<Menu
										PaperProps={{
											sx: {
												background: "#04111d",
											},
										}}
										id="simple-menu"
										anchorEl={anchorEl}
										open={Boolean(anchorEl)}
										onClose={handleClose}
										MenuListProps={{ onMouseLeave: handleClose }}
									>
										<MenuItem
											sx={{
												color: "#ffffff",
												borderRadius: "10px",
												":hover": {
													background: "#1f262e",
												},
											}}
											onClick={() => {
												// getUsdcBalance(account);
												setBalanceModal(true);
											}}
										>
											View Balance
										</MenuItem>
										<MenuItem
											sx={{
												color: "#ffffff",
												borderRadius: "10px",
												":hover": {
													background: "#1f262e",
												},
											}}
											onClick={disconnectWallet}
										>
											Disconnect
										</MenuItem>
									</Menu>
								</>
							) : (
								<>
									<Button
										onClick={connectWallet}
										sx={(theme) => ({
											[theme.breakpoints.down("md")]: {
												height: "36px",
												fontSize: "12px",
												padding: "8px 5px",
											},
											borderRadius: "64px",
											border: "1px solid #ffd602",
											background: "transparent",
											":hover": {
												background: "transparent",
											},
											textTransform: "none",
										})}
										variant="contained"
									>
										Connect to Wallet
									</Button>
								</>
							)}
						</Box>
					</Toolbar>
				</Container>
				{mobileView && isMobile && (
					<Container maxWidth="xl">
						<Toolbar
							sx={{
								display: "flex",
								justifyContent: "center",
							}}
							disableGutters
						>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
								}}
							>
								{walletConnected ? (
									<>
										<Button
											aria-owns={anchorEl ? "simple-menu" : undefined}
											aria-haspopup="true"
											onClick={handleClick}
											onMouseOver={handleClick}
											sx={(theme) => ({
												[theme.breakpoints.down("md")]: {
													fontSize: "12px",
													padding: " 6px 10px",
													width: "200px",
												},
												borderRadius: "64px",
												border: "1px solid #ffffff",
												background: "transparent",
												":hover": {
													background: "transparent",
												},
											})}
											variant="contained"
										>
											{shortenAddress(account)}
										</Button>
										<Menu
											PaperProps={{
												sx: {
													background: "#04111d",
												},
											}}
											id="simple-menu"
											anchorEl={anchorEl}
											open={Boolean(anchorEl)}
											onClose={handleClose}
											MenuListProps={{ onMouseLeave: handleClose }}
										>
											<MenuItem
												sx={{
													color: "#ffffff",
													borderRadius: "10px",
													":hover": {
														background: "#1f262e",
													},
												}}
												onClick={() => {
													setBalanceModal(true);
												}}
											>
												View Balance
											</MenuItem>
											<MenuItem
												sx={{
													color: "#ffffff",
													borderRadius: "10px",
													":hover": {
														background: "#1f262e",
													},
												}}
												onClick={disconnectWallet}
											>
												Disconnect
											</MenuItem>
										</Menu>
									</>
								) : (
									<>
										<Button
											onClick={connectWallet}
											sx={(theme) => ({
												[theme.breakpoints.down("md")]: {
													fontSize: "12px",
													padding: " 6px 10px",
													width: "200px",
												},
												borderRadius: "64px",
												border: "1px solid #ffffff",
												background: "transparent",
												textTransform: "none",
												":hover": {
													background: "transparent",
												},
											})}
											variant="contained"
										>
											Connect to Wallet
										</Button>
									</>
								)}
							</Box>
						</Toolbar>
					</Container>
				)}
			</AppBar>
		</>
	);
}
