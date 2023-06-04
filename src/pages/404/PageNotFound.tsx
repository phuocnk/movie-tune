import ContentWrapper from 'src/components/ContentWrapper'
import { Grid, Typography } from '@mui/material'

const PageNotFound = () => {
  return (
    <ContentWrapper>
      <Grid container direction='column' justifyContent='center' alignItems='center' mt={24}>
        <Grid item>
          <Typography variant='h1' gutterBottom sx={{ fontWeight: 900 }}>
            404
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='h6' gutterBottom>
            Page not found!
          </Typography>
        </Grid>
      </Grid>
    </ContentWrapper>
  )
}

export default PageNotFound
