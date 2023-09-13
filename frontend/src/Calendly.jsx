// import React from "react";
// import { InlineWidget } from "react-calendly";
// import DatePicker from 'react-datepicker'
// import "./index.css";
// const Calendly = () => {
//   return (
//     <div className="App">
//       {/* <InlineWidget url="https://calendly.com/your_scheduling_page" /> */}
      

// <DatePicker className="align-items-center justify-content-center"
//     controls={['calendar', 'timegrid']}
//     touchUi={true}
// />


//     </div>
//   );
// };
// export default Calendly;

import { useEffect, useState, useContext } from "react";
import { AppointmentPicker } from "react-appointment-picker";

import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";

import { Container, Row, Col } from "react-bootstrap";
import { getDay } from "date-fns";

import Sidebar from './components/Sidebar';

function Calendly() {
  const [lodaing, setLoading] = useState(false);
  const [date, setDate] = useState(new Date(new Date().setHours(8, 0, 0, 0)));
  const [days, setDays] = useState([[]]);
  const [appointment, setAppointment] = useState("");

  const modifiers = {
    disabled: (date) => getDay(date) === 0 || getDay(date) === 7 // Disables Saturdays
  };

  useEffect(() => {
    if (date != null) {
      console.log("getting appointments");
      const days = [
        [
          {
            id: 1,
            number: 1,
            isReserved: true
          },
          {
            id: 2,
            number: 2,
            isReserved: true
          },
          {
            id: 3,
            number: 3
          },
          {
            id: 4,
            number: 4,
            isSelected: true
          },
          {
            id: 5,
            number: 5
          }
        ]
      ];
      setAppointment(
        <AppointmentPicker
          addAppointmentCallback={addAppointmentCallbackContinuousCase}
          removeAppointmentCallback={removeAppointmentCallbackContinuousCase}
          initialDay={date}
          days={days}
          maxReservableAppointments={1}
          visible
          selectedByDefault
          unitTime={3600000}
          loading={lodaing}
          continuous
        />
      );
    }
  }, [date, lodaing]);

  // useEffect(() => {
  //   console.log(appointments)
  //   if (appointments.length > 0) {
  //     setDays(appointments)
  //   }
  // }, [appointments])

  async function addAppointmentCallbackContinuousCase({
    addedAppointment: { day, number, time, id },
    addCb,
    removedAppointment: params,
    removeCb
  }) {
    setLoading(true);
    if (removeCb) {
      //await removeAppointment({ params });
      console.log(
        `Removed appointment ${params.number}, day ${params.day}, time ${params.time}, id ${params.id}`
      );
      removeCb(params.day, params.number);
    }

    //await addAppointment({ id, number, day, time });
    //console.log(error);
    addCb(day, number, time, id);
    setLoading(false);
  }

  async function removeAppointmentCallbackContinuousCase(
    { day, number, time, id },
    removeCb
  ) {
    setLoading(true);
    let params = { id, number, day, time };
    //await removeAppointment({ params });
    console.log(
      `Removed appointment ${number}, day ${day}, time ${time}, id ${id}`
    );
    removeCb(day, number);
    setLoading(false);
  }

  return (
    <>
    {/* <Sidebar />
    
    </> */}
    <div className='main' >
    <div className='layout' >
    <div className='vh-100'><Sidebar /></div>
        <div className='content' >
            <div className='body flex-column'>
            <h3 className="p-3">Book an Appointment Now!</h3>
              <div className="p-4">
                
            <Container fluid>
      <Row>
        <Col xs={7} md={6}>
          <DatePickerCalendar
            date={date}
            onDateChange={setDate}
            modifiers={modifiers}
          />
        </Col>
        <Col xs={5} md={6}>
          {appointment}
        </Col>
      </Row>
    </Container>
            </div>
        </div>
        </div>
        
    
    </div>
    </div>
    </>
  );
}

export default Calendly;
