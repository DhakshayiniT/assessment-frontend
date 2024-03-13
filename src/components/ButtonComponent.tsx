import Button from '@mui/material/Button';
import {Grid} from '@mui/material';
import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({ text, onClick,disabled }) => {
  return(
    <Grid item xs={12} style={{padding:"12px 0px"}}>
  <Button variant="contained" style={{width:"67%",height:"100px"}} onClick={onClick} disabled={disabled}>
    {text}</Button>
  </Grid>
  )
};

export default ButtonComponent;
