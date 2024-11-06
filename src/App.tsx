import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MovieDetail from './components/MovieDetail';
import MovieList from './components/MovieList';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/movie-detail/:id" element={<MovieDetail />} />
    </Routes>
  );
};

export default App;
