
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell ,LabelList} from "recharts";
import Typography from '@mui/material/Typography';
import axios from 'axios'
import { useEffect } from 'react';

const data1 = [
  { name: "北部", value: Math.round(Math.random()*500+50) },
  { name: "中部", value: Math.round(Math.random()*400+40) },
  { name: "南部", value: Math.round(Math.random()*300+30) },
  { name: "東部", value: Math.round(Math.random()*100+10) },
  { name: "離島", value: Math.round(Math.random()*50+5) }
];

const COLORS = ["#90caf9", "#f48fb1", "#ffb300", "#66bb6a", "#b0bec5"];

const RADIAN = Math.PI / 180;

const url = 'http://localhost:8080/backstage/membercountbyarea'

let renderLabel = function(data) {
    return data.name+"："+data.count;
}
export default function Areachart() {
  async function fetchapi(){
    try {
     const res = await axios({
      method: 'get',
      url: url
    });
   
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
              color="primary"/* "#a5d6a7" */
              noWrap
              align="center"
              sx={{ flexGrow: 1 }}
            >
            會員地區分佈
            </Typography>
    
      
    <PieChart width={400} height={400} margin={{left:-15}}>
      <Pie
        data={data}
        cx={160}
        cy={200}
        labelLine={false}
        label={renderLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="count"
      >
         {/*  <LabelList dataKey="value" position="insideTop" /> */}
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
    </>
  );
}
