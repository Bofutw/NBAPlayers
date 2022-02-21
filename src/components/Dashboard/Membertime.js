import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer,Tooltip } from 'recharts';
import Title from './Title';
import axios from 'axios'
import { useEffect,useState } from 'react';

const url = 'http://localhost:8080/backstage/memberregisterdata'
let clones = [];

export default function Chart() {

  const theme = useTheme();
  /* const config = require('config') */
  async function fetchapi(){
    try {
     const res = await axios({
      method: 'get',
      url: url,
    });
   
    setData(res.data)
    
    } catch (error) {
        console.log(error);
    }
  }

  const [data, setData] = useState([])
  useEffect(() => {
    fetchapi();
  }, [])

  return (
    <React.Fragment>
      <Title>會員加入時間</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="name"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Member Counts
            </Label>
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey='value' name='人數' stroke="#8884d8" activeDot={{ r: 8 }} />
          
          {/* <Line
            isAnimationActive={true}
            type="monotone"
            dataKey="count"
            stroke={theme.palette.primary.main}
            dot={false}
          /> */}
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
