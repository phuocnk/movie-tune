import { Grid, Typography, Select, MenuItem } from '@mui/material'

interface OptionProps {
  value: string
  label: string
}

interface CarouselHeaderProps {
  title: string
  selectValue: string
  options?: OptionProps[]
  onSelect?: (data: string) => void
}

const CarouselHeader = ({ title, selectValue, onSelect, options }: CarouselHeaderProps) => {
  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='flex-start' mb={2}>
      <Grid item>
        <Typography variant='h5' gutterBottom>
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <Select
          size='small'
          id='select-standard'
          value={selectValue}
          defaultValue={options?.[0].value || ''}
          onChange={(e) => onSelect && onSelect(e.target.value)}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {options?.map((item: OptionProps) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  )
}

export default CarouselHeader
