import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import MovieDetail from './pages/MovieDetail';
import MovieList from './pages/MovieList';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Search from './pages/Search';
import { useDispatch } from 'react-redux';
import { login } from './RTK/authSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      dispatch(login(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie-detail/:id" element={<MovieDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
