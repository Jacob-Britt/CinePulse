// src/app/Components/CategorySection.tsx
"use client";

import { Grid, Typography, Box } from '@mui/material';
import MovieCard from './MovieCard';
import styles from '../styles/CategorySection.module.css';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  category: string;
}

interface CategorySectionProps {
  category: string;
  movies: Movie[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, movies }) => (
  <Box className={styles.categorySection}>
    <Typography variant="h4" gutterBottom className={styles.categoryTitle}>
      {category}
    </Typography>
    <Grid container spacing={4} className={styles.movieGrid}>
      {movies.map((movie) => (
        <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default CategorySection;
