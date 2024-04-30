import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Header from "../../ClientComponent/HomePage/Header";
import { PiStudent } from "react-icons/pi";
import { FaRegUserCircle, FaChalkboardTeacher } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi2";
import { BsPersonWorkspace } from "react-icons/bs";
import "./AccountStats.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import BarAnimation from './BarChart';
import Footer from '../Dashboard/Footer'



const AccountStats = () => {
  const [accountStats, setAccountStats] = useState(null);
  const [error, setError] = useState(null);
  const [evenementData, setEventData] = useState([]);

  useEffect(() => {
    const fetchAccountStats = async () => {
      try {
        const response = await fetch('http://localhost:3500/stat/api/accounts-statistics');
        if (!response.ok) {
          throw new Error('Error fetching account stats');
        }
        const data = await response.json();
        setAccountStats(data);
        setEventData(data.evenementData); 
      } catch (err) {
        console.error('Error fetching account stats:', err);
        setError(err.message);
      }
    };
  
    fetchAccountStats();
  }, []);
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!accountStats) {
    return <div>Loading...</div>;
  }

  const { studentCount, userCount, staffCount, AlumniCount, RecruiterCount } = accountStats;

  const pieChartData = [
    { id: 0, value: studentCount, label: 'Students', labelColor: 'white' },
    { id: 1, value: userCount, label: 'Users', labelColor: 'white' },
    { id: 2, value: staffCount, label: 'Teachers', labelColor: 'white' },
    { id: 3, value: AlumniCount, label: 'Alumnis', labelColor: 'white' },
    { id: 4, value: RecruiterCount, label: 'Recruiters', labelColor: 'white' },
  ];

  return (
    <div>
      <Header />
      <div className='homePage'>
      <section className="grid grid-cols-2 gap-4 h-[calc(100vh-4rem)]" >
        <div className="flex justify-center items-center">
        </div>
        <div className="bg-gray-900 text-white p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Account Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <main className='main-container'>
              <div className='main-ccardssss'>
                <div className='cardsss'>
                  <div className='cardsss-inners'>
                    <h3>STUDENTS</h3>
                    <PiStudent className='card_icon' />
                  </div>
                  <h1>{studentCount}</h1>
                </div>
                <div className='cardsss'>
                  <div className='cardsss-inners'>
                    <h3>USERS</h3>
                    <FaRegUserCircle className='card_icon' />
                  </div>
                  <h1>{userCount}</h1>
                </div>
                <div className='cardsss'>
                  <div className='cardsss-inners'>
                    <h3>TEACHERS</h3>
                    <FaChalkboardTeacher className='card_icon' />
                  </div>
                  <h1>{staffCount}</h1>
                </div>
                <div className='cardsss'>
                  <div className='cardsss-inners'>
                    <h3>ALUMNIS</h3>
                    <HiAcademicCap className='card_icon' />
                  </div>
                  <h1>{AlumniCount}</h1>
                </div>
                <div className='cardsss'>
                  <div className='cardsss-inners'>
                    <h3>RECRUITERS</h3>
                    <BsPersonWorkspace className='card_icon' />
                  </div>
                  <h1>{RecruiterCount}</h1>
                </div>
              </div>
            </main>
            <div className="mt-4">
              <PieChart
                series={[
                  {
                    data: pieChartData,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -100, color: 'gray', labelColor: 'white' },
                  },
                ]}
                height={300}
              />
            </div>
          </div>
          <div className="logo"><h3>Events</h3></div>
          <div className="line-chart-wrapper">
            <div className="line-chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart 
                  data={evenementData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <XAxis dataKey="_id.day" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div>
          <BarAnimation />
        </div>
      </section>
    </div>
    <Footer/>
    </div>
  );
};

export default AccountStats;