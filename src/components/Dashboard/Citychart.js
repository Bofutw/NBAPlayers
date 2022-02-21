import Typography from '@mui/material/Typography';
import React from "react";
import axios from 'axios'
import { useEffect,useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const url = 'http://localhost:8080/backstage/membercountbycity'
let test = [];

export default function App() {


// fetch sql

async function fetchapi(){
  try {
   const res = await axios({
    method: 'get',
    url: url
  });
  console.log(res.data);
  res.data.map((yo)=>{
    yo.name = yo.name.substr(0,2);
  })
  /* res.data.name = res.data.name.substr(0,2); */
  
  setData(res.data)
  
  } catch (error) {
      console.log(error);
  }
}

const [data, setData] = useState([])
useEffect(() => {
  fetchapi();
  console.log(data);
  
}, [])



  return (
      <>
    <Typography
    component="h1"
    variant="h5"
    color="primary"
    noWrap
    align="center"
    sx={{ flexGrow: 1 }}
  >
  會員縣市分佈
  </Typography>

        <BarChart
          width={1150}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickCount='3'/>
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name='會員人數' stackId="a" fill="#8884d8" barSize={20} />
         
        </BarChart>
      
    </>
  );
}
