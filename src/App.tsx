import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import MovieDetail from './pages/MovieDetail';
import MovieList from './pages/MovieList';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Search from './pages/Search';
import { AuthProvider } from './contexts/AuthContext';
import AuthCallback from './components/AuthCallback';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie-detail/:id" element={<MovieDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
