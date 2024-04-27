import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BarAnimation() {
  const [seriesNb, setSeriesNb] = useState(2);
  const [itemNb, setItemNb] = useState(5);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const [filterData, setFilterData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3500/stat/api/accounts-statistics');
      const data = await response.json();
      setFilterData(data.Filterdata);
    }

    fetchData();
  }, []);

  if (!filterData) {
    return <div>Loading...</div>
  }

  const modifiedSeries = filterData.datasets.map((s, index) => ({
    ...s,
    data: s.data.slice(0, itemNb),
    label: index === 0 ? 'Student' : 'Offers' 
  }));

  return (
      <div className='barchart'>
        <h3>Student Compared With Offers</h3>
        <BarChart
          height={450}
          series={modifiedSeries}
          skipAnimation={skipAnimation}
        />
      </div>
  );
}

