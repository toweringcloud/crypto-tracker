import ApexChart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";

import { fetchCoinHistory } from "../api";

interface IHistorical {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}
interface ChartProps {
	coinId: string;
}

function Chart({ coinId }: ChartProps) {
	const { isLoading, data } = useQuery<IHistorical[]>({
		queryKey: ["ohlcv", coinId],
		queryFn: () => fetchCoinHistory(coinId),
	});
	let interval = 0;

	return (
		<div>
			{isLoading || data === null ? (
				"Loading chart..."
			) : (
				<ApexChart
					type="candlestick"
					series={[
						{
							name: "Price",
							data:
								data && Array.isArray(data)
									? data.map((price) => {
											let d = new Date();
											d.setDate(d.getDate() - interval++);
											return {
												x: d,
												y: [
													price.open,
													price.high,
													price.low,
													price.close,
												],
											};
									  })
									: [],
						},
					]}
					options={{
						theme: {
							mode: "dark",
						},
						chart: {
							type: "candlestick",
							height: 300,
							width: 500,
							toolbar: {
								show: false,
							},
							background: "transparent",
						},
						grid: { show: false },
						stroke: {
							curve: "smooth",
							width: 4,
						},
						yaxis: {
							show: false,
						},
						xaxis: {
							axisBorder: { show: false },
							axisTicks: { show: false },
							labels: { show: false },
							type: "datetime",
							categories:
								data && Array.isArray(data)
									? data.map((price) => price.close)
									: [],
						},
						fill: {
							type: "gradient",
							gradient: {
								gradientToColors: ["#0be881"],
								stops: [0, 100],
							},
						},
						colors: ["#0fbcf9"],
						tooltip: {
							y: {
								formatter: (value) => `$${value.toFixed(2)}`,
							},
						},
					}}
				/>
			)}
		</div>
	);
}
export default Chart;
