import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import { fetchCoinHistory } from "../api";

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 10px 20px;
	border-radius: 10px;
	margin-bottom: 5px;
`;
const PriceDate = styled.div`
	font-size: 12px;
	display: flex;
	flex-direction: column;
	gap: 5px;
	span:nth-child(1) {
		color: white;
	}
`;
const OpenClose = styled.div`
	font-size: 12px;
	display: flex;
	flex-direction: column;
	gap: 5px;
	span:nth-child(1) {
		color: white;
	}
`;
const HighLow = styled.div`
	font-size: 12px;
	display: flex;
	flex-direction: column;
	gap: 5px;
	span:nth-child(1) {
		color: white;
	}
`;

interface PriceProps {
	coinId: string;
}

interface IHistorical {
	id: number;
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

function convertDate(interval: number) {
	let d = new Date();
	d.setDate(d.getDate() - interval);
	return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function Price({ coinId }: PriceProps) {
	const { isLoading, data } = useQuery<IHistorical[]>({
		queryKey: ["ohlcv", coinId],
		queryFn: () => fetchCoinHistory(coinId),
	});
	let interval = 0;

	return (
		<div>
			{isLoading
				? "Loading grid..."
				: data?.map((item: IHistorical) => (
						<Wrapper>
							<PriceDate>
								<span>Open Date</span>
								<span>{convertDate(interval++)}</span>
							</PriceDate>
							<OpenClose>
								<span>Open / Close</span>
								<span>
									{item.open} / {item.close}
								</span>
							</OpenClose>
							<HighLow>
								<span>High / Low</span>
								<span>
									{item.high} / {item.low}
								</span>
							</HighLow>
						</Wrapper>
				  ))}
		</div>
	);
}
export default Price;
