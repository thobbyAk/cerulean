export const shortenAddress = (address) => {
	if (!address) return "";
	if (address.startsWith("0x")) {
		if (address.length < 12) return address;
		return address.slice(0, 6) + "..." + address.slice(-4);
	}
	if (address.length < 10) return address;
	return address.slice(0, 4) + "..." + address.slice(-4);
};

export const shortenText = (text, length = 13) => {
	if (!text) return "";

	if (length > 7 && text.length > length) {
		return text.slice(0, length - 7) + "...";
	} else {
		return text;
	}
};

export const formatTo2Decimal = (number) => {
	return number.toFixed(2);
};
