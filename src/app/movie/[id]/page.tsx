// src/app/movie/[id]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Correct import for dynamic route
import axios from 'axios';
import Header from '../../Components/Header';
import { Container, Typography, Grid, Paper } from '@mui/material';
import styles from '../../styles/MovieDetail.module.css';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  category: string;
  release_date: string;
  cast: string[];
}

const MovieDetail: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching the movie details", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <Container className={styles.movieContainer}>
        <Paper className={styles.moviePaper}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <img src={movie.poster_path} alt={movie.title} className={styles.moviePoster} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h3" className={styles.movieTitle}>
                {movie.title}
              </Typography>
              <Typography variant="h5" className={styles.movieCategory}>
                {movie.category}
              </Typography>
              <Typography variant="body1" className={styles.movieOverview}>
                {movie.overview}
              </Typography>
              <Typography variant="h6" className={styles.movieReleaseDate}>
                Release Date: {movie.release_date}
              </Typography>
              <Typography variant="h6" className={styles.movieCastTitle}>
                Cast:
              </Typography>
              <ul className={styles.movieCastList}>
                {movie.cast.map((actor, index) => (
                  <li key={index} className={styles.movieCastItem}>
                    {actor}
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default MovieDetail;
