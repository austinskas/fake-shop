import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Products, PageNotFound, Cart, Favorites, SingleProduct } from './pages';
import { Layout } from './components';
import { useFetch } from './hooks';
import { toggleArrayItem } from './util';
import { ROUTES } from '../constants';

function onError() {
  return 'Ooops! Monkeys stole our products! 😱👟';
}

function App() {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const { loading: isLoading, products, error } = useFetch({
    onError,
    src: 'https://boiling-reaches-93648.herokuapp.com/food-shop/products',
    initialState: [],
    dataKey: 'products',
  });

  const toggleFavorite = id => {
    setFavorites(toggleArrayItem(favorites, id));
  };

  const addToCart = id => {
    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex > -1) {
      setCart(cart.map((item, i) => (i === itemIndex ? { ...item, count: item.count + 1 } : item)));
    } else {
      setCart([...cart, { id, count: 1 }]);
    }
  };

  const removeFromCart = id => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <Router>
      <Layout>
        <Switch>
          <Route
            path={ROUTES.defaultPage}
            exact
            render={() => (
              <Products
                toggleFavorite={toggleFavorite}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                products={products}
                cart={cart}
                favorites={favorites}
                isLoading={isLoading}
                error={error}
              />
            )}
          />
          <Route path={ROUTES.cart} exact render={() => <Cart cart={cart} products={products} />} />
          <Route
            path={ROUTES.favorites}
            exact
            render={() => (
              <Favorites
                toggleFavorite={toggleFavorite}
                removeFromCart={removeFromCart}
                addToCart={addToCart}
                favorites={favorites}
                products={products}
                cart={cart}
              />
            )}
          />
          <Route
            path={ROUTES.product}
            exact
            render={props => {
              const { id } = props.match.params;
              const product = products.find(product => product.id === id);

              return <SingleProduct {...props} product={product} isLoading={isLoading} />;
            }}
          />
          <Redirect exact from={ROUTES.home} to={ROUTES.defaultPage} />
          <Route component={PageNotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
