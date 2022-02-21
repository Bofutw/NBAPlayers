import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  
createData('12-27',5),
createData('12-28',19),
createData('12-30',7),
createData('01-01',12),
createData('01-04',29),
createData('01-05',4),
createData('01-06',130),
createData('01-08',9),
createData('01-09',422),
createData('01-10',885),
createData('01-11',1768),
createData('01-12',1418),
createData('01-13',2170),
createData('01-14',974),
createData('01-15',298),
createData('01-16',2261),
createData('01-17',1164),
createData('01-18',1333),
createData('01-19',1203),
createData('01-20',1024)
];
let date = new Date();
let month = date.getMonth();

switch (month) {
  case 0:
    month = '一月API使用次數'
    break;

  case 1:
    month = '二月API使用次數' 
  
  default:
    month = 'API使用次數'
    break;
}


export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>{month}</Title>
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
            dataKey="time"
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
              使用次數
            </Label>
          </YAxis>
          <Line
            isAnimationActive={true}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
