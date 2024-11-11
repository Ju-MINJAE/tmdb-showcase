import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import MovieDetail from './pages/MovieDetail';
import MovieList from './pages/MovieList';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Search from './pages/Search';

const App: React.FC = () => {
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
