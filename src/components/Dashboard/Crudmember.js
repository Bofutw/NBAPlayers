import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState, useEffect } from 'react'


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const yo = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];




export default function BasicTable() {
  let rows = [];
  let rows2 = [];
  const url = 'http://localhost:8080/member/'
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);




 /*  useEffect(async() => {
    const test2 = async () => {
      const axiosdata = await (await axios.get(url)).data;
      setData3(axiosdata);
    }
    test2();
  }, []); */

  
  /* const testbofu = () => {
    if(data3[0]!=undefined){
      data3.map((res)=>{
        res.memberbirth = res.memberbirth.substr(0,8)
      })
      console.log("testbofu",data3[20].memberbirth.substr(0,8));
    }
    
  }
  testbofu(); */

  useEffect(() => {
    async function fetchapi() {
      try {
        const res = await (await axios.get(url)).data;
        setData1(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchapi();
  }, [])
  
  useEffect(() => {
    data1.map((yo, index) => {
      console.log(data1)
      console.log('birth:' + yo.memberbirth);
      rows[index] = { id: yo.memberid, name: yo.membername, gender: yo.membergender, birth: yo.memberbirth, time: yo.memberregistertime }
      setData2(rows)
      console.log(data2);
    })
  }, [data1])

  return (
    <TableContainer component={Paper}>
      {/* {console.log("Data3 here", data3[0] != undefined && data3[0].memberbirth ) } */}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>編號</TableCell>
            <TableCell align="center">名稱</TableCell>
            <TableCell align="center">性別</TableCell>
            <TableCell align="center">生日</TableCell>
            <TableCell align="center">註冊</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data2.map((test, index) => (

            <TableRow
              key={test.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {test.id}
              </TableCell>

              <TableCell align="center">{test.name}</TableCell>
              <TableCell align="center">{test.gender}</TableCell>
              <TableCell align="center">{test.birth.substr(0,10)}</TableCell>
              <TableCell align="center">{test.time.substr(0,10)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


