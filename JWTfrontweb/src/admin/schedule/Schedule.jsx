import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './schedule.css';

import { Navbar } from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';

import ScheduleCard from './scheduleComponents/ScheduleCard';

import Circle_Primary from '../../assets/icons/Circle_Primary.svg?react';
// import Phone from '../../assets/icons/Phone.svg?react';
// import Mail from '../../assets/icons/Mail.svg?react';
// import Edit_Pencil_01 from '../../assets/icons/Edit_Pencil_01.svg?react';
import Calendar_Event from '../../assets/icons/Calendar_Event.svg?react';

const Schedule = () => {
	  const [overlayContent, setOverlayContent] = useState(null);
	  const navigate = useNavigate(); 
	  const [user, setUser] = useState(null);
	  const [loading, setLoading] = useState(true);
	  const [appointments, setAppointments] = useState([]);
	const [filter, setFilter] = useState('all');

	  
	  useEffect(() => {
		const token = localStorage.getItem('token');
		const storedUser = localStorage.getItem('user');
	  
		if (!token) {
		  navigate('/login');
		  return;
		}
	  
		if (storedUser) {
		  const parsedUser = JSON.parse(storedUser);
		  if (parsedUser.role === 'user') {
			navigate('/user/homeuser');
			return;
		  }
		  if (parsedUser.role !== 'admin') {
			navigate('/login');
			return;
		  }
		  setUser(parsedUser);
		  setLoading(false);
		} else {
		  fetchUserData(token);
		}
	  }, [navigate]);
	  
	  const fetchUserData = async (token) => {
		try {
		  const response = await axios.get(`${apiUrl}/user`, {
			headers: { Authorization: `Bearer ${token}` },
		  });
	  
		  const userData = response.data;
	  
		  if (userData.role === 'user') {
			navigate('/user/homeuser');
			return;
		  }
		  if (userData.role !== 'admin') {
			navigate('/login');
			return;
		  }
	  
		  setUser(userData);
		  localStorage.setItem('user', JSON.stringify(userData));
		} catch (error) {
		  console.error('Failed to fetch user data:', error);
		  navigate('/login');
		} finally {
		  setLoading(false);
		}
	  };
	  
	  const getFilteredAppointments = () => {
		const today = new Date().toDateString();
	  
		switch (filter) {
		  case 'today':
			return appointments.filter(appt => new Date(appt.date).toDateString() === today);
		  case 'upcoming':
			return appointments.filter(appt => appt.status === 'upcoming' && new Date(appt.date) > new Date());
		  case 'completed':
			return appointments.filter(appt => appt.status === 'completed');
		  default:
			return appointments;
		}
	  };
	  
//BLOCK TO
	  if (loading) {
		return null; 
	  }
	   
	  console.log('Current Filter:', filter);
		console.log('Filtered Appointments:', getFilteredAppointments());

  return (
  	<div className="schedule">
		<Navbar />
		<Sidebar />
    <div className="schedule-box">
			<main className="schedule-box-in">
				<header className="schedule-header">
				<Calendar_Event 
					style={{ 
						color: "var(--black-color)", 
						width: "32px", 
						height: "32px", 
						"--stroke-width": "4px" 
					}} 
				/>

					<p>Scheduled appointments</p> 
				</header> {/* schedule-header */}
				<section className="schedule-tabs">
				<button className="schedule-tabs-all" onClick={() => setFilter('all')}>
  					<Circle_Primary style={{ color: "var(--primary-color)", width: "20px", height: "20px" }} />
  					<p>All</p>
				</button>

				<button className="schedule-tabs-today" onClick={() => setFilter('today')}>
  					<Circle_Primary style={{ color: "var(--primary-color)", width: "20px", height: "20px" }} />
  					<p>Today</p>
				</button>

				<button className="schedule-tabs-upcoming" onClick={() => setFilter('upcoming')}>
  					<Circle_Primary style={{ color: "var(--primary-color)", width: "20px", height: "20px" }} />
  					<p>Upcoming</p>
				</button>

				<button className="schedule-tabs-completed" onClick={() => setFilter('completed')}>
  					<Circle_Primary style={{ color: "var(--primary-color)", width: "20px", height: "20px" }}  />
  					<p>Completed</p>
				</button>
				</section> {/* schedule-tabs */}

				<header className="schedule-header-today">
					<p>Today</p>
				</header> {/* schedule-header-today */}

				<section className="schedule-results">
  					<div className="schedule-results-cards">
    				{getFilteredAppointments().map((appt) => (
      				<ScheduleCard key={appt.id} appointment={appt} />
    			))}
  				</div>
				</section>

			</main> {/* schedule-box-in */}
    </div> {/* schedule-box */}
  	</div>
  );
};

export default Schedule;
