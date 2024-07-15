// src/app/movie/[id]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Correct import for dynamic route
import axios from 'axios';
import Header from '../../Components/Header';
import ReactPlayer from 'react-player';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import styles from '../../styles/MovieDetail.module.css';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  category: string;
  release_date: string;
  cast: string[];
  video_url?: string; // Add this field to your movie data
}

const DEFAULT_VIDEO_URL = '/sample.mp4';

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
      <Container className={styles.container}>
        <Box className={styles.videoPlayerWrapper}>
          <ReactPlayer 
            url={movie.video_url ? `http://localhost:5000${movie.video_url}` : DEFAULT_VIDEO_URL} 
            controls 
            width="100%" 
            height="auto" // Ensure the video player maintains its aspect ratio
          />
        </Box>
        <Paper className={styles.paper}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} className={styles.posterContainer}>
              <img src={movie.poster_path} alt={movie.title} className={styles.poster} />
            </Grid>
            <Grid item xs={12} sm={6} className={styles.detailsContainer}>
              <Box className={styles.textContainer}>
                <Typography variant="h3" className={styles.title}>
                  {movie.title}
                </Typography>
                <Typography variant="h5" className={styles.category}>
                  {movie.category}
                </Typography>
                <Typography variant="body1" className={styles.overview}>
                  {movie.overview}
                </Typography>
                <Typography variant="h6" className={styles.releaseDate}>
                  Release Date: {movie.release_date}
                </Typography>
                <Typography variant="h6" className={styles.castTitle}>
                  Cast:
                </Typography>
                <ul className={styles.castList}>
                  {movie.cast.map((actor, index) => (
                    <li key={index} className={styles.castItem}>
                      {actor}
                    </li>
                  ))}
                </ul>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default MovieDetail;
