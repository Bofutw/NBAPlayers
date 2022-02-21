import React, { useCallback } from "react";
import axios from 'axios'
import { useEffect,useState } from 'react';
import { PieChart, Pie, Sector, Cell } from "recharts";
import { blue, green, grey, purple, red } from "@mui/material/colors";

const url = 'http://localhost:9999/chart'

export default function Areachart() {

  async function fetchapi(){
    try {
     const res = await axios({
      method: 'get',
      url: url
    });
    console.log(res);
    let newRes = [];
    
    res.data.map((resNext,index)=>{
      if(resNext.count<=15){
       newRes.push(resNext);
      }
    })
    console.log(newRes);
    setData(newRes)
  
    } catch (error) {
        console.log(error);
    }
  }
  
  const [data, setData] = useState([])
  useEffect(() => {
    fetchapi();
    console.log(data);
    
  }, [])

  let renderLabel = function(data) {
    console.log(data.name);
    return data.teamname +"："+ data.count + "位"
  }
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", grey[500], red[300],purple[200]];

  return (
      <>
      <PieChart width={800} height={300}>
      <Pie
        data={data}
        cx={400}
        cy={150}
        /* innerRadius={60} */
        outerRadius={100}
        fill="#8884d8"
        /* paddingAngle={0} */
        dataKey="count"
        label={renderLabel} 
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      
    </PieChart>
    </>
  );
}
