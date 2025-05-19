import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const dob = document.getElementById("dob").value;

    if (!username) {
      alert("Please fill out the username field.");
      return;
    }
    if (!email) {
      alert("Please fill out the email field.");
      return;
    }
    if (!phone) {
      alert("Please fill out the phone number field.");
      return;
    }
    if (!dob) {
      alert("Please fill out the date of birth field.");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const enteredDate = new Date(dob);
    const currentDate = new Date();
    if (enteredDate > currentDate) {
      alert("Invalid date of birth. Date cannot be in the future.");
      return;
    }

    // All validations passed
    setShowModal(false);
  };

  return (
    <>
      <h1>User Details Modal</h1>
      <button onClick={() => setShowModal(true)}>Open Form</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>
            <h1>Fill details</h1>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" />

            <label htmlFor="email">Email address:</label>
            <input type="email" id="email" />

            <label htmlFor="phone">Phone Number:</label>
            <input type="number" id="phone" />

            <label htmlFor="dob">Date of birth:</label>
            <input type="date" id="dob" />

            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

function Modal({ children, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        {children}
      </div>
    </div>
  );
}

export default App;
