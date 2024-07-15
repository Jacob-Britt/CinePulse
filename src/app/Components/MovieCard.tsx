// src/app/Components/MovieCard.tsx
"use client";

import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';
import styles from '../styles/MovieCard.module.css';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
  <Card className={styles.card} onClick={() => window.location.href = `/movie/${movie.id}`}>
    <CardMedia
      className={styles.media}
      component="img"
      image={movie.poster_path}
      alt={movie.title}
    />
    <CardContent className={styles.content}>
      <Typography variant="h5" gutterBottom className={styles.title}>
        {movie.title}
      </Typography>
      <Typography variant="body2" className={styles.overview}>
        {movie.overview}
      </Typography>
    </CardContent>
  </Card>
);

export default MovieCard;