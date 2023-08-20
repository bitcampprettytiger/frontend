import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:80', {
  path: '/lineup',
});

class ReservationSystem extends Component {
  state = {
    name: '',
    position: 1,
    reservations: [],
  };

  componentDidMount() {
    socket.on('updateReservations', (reservations) => {
      this.setState({
        reservations: reservations,
      });
    });
  }

  handleReservation = (e) => {
    e.preventDefault();
    const newReservation = {
      name: this.state.name,
      position: this.state.position,
    };
    socket.emit('newReservation', newReservation);
    this.setState({
      name: '',
      position: 1,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <h1>Line Reservation System</h1>
        <section className="reservation_list">
          {this.state.reservations.map((reservation, index) => (
            <div className="reservation_item" key={index}>
              <p className="username">{reservation.name}</p>
              <p className="position">위치: {reservation.position}</p>
            </div>
          ))}
        </section>
        <form className="reservation_form" onSubmit={this.handleReservation}>
          <div className="reservation_inputs">
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.name}
              name="name"
              placeholder="이름"
            />
            <input
              type="number"
              onChange={this.handleChange}
              value={this.state.position}
              name="position"
              placeholder="위치"
            />
          </div>
          <button className="reservation_button" type="submit">
            예약하기
          </button>
        </form>
      </div>
    );
  }
}

export default ReservationSystem;
