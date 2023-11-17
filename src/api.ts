const BASE_URL1 = `https://api.coinpaprika.com/v1`;
const BASE_URL2 = `https://ohlcv-api.nomadcoders.workers.dev`;

export function fetchCoins() {
	return fetch(`${BASE_URL1}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
	return fetch(`${BASE_URL1}/coins/${coinId}`).then((response) =>
		response.json()
	);
}

export function fetchCoinTickers(coinId: string) {
	return fetch(`${BASE_URL1}/tickers/${coinId}`).then((response) =>
		response.json()
	);
}

export function fetchCoinHistory(coinId: string) {
	const endDate = Math.floor(Date.now() / 1000);
	const startDate = endDate - 60 * 60 * 24 * 7 * 2;
	return fetch(
		`${BASE_URL2}?coinId=${coinId}&start=${startDate}&end=${endDate}`
	)
		.then((response) => response.json())
		.catch((ex) => {
			console.log(ex);
			return null;
		});
}
