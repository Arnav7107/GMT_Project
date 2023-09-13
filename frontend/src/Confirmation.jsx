// import React from "react";
// import { useLocation } from "react-router-dom";

// function Confirmation() {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const selectedDateTime = queryParams.get("datetime");

//   return (
//     <div>
//       <h2>Appointment Confirmation</h2>
//       <p>Your appointment has been successfully booked for:</p>
//       <br/>
//       <p>{selectedDateTime}</p>
//       {/* You can add more details or information here */}
//     </div>
//   );
// }

// export default Confirmation;

import React from "react";
import { useLocation } from "react-router-dom";

function Confirmation() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get("date");
  const selectedTime = queryParams.get("time");

  return (
    <div>
      <h2>Appointment Confirmation</h2>
      <p>Your appointment has been successfully booked for:</p>
      <p>Date: {selectedDate}</p>
      <p>Time: {selectedTime}</p>
      {/* You can add more details or information here */}
    </div>
  );
}

export default Confirmation;
