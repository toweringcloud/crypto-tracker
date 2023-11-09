import { BrowserRouter, Route, Switch } from "react-router-dom";

import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router() {
	// const homepageTokens = process.env.PUBLIC_URL.split("/");
	// const subProjectName = homepageTokens[homepageTokens.length - 1];

	return (
		// <BrowserRouter basename={subProjectName}>
		<BrowserRouter>
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
