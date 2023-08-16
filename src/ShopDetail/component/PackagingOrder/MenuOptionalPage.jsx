import React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MenuOptionalPage(props) {
  const [open, setOpen] = React.useState(true);
  const selectedMenu= props.selectedMenu;

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: 'white' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="black"
              onClick={handleClose}
              aria-label="뒤로 가기"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, color: 'black' }} variant="h6" component="div">
              {selectedMenu?.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {selectedMenu?.options.map((option, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <Typography variant="subtitle1">{option.title}</Typography>
              </ListItem>
              {option.type === 'radio' ? (
                <RadioGroup>
                  {option.choices.map((choice, idx) => (
                    <FormControlLabel
                      key={idx}
                      value={choice.name}
                      control={<Radio />}
                      label={`${choice.name} + ${choice.price}원`}
                    />
                  ))}
                </RadioGroup>
              ) : (
                option.choices.map((choice, idx) => (
                  <FormControlLabel
                    key={idx}
                    control={<Checkbox />}
                    label={`${choice.name} + ${choice.price}원`}
                  />
                ))
              )}
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#FF745A',
            width: '80vw',
            height: '48px',
            color: 'white',
            fontSize: '17px',
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          onClick={handleClose}
        >
          메뉴 담기
        </Button>
      </Dialog>
    </div>
  );
}
