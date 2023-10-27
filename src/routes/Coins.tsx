import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import { fetchCoins } from "../api";

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

const CoinsList = styled.ul``;
const Coin = styled.li`
	font-size: 24px;
	font-weight: 600;
	background-color: white;
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
const Icon = styled.img`
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
								<Icon
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
