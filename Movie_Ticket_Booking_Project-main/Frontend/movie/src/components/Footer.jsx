import React from 'react'
import "./footer.css"


function Footer() {
  return (
    <>
       <div className='footer'> 
        <div className="myfooter">
            <div className="footer-section">
                <h3>Terms of Service</h3>
                <div className="content">
                    <p>Review terms and conditions for booking the Movie Ticket.</p>
                </div>
            </div>
            <div className="footer-section">
                <h3>Privacy Policy</h3>
                <div className="content">
                    <p>Application refers to Online Movie Ticket Booking, the software program provided by the Company.</p>
                </div>
            </div>
            <div className="footer-section">
                <h3>FAQ</h3>
                <div className="content">
                    <p>For any additional queries or assistance, feel free to explore the app or contact our customer support team. Happy movie booking!</p>
                </div>
            </div>
            
             </div>
            <div className='myfooter1'>
          <hr/><hr/>
            <div className="footer-section">
              <hr/>
                <h5>&copy; {new Date().getFullYear()} OnlineMovieTicketBookingApp. All rights reserved.</h5>
            </div>
            </div>
        </div>
    </>
  )
}

export default Footer
