import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";

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
const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;
const ToggleIcon = styled.div`
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

const CoinsList = styled.ul``;
const Coin = styled.li`
	font-size: 24px;
	font-weight: 600;
	background-color: ${(props) => props.theme.cardBgColor};
	color: ${(props) => props.theme.bgColor};
	border-radius: 15px;
	margin-bottom: 10px;
	a {
		display: flex;
		align-items: center;
		padding: 10px;
		transition: color 0.2s ease-in;
	}
	&:hover {
		a {
			color: ${(props) => props.theme.accentColor};
		}
	}
`;
const SymbolIcon = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 10px;
`;

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

function Coins() {
	// global client state management using recoil
	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

	// global server state management using react-query
	const { isLoading, data } = useQuery<ICoin[]>({
		queryKey: ["allCoins"],
		queryFn: fetchCoins,
	});

	return (
		<Container>
			<Helmet>
				<title>Crypto Tracker</title>
			</Helmet>
			<Header>
				<Title>Crypto Tracker</Title>
				<ToggleIcon onClick={toggleDarkAtom}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
						/>
					</svg>
				</ToggleIcon>
			</Header>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<CoinsList>
					{data?.slice(0, 100).map((coin) => (
						<Coin key={coin.id}>
							<Link
								to={{
									pathname: `/${coin.id}`,
									state: {
										name: coin.name,
										symbol: coin.symbol.toLowerCase(),
									},
								}}
							>
								<SymbolIcon
									src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
								/>
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinsList>
			)}
		</Container>
	);
}
export default Coins;
