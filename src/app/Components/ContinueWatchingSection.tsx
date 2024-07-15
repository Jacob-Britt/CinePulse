// src/app/Components/ContinueWatchingSection.tsx
"use client";

import { Grid, Typography, Box, LinearProgress } from '@mui/material';
import MovieCard from './MovieCard';
import styles from '../styles/ContinueWatchingSection.module.css';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  category: string;
  progress: number;
}

interface ContinueWatchingSectionProps {
  movies: Movie[];
}

const ContinueWatchingSection: React.FC<ContinueWatchingSectionProps> = ({ movies }) => (
  <Box className={styles.continueWatchingSection}>
    <Typography variant="h4" gutterBottom className={styles.sectionTitle}>
      Continue Watching
    </Typography>
    <Grid container spacing={4} className={styles.movieGrid}>
      {movies.map((movie) => (
        <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
          <Box className={styles.movieCardWrapper}>
            <MovieCard movie={movie} />
            <LinearProgress variant="determinate" value={movie.progress} className={styles.progressBar} />
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default ContinueWatchingSection;