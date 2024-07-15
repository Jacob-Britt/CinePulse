// src/app/page.tsx
"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Components/Header';
import CategorySection from './Components/CategorySection';
import ContinueWatchingSection from './Components/ContinueWatchingSection';
import { Container, TextField, Box } from '@mui/material';
import styles from './styles/Home.module.css';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  category: string;
  progress: number;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [continueWatching, setContinueWatching] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('http://localhost:5000/api/movies');
      setMovies(response.data);
    };
    const fetchContinueWatching = async () => {
      const response = await axios.get('http://localhost:5000/api/continue-watching');
      setContinueWatching(response.data);
    };
    fetchMovies();
    fetchContinueWatching();
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(filteredMovies.map(movie => movie.category)));

  return (
    <div>
      <Header />
      <Container className={styles.container}>
        <Box my={4}>
          <TextField
            label="Search Movies"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={e => setSearch(e.target.value)}
            className={styles.searchField}
          />
        </Box>
        {continueWatching.length > 0 && (
          <ContinueWatchingSection movies={continueWatching} />
        )}
        {categories.map(category => (
          <CategorySection
            key={category}
            category={category}
            movies={filteredMovies.filter(movie => movie.category === category)}
          />
        ))}
      </Container>
    </div>
  );
};

export default Home;