import React, { useState } from 'react';

import Email_Icon from '../Assets/Email_Icon.svg';
import Phone_Icon from '../Assets/Phone_Icon.svg';
import Map_Icon from '../Assets/Map_Icon.svg';

const Contactus = () => {
  const [view, setView] = useState('map');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [help, setHelp] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1931.6541692735002!2d121.00929383875773!3d14.46697579650091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf003e7a18a7%3A0x7edcdef9c7a6fe8f!2sEVest%20Electric%20Car%20Dealership!5e0!3m2!1sen!2sus!4v1742559665692!5m2!1sen!2sus";
  const streetViewUrl = "https://www.google.com/maps/embed?pb=!4v1742559747935!6m8!1m7!1sKVLH7neWvG4OPoD8BJhBRg!2m2!1d14.4669793960152!2d121.010672266252!3f265.31662!4f0!5f0.7820865974627469";

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\+?[0-9]{10,15}$/;
    return re.test(String(phone));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!email) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!help) newErrors.help = 'Please select an option';
    if (!message) newErrors.message = 'Message cannot be empty';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit the form
      console.log('Form submitted');
    }
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto p-4 lg:py-8 2xl:px-0 flex flex-col lg:flex-row gap-[20px] md:gap-[70px]">
      {/* Left Form Section */}
      <div className="flex-1">
        <h2 className="text-[22px] font-bold mb-4">Submit a question</h2>
        <hr className="border-gray-300 mb-6" />
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <input
              type="text"
              className={`w-full p-2 border rounded mt-2 ${errors.firstName ? 'border-red-500' : ''}`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              className={`w-full p-2 border rounded mt-2 ${errors.lastName ? 'border-red-500' : ''}`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <label>Email Address</label>
            <input
              type="email"
              className={`w-full p-2 border rounded mt-2 ${errors.email ? 'border-red-500' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="tel"
              className={`w-full p-2 border rounded mt-2 ${errors.phone ? 'border-red-500' : ''}`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label>What can we help you with?</label>
            <select
              className={`w-full p-2 border rounded mt-2 ${errors.help ? 'border-red-500' : ''}`}
              value={help}
              onChange={(e) => setHelp(e.target.value)}
              style={{
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                paddingRight: '2rem',
                background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>') no-repeat right 10px center`,
                backgroundSize: '16px',
                backgroundColor: 'white',
              }}
            >
              <option value="">Select</option>
              <option value="Sales Inquiry">Sales Inquiry</option>
              <option value="Service Request">Service Request</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
            {errors.help && <p className="text-red-500 text-sm mt-1">{errors.help}</p>}
          </div>
          <div>
            <label>Your Message</label>
            <textarea
              className={`w-full p-2 border rounded mt-2 ${errors.message ? 'border-red-500' : ''}`}
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>
          <button type="submit" className="w-full p-4 bg-blue-500 text-white rounded font-semibold">Submit</button>
        </form>
      </div>

      {/* Right Info Section */}
      <div className="flex-1">
        {/* Toggle for Map and Street View */}
        <div className="mb-4">
          <button onClick={() => setView('map')} className={`p-3 mr-2 font-semibold rounded px-6  ${view === 'map' ? 'bg-blue-500 text-white' : 'border'}`}>Map View</button>
          <button onClick={() => setView('street')} className={`p-3 font-semibold rounded px-6 ${view === 'street' ? 'bg-blue-500 text-white' : 'border'}`}>Street View</button>
        </div>

        {/* Google Maps or Street View */}
        <iframe
          className="w-full h-96 mb-4"
          src={view === 'map' ? mapUrl : streetViewUrl}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <h3 className="text-[22px] font-bold mb-4">Branch Information</h3>
        <hr className="border-gray-300 mb-6" />
        <p className="mb-2"><strong>1 ST. THOMAS AVE. (CORNER ST. PAUL AVE.), LOPEZ VILLAGE, PARANAQUE CITY</strong></p>
        <p className="mb-2 flex items-center"><img src={Map_Icon} alt="Map Icon" className="w-5 h-5 mr-2" /> 1 St. Thomas Ave. (Corner St. Paul Ave.), Lopez Village, Paranaque City</p>
        <p className="mb-2 flex items-center"><img src={Phone_Icon} alt="Phone Icon" className="w-5 h-5 mr-2" /> +63 921 378 3197, +63 916 242 3581, +63 917 180 9000</p>
        <p className="mb-2 flex items-center"><img src={Email_Icon} alt="Email Icon" className="w-5 h-5 mr-2" /><a href="mailto:electriccar@evestdealership.com" className="text-blue-500">electriccar@evestdealership.com</a></p>

        <div className="mt-4 flex gap-2">
          <a href="mailto:electriccar@evestdealership.com" className="p-3 bg-blue-500 text-white rounded font-semibold px-4">Contact Us</a>
          <a href="https://www.google.com/maps/place/EVest+Electric+Car+Dealership/@14.4669758,121.0080064,17z/data=!4m6!3m5!1s0x3397cf003e7a18a7:0x7edcdef9c7a6fe8f!8m2!3d14.4669758!4d121.0105813!16s%2Fg%2F11lf8f17qp?entry=ttu&g_ep=EgoyMDI1MDMxOS4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="p-3 border rounded font-semibold px-4">View Direction</a>
        </div>

        <p className="mt-4"><strong>Services:</strong> Sales Office, TCUV, Periodic Maintenance, General Maintenance, Express Maintenance</p>
      </div>
    </div>
  );
};

export default Contactus;