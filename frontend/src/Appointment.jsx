import { useEffect, useState, useContext } from "react";
import { AppointmentPicker } from "react-appointment-picker";

import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";

import { useNavigate } from "react-router-dom";
import axios from 'axios'


import { Container, Row, Col } from "react-bootstrap";
import { getDay } from "date-fns";

import Sidebar from './components/Sidebar';
import ConfirmationModal from './ConfirmationModal'; // Import your custom modal

function Appointment() {
  const [lodaing, setLoading] = useState(false);
  const [date, setDate] = useState(new Date(new Date().setHours(8, 0, 0, 0)));
  const [days, setDays] = useState([[]]);
  const [time,setTime] = useState("");
  const [appointment, setAppointment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sent,setSent] = useState(false)
  const [text,setText] = useState("");
  const [auth,setAuth] = useState(false);
  const [name,seName] = useState('');
  const [message,setMessage] = useState('');

  const modifiers = {
    disabled: (date) => getDay(date) === 0 || getDay(date) === 7 // Disables Saturdays
  };

  axios.defaults.withCredentials = true;
    useEffect(() =>{
        axios.get('http://localhost:4000/')
        .then( res =>{
            if(res.data.Status === 'Success')
            {
                setAuth(true);
                seName(res.data.name);
            }else{
                setAuth(false);
                setMessage(res.data.Message);
            }
        })
    },[])

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

  const handleSend = async() =>{
    setSent(true)
    try {
      await axios.post("http://localhost:4000/send_mail",{
        name
      })
    } catch (error) {
      console.log(error);
    }
  }
 
  const navigate = useNavigate();
    // Function to handle the button click and open the modal
    const handleButtonClick = async () => {
      console.log("Button is Clicked");
      setIsModalOpen(true);
      setSent(true)
    try {
      await axios.post("http://localhost:4000/send_mail",{
        name
      })
    } catch (error) {
      console.log(error);
    }
      // console.log("isModalOpen:", isModalOpen);
      // const selectedDateTime = date; Replace this with the selected date and time
      // const selectedTime = ;
      const selectedDate = date.toISOString().split("T")[0]; // Extract date
    const selectedTime = date.toISOString().split("T")[1].slice(0, 5); // Extract time
    console.log("Selected Date:", selectedDate);
  console.log("Selected Time:", selectedTime);

    // Use the history.push() method to navigate to the confirmation route with URL parameters
    navigate(`/confirmation?date=${selectedDate}&time=${selectedTime}`)
    };
    useEffect(() => {
      console.log("isModalOpen:", isModalOpen); // Log the state change
    }, [isModalOpen]);
    
    // Function to handle confirmation in the modal
    const handleConfirm = () => {
      console.log("Appointment booked for:", date);
  
      // Replace this with your actual booking logic
      // For example, make an API request to book the appointment
      // You may need to update your state or trigger a booking process here
  
      setAppointment("Appointment booked successfully!");
      setIsModalOpen(false); // Close the modal after confirmation
    };
  
    // Function to handle cancelation in the modal
    const handleCancel = () => {
      setIsModalOpen(false); // Close the modal if canceled
      console.log("Appointment not booked.");
    };

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

    addCb(day, number, time, id);
    setLoading(false);
  }

  async function removeAppointmentCallbackContinuousCase(
    { day, number, time, id },
    removeCb
  ) {
    setLoading(true);
    let params = { id, number, day, time };
    
    console.log(
      `Removed appointment ${number}, day ${day}, time ${time}, id ${id}`
    );
    removeCb(day, number);
    setLoading(false);
  }

  const selectedDate = date.toISOString().split("T")[0]; // Extract date
    const selectedTime = date.toISOString().split("T")[1].slice(0, 5); // Extract time
  return (
    <>
   { !sent ?(
    <div className='main' >
    <div className='layout' >
    <div className='vh-100'><Sidebar /></div>
        <div className='content' >
            <div className='body flex-column'>
            <h3 className="p-3">Book an Appointment Now!</h3>
            <button onClick={handleButtonClick}>Book Appointment</button>
              <div className="p-3 flex-row">
                <div className="flex-row">
            <Container fluid>
      <Row>
        <Col xs={7} md={6}>
          <DatePickerCalendar
            date={date}
            time = {time}
            onTimeChange = {setTime}
            onDateChange={setDate}
            modifiers={modifiers}
          />
        </Col>
        <Col xs={5} md={6}>
          {appointment}
        </Col>
      </Row>
    </Container>
    {/* <button onClick={handleButtonClick} className="btn btn-primary">Book Now</button> */}
    {/* {appointment && <p>{appointment}</p>} */}

      {/* Render the confirmation modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        message={`Are you sure you want to book an appointment for ${date}?`}
        onConfirm={handleConfirm}
        onCancel={handleCancel} />
    </div>
            </div>
        </div>
        </div>
        
    
    </div>
    </div>
    
    ) :(
      navigate(`/confirmation?date=${selectedDate}&time=${selectedTime}`)
    
    )}
    </>
  );
}

export default Appointment;