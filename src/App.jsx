import { lazy, Suspense, useEffect } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { useDispatch } from 'react-redux';

import { fetchBaseCurrency } from './redux/operations';
import { setBaseCurrency } from './redux/currencySlice';

const HomePage = lazy(() => import('./pages/Home'));
const RatesPage = lazy(() => import('./pages/Rates'));

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      dispatch(fetchBaseCurrency(pos.coords));
    }

    function error() {
      dispatch(setBaseCurrency('USD'));
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispatch]);

  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rates" element={<RatesPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </>
  );
};
