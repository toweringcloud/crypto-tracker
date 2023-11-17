import { Helmet } from "react-helmet";
import {
	Switch,
	Route,
	useLocation,
	useParams,
	useRouteMatch,
} from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;
const Loader = styled.span`
	text-align: center;
	display: block;
`;

const Header = styled.header`
	height: 15vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Icon = styled.img`
	width: 50px;
	height: 50px;
	margin-right: 10px;
`;
const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;

const ActionBar = styled.div`
	height: 3vh;
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;
const HomeIcon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	margin-bottom: 5px;
	cursor: pointer;
	svg {
		width: 25px;
		fill: ${(props) => props.theme.accentColor};
	}
`;

const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 10px 20px;
	border-radius: 10px;
`;
const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 33%;
	color: white;
	span:first-child {
		font-size: 10px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
`;
const Description = styled.p`
	margin: 20px 0px;
`;

const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 25px 0px;
	gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 400;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 10px;
	color: ${(props) => (props.isActive ? props.theme.accentColor : "white")};
	a {
		padding: 7px 0px;
		display: block;
	}
`;

interface RouteParams {
	coinId: string;
}
interface RouteState {
	name: string;
	symbol: string;
}

interface IInfo {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
}
interface IPrice {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}

function Coin() {
	const chartMatch = useRouteMatch("/:coinId/chart");
	const priceMatch = useRouteMatch("/:coinId/price");
	const { coinId } = useParams<RouteParams>();
	const { state } = useLocation<RouteState>();

	const { isLoading: infoLoading, data: infoData } = useQuery<IInfo>({
		queryKey: ["info", coinId],
		queryFn: () => fetchCoinInfo(coinId),
	});
	const { isLoading: tickersLoading, data: tickersData } = useQuery<IPrice>({
		queryKey: ["tickers", coinId],
		queryFn: () => fetchCoinTickers(coinId),
	});
	const loading = infoLoading || tickersLoading;

	return (
		<Container>
			<Helmet>
				<title>
					{state?.name
						? state.name
						: loading
						? "Loading..."
						: infoData?.name}
				</title>
			</Helmet>
			<Header>
				<Icon
					src={`https://coinicons-api.vercel.app/api/icon/${
						state?.symbol || "no"
					}`}
				/>
				<Title>
					{state?.name
						? state.name
						: loading
						? "Loading..."
						: infoData?.name}
				</Title>
			</Header>
			<ActionBar>
				<Link to="/">
					<HomeIcon>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6"
						>
							<path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
							<path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
						</svg>
					</HomeIcon>
				</Link>
			</ActionBar>
			{loading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank:</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol:</span>
							<span>${infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Price:</span>
							<span>
								${tickersData?.quotes.USD.price.toFixed(3)}
							</span>
						</OverviewItem>
					</Overview>
					<Description>{infoData?.description}</Description>
					<Overview>
						<OverviewItem>
							<span>Total Suply:</span>
							<span>{tickersData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply:</span>
							<span>{tickersData?.max_supply}</span>
						</OverviewItem>
					</Overview>

					<Tabs>
						<Tab isActive={chartMatch !== null}>
							<Link
								to={{
									pathname: `/${coinId}/chart`,
									state: { symbol: state?.symbol },
								}}
							>
								Chart
							</Link>
						</Tab>
						<Tab isActive={priceMatch !== null}>
							<Link
								to={{
									pathname: `/${coinId}/price`,
									state: {
										quotes: tickersData?.quotes.USD,
										symbol: state?.symbol,
									},
								}}
							>
								Price
							</Link>
						</Tab>
					</Tabs>
					<Switch>
						<Route path={`/:coinId/chart`}>
							<Chart coinId={coinId} />
						</Route>
						<Route path={`/:coinId/price`}>
							<Price coinId={coinId} />
						</Route>
					</Switch>
				</>
			)}
		</Container>
	);
}
export default Coin;
