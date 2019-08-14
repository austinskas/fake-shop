import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import {
  Products,
  PageNotFound,
  Cart,
  Favorites,
  SingleProduct
} from "./pages";
import { Layout, BackgroundColorProvider, ShopProvider } from "./components";
import { useFetch } from "./hooks";

import { ROUTES } from "../constants";

function App() {
  return (
    <ShopProvider>
      <BackgroundColorProvider value="purple">
        <Router>
          <Layout>
            <Switch>
              <Route path={ROUTES.defaultPage} exact component={Products} />
              )} />
              <Route path={ROUTES.cart} exact component={Cart} />
              <Route path={ROUTES.favorites} exact component={Favorites} />
              )} />
              <Route
                path={ROUTES.product}
                exact
                component={SingleProduct}
                // render={props => {
                //   const { id } = props.match.params;
                //   const product = products.find(product => product.id === id);
                //
                //   return <SingleProduct {...props} product={product} />;
                // }}
              />
              <Redirect exact from={ROUTES.home} to={ROUTES.defaultPage} />
              <Route component={PageNotFound} />
            </Switch>
          </Layout>
        </Router>
      </BackgroundColorProvider>
    </ShopProvider>
  );
}

export default App;
