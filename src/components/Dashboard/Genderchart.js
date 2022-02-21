
import React, { useCallback } from "react";
import axios from 'axios'
import { useEffect,useState } from 'react';
import Typography from '@mui/material/Typography';
import { PieChart, Pie, Sector, Cell } from "recharts";

/* const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 }
]; */
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const url = 'http://localhost:8080/backstage/membergenderdata'


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

  let renderLabel = function(data) {
    console.log(data.name);
    if(data.name=='male'){
      return "男性："+data.count + " 位 " ;
    }else{
      return "女性："+data.count + " 位 ";
    }
  }

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
            會員性別比例
            </Typography>
    
      
            <PieChart width={2000} height={400}>
      <Pie
        data={data}
        cx={250}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
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
