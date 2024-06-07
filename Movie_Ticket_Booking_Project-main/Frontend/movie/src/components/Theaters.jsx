import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './theaters.css';

function Theaters() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTheater, setSelectedTheater] = useState(null);
    const navigate = useNavigate();

    const theatersData = [
        {
          id: 1,
          name: 'Theater A',
          screens: [
            {
              id: 101,
              name: 'Screen 1',
              shows: [
                { id: 1001, time: '12:00 PM' },
                { id: 1002, time: '03:00 PM' },
              ],
            },
            {
              id: 102,
              name: 'Screen 2',
              shows: [
                { id: 1003, time: '01:30 PM' },
                { id: 1004, time: '04:30 PM' },
              ],
            },
          ],
        },
        {
          id: 2,
          name: 'Theater B',
          screens: [
            {
              id: 201,
              name: 'Screen 1',
              shows: [
                { id: 2001, time: '11:00 AM' },
                { id: 2002, time: '02:30 PM' },
              ],
            },
            {
              id: 202,
              name: 'Screen 2',
              shows: [
                { id: 2003, time: '12:45 PM' },
                { id: 2004, time: '05:15 PM' },
              ],
            },{
                id: 203,
                name: 'Screen 3',
                shows: [
                  { id: 2003, time: '12:45 PM' },
                  { id: 2004, time: '05:15 PM' },
                ],
              },
          ],
        },
      ];
      
      

      const handleDateChange = (date) => {
        setSelectedDate(date);
      };


      const handleTheaterClick = (theater) => {
        setSelectedTheater(theater);
  
        navigate("/seats",{theater})
      };


  return (
    <div className='theater'>
        <div className='container mt-5'>
  <h2 className='mb-4'>Select Date: {selectedDate.toDateString()}</h2>
  <div className='row'>
    <div className='col-md-4'>
      <div className='card'>
        <div className='card-body'>
          <h2>Theaters</h2>
          {theatersData.map((theater) => (
            <div key={theater.id} className='mb-3'>
              <button
          onClick={() => handleTheaterClick(theater)}
          className={`btn ${selectedTheater === theater ? 'btn-primary' : 'btn-secondary'}`}
          aria-label={`Select ${theater.name} theater`}
        >
                {theater.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className='col-md-8'>
      <label htmlFor='datePicker'>Select Date:</label>
      <input
        type='date'
        id='datePicker'
        value={selectedDate.toISOString().split('T')[0]}
        onChange={(e) => handleDateChange(new Date(e.target.value))}
        className='form-control mb-3'
      />
      {selectedTheater && (
        <div>
          <h3>{selectedTheater.name}</h3>
          <label htmlFor='screenSelect'>Select Screen:</label>
          <select id='screenSelect' className='form-select mb-2'>
            {selectedTheater.screens.map((screen) => (
              <option key={screen.id} value={screen.id}>
                {screen.name}
              </option>
            ))}
          </select>
          {/* Add more components or logic for selected theater */}
        </div>
      )}
    </div>
  </div>
</div>

   
  
</div>


  );
}

export default Theaters;
