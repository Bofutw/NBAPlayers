import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Depositsnum from './Depositsnum';
import axios from 'axios'
import { useEffect,useState } from 'react';

function preventDefault(event) {
  event.preventDefault();
}

const url = 'http://localhost:8080/backstage/membercountbyall'

export default function Deposits() {

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
    <React.Fragment>
      <Title>會員即時人數</Title>
      <Typography component="p" variant="h4">
        
      
      <Depositsnum num={data}  duration={1500}></Depositsnum>
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      <Depositsnum num={new Date().getFullYear()}  duration={500}></Depositsnum> / <Depositsnum num={new Date().getMonth()+1}  duration={1000}></Depositsnum> / <Depositsnum num={new Date().getDate()}  duration={1500}></Depositsnum>
      </Typography>
      <div>
        <Link color="primary" href="./member" /* onClick={preventDefault} */>
          會員詳細資訊
        </Link>
      </div>
      
    </React.Fragment>
  );
}
