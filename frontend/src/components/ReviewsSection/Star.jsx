import React from 'react'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const Star = ({rating, size}) => {
  return (
    <div className="starRatingContainer">
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="text-feedback"
        value={rating}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
      />
      <Box sx={{ ml: 2 }}></Box>
    </Box>
    </div>
  )
}

export default Star
