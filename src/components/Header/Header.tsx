import { styled, alpha } from '@mui/material/styles'
import { Link, useNavigate } from 'react-router-dom'

import {
  Tooltip,
  Slide,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  useScrollTrigger
} from '@mui/material'
import MovieFilterIcon from '@mui/icons-material/MovieFilter'
import SearchIcon from '@mui/icons-material/Search'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'
import { KeyboardEvent, useState } from 'react'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
  children: React.ReactElement
}

function HideOnScroll(props: Props) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    target: window ? window() : undefined
  })

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  )
}

export default function SearchAppBar() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const searchQueryHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query.length > 0) {
      event.preventDefault()
      event?.currentTarget?.blur()
      navigate(`/search/${query}`)
      setQuery('')
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <Link to='/'>
              <IconButton size='large' edge='start' color='warning' aria-label='logo' sx={{ mr: 2 }}>
                <MovieFilterIcon />
              </IconButton>
            </Link>
            <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Movie Tune
            </Typography>

            <Search sx={{ mr: 2 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
            </Search>
            <Tooltip title='Movie' placement='bottom'>
              <Link to='/explore/movie'>
                <IconButton size='large' edge='start' aria-label='logo' sx={{ mr: 2 }}>
                  <LocalMoviesIcon />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title='TV Show' placement='bottom'>
              <Link to='/explore/tv'>
                <IconButton size='large' edge='start' aria-label='logo' sx={{ mr: 2 }}>
                  <LiveTvIcon />
                </IconButton>
              </Link>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Box>
  )
}
