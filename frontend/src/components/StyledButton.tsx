import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
  backgroundColor: 'rgba(7, 81, 65, 0.8)',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgb(2, 2, 2)',
  },
});

export default StyledButton;