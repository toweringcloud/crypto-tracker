import { BrowserRouter, Route, Switch } from "react-router-dom";

import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router() {
	const projectName = import.meta.env.VITE_BASE_NAME;

	return (
		<BrowserRouter basename={projectName}>
			<Switch>
				<Route path="/:coinId">
					<Coin />
				</Route>
				<Route path="/">
					<Coins />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
export default Router;
