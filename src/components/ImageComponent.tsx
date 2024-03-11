import React from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';

interface ImageProps {
  src: string;
  alt: string;
}

const ImageComponent: React.FC<ImageProps> = ({ src, alt }) => {
  
  return (
    <Grid item xs={8} style={{padding:"12px 0px"}}>
       <Card style={{backgroundColor:"#1976d2",height:"240px"}}><img style={{width:"100%",height:"240px",objectFit:"fill"}} src={src} alt={alt} />
       </Card></Grid>);
};

export default ImageComponent;
