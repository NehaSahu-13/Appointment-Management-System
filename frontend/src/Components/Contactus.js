import React from 'react'

const Contactus = () => {
  return (
    <div className="contact-container row" id="contactus">
        <div className="col">
          <span className="contact-sec fs-4 fw-bold">Contact Information</span>
          <div className="mt-4">Get in touch with doctor App</div>
          <hr></hr>
          <div><i className="fa-regular fa-envelope"></i> Email: nsahu1477@gmail.com</div>
          <hr></hr>
          <div><i className="fa-solid fa-phone"></i> Phone: 6263696830</div>
          <hr></hr>
          <div><i className="fa-brands fa-whatsapp"></i> Whatsapp: 6263696830</div>
          <hr></hr>
        </div>
        <div className="col-6">
          <img src="images/contact-doctors.jpg" className="contact-img"/>
        </div>
    </div>
  )
}

export default Contactus;
