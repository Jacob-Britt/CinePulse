// src/app/Components/Header.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, InputBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem component={Link} href="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} href="/about">
          <ListItemText primary="About" />
        </ListItem>
        <ListItem component={Link} href="/contact">
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" className={styles.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            <Typography variant="h6" component="span" className={styles.link}>
              CinePulse
            </Typography>
          </Link>
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Link href="/" passHref>
            <Typography variant="body1" component="span" className={styles.link}>
              Home
            </Typography>
          </Link>
          <Link href="/about" passHref>
            <Typography variant="body1" component="span" className={styles.link}>
              About
            </Typography>
          </Link>
          <Link href="/contact" passHref>
            <Typography variant="body1" component="span" className={styles.link}>
              Contact
            </Typography>
          </Link>
        </Box>
        <div className={styles.search}>
          <div className={styles.searchIconWrapper}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: styles.styledInputBase,
              input: styles.styledInputBase,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </AppBar>
  );
}

export default Header;
