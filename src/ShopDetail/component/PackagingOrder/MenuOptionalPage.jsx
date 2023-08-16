import React, { useState } from 'react';
import {
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Divider,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MenuOptionalPage(props) {
  const [open, setOpen] = React.useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const selectedMenu = props.selectedMenu;

  const handleRadioChange = (optionIndex, event) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionIndex]: [{ name: event.target.value, price: event.target.dataset.price }],
    });
  };

  const handleCheckboxChange = (optionIndex, choiceIndex) => (event) => {
    const currentValues = selectedOptions[optionIndex] || [];
    const newValues = event.target.checked
      ? [...currentValues, { name: event.target.name, price: event.target.dataset.price }]
      : currentValues.filter((_, idx) => idx !== choiceIndex);

    setSelectedOptions({ ...selectedOptions, [optionIndex]: newValues });
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleAddMenu = () => {
    let totalPrice = selectedMenu.price;
    selectedOptions &&
      Object.keys(selectedOptions).forEach(
        (optionIndex) =>
          (totalPrice += selectedOptions[optionIndex].reduce(
            (acc, curr) => acc + parseInt(curr.price, 10),
            0
          ))
      );

    props.onMenuAdd({ ...selectedMenu, selectedOptions, totalPrice });
    handleClose();
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
        <List sx={{ paddingBottom: '80px' }}>
          {selectedMenu?.options.map((option, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <Typography variant="subtitle1">{option.title}</Typography>
              </ListItem>
              {option.type === 'radio' ? (
                <RadioGroup>
                  {option.choices.map((choice, choiceIndex) => (
                    <FormControlLabel
                      key={choiceIndex}
                      value={choice.name}
                      data-price={(choice.price)}
                      control={<Radio />}
                      label={`${choice.name} + ${choice.price}원`}
                      onChange={(event) => handleRadioChange(index, event)}
                    />
                  ))}
                </RadioGroup>
              ) : (
                <React.Fragment>
                  {option.choices.map((choice, choiceIndex) => (
                    <FormControlLabel
                      key={choiceIndex}
                      control={<Checkbox />}
                      name={choice.name}
                      data-price={(choice.price)}
                      label={`${choice.name} + ${choice.price}원`}
                      onChange={handleCheckboxChange(index, choiceIndex)}
                    />
                  ))}
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </List>
        <Divider />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#FF745A',
            width: '70vw',
            height: '48px',
            color: 'white',
            fontSize: '17px',
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
          onClick={handleAddMenu}
        >
          메뉴 담기
        </Button>
      </Dialog>
    </div>
  );
}
