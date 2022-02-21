import * as React from 'react';
import {useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import {zhTW} from '@mui/material/locale';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Playerchart from './Playerchart'
import { useRef } from 'react';

const allteam2 = [{"team_acronym":"all","team_name":"ALL"},{"team_acronym":"min","team_name":"Minnesota Timberwolves"},{"team_acronym":"orl","team_name":"Orlando Magic"},{"team_acronym":"bos","team_name":"Boston Celtics"},{"team_acronym":"por","team_name":"Portland Trail Blazers"},{"team_acronym":"ind","team_name":"Indiana Pacers"},{"team_acronym":"uth","team_name":"Utah Jazz"},{"team_acronym":"pho","team_name":"Phoenix Suns"},{"team_acronym":"okc","team_name":"Oklahoma City Thunder"},{"team_acronym":"lal","team_name":"Los Angeles Lakers"},{"team_acronym":"tor","team_name":"Toronto Raptors"},{"team_acronym":"bro","team_name":"Brooklyn Nets"},{"team_acronym":"phi","team_name":"Philadelphia 76ers"},{"team_acronym":"det","team_name":"Detroit Pistons"},{"team_acronym":"gsw","team_name":"Golden State Warriors"},{"team_acronym":"mem","team_name":"Memphis Grizzlies"},{"team_acronym":"cle","team_name":"Cleveland Cavaliers"},{"team_acronym":"nor","team_name":"New Orleans Pelicans"},{"team_acronym":"chi","team_name":"Chicago Bulls"},{"team_acronym":"dal","team_name":"Dallas Mavericks"},{"team_acronym":"lac","team_name":"Los Angeles Clippers"},{"team_acronym":"mia","team_name":"Miami Heat"},{"team_acronym":"hou","team_name":"Houston Rockets"},{"team_acronym":"sac","team_name":"Sacramento Kings"},{"team_acronym":"was","team_name":"Washington Wizards"},{"team_acronym":"sas","team_name":"San Antonio Spurs"},{"team_acronym":"cha","team_name":"Charlotte Hornets"},{"team_acronym":"nyk","team_name":"New York Knicks"},{"team_acronym":"den","team_name":"Denver Nuggets"},{"team_acronym":"atl","team_name":"Atlanta Hawks"},{"team_acronym":"mil","team_name":"Milwaukee Bucks"}]


const mdTheme = createTheme({
  
},zhTW);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'team_name',
    numeric: false,
    disablePadding: true,
    label: 'Team',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'games_played',
    numeric: true,
    disablePadding: false,
    label: 'Games',
  },
  {
    id: 'points_per_game',
    numeric: true,
    disablePadding: false,
    label: 'Points',
  },
  {
    id: 'rebounds_per_game',
    numeric: true,
    disablePadding: false,
    label: 'Rebounds',
  },
  {
    id: 'assists_per_game',
    numeric: true,
    disablePadding: false,
    label: 'Assists',
  },
  {
    id: 'steals_per_game',
    numeric: true,
    disablePadding: false,
    label: 'Steals',
  },
  {
    id: 'blocks_per_game',
    numeric: true,
    disablePadding: false,
    label: 'Blocks',
  },
  {
    id: 'Detail',
    numeric: true,
    disablePadding: false,
    label: 'Detail',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('points_per_game');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data1.map((n) => n.name);
      setSelected(newSelecteds);
      
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
let rows = [];
const [data1, setData1] = useState([]);
const [data2, setData2] = useState([]);
const [detail, setDetail] = useState(false);
const [searchName, setSearchName] = useState([]);
const [playersDetail, setPlayersDetail] = useState([]);
const [open, setOpen] = React.useState(false);
const reftest = useRef([]);


const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data1.length) : 0;
  
    
    const [team, setTeam] = React.useState('');
    

    const handleSelectChange = (event) => {
      setTeam(event.target.value);
    };

    const keywordsChange = (event)=>{
      setData2(event.target.value);
    }

    
    const handleSent = ()=>{
      setPage(0);
      async function fetchapi2() {
        
        if(data2==""){
        try {
          const res = await (await axios.get("http://localhost:3001/players/"+team)).data;
          setData1(res);
        } catch (error) {
          console.log(error);
        }
      }else{
        try {   
          if(team!='all' && team!=""){
          const res = await (await axios.get("http://localhost:3001/players/"+team+"/"+data2)).data;
        
          setData1(res);
        }else {
          const res = await (await axios.get("http://localhost:3001/search/all/"+data2)).data;
         
          setData1(res);
        }
        } catch (error) {
          console.log(error);
        }
      }
    }
      fetchapi2();
      
    };
    
    useEffect(()=>{
      async function fetchapiFirst(){
      const res = await (await axios.get("http://localhost:3001/players/all")).data;
      setData1(res);
      }
      fetchapiFirst();
    },[])

    const handleClose = () => {
      setOpen(false);
    };

    const newChart = ()=>{
      setOpen(true)
    }
    


    useEffect(()=>{
      async function fetchapi3() {
        try {
          let temp = [];
          temp = JSON.parse(window.localStorage.array);
          
         
          const res2 = await (await axios.get("http://localhost:3001/players/"+temp[0]+"/"+temp[1])).data;
          setPlayersDetail(res2)
          
        } catch (error) {
          console.log(error);
        }
      }
      fetchapi3();
    },[detail])
   
    
    
  return (
    <>
    {detail==true?
    <ThemeProvider theme={mdTheme}>
    <Box sx={{ width: '100%' }}>
    <Paper sx={{ width: '100%',height:'550px', mb: 2 }}>
    <AccountCircleIcon fontSize='large'></AccountCircleIcon> {playersDetail[0].name} <hr align="left" width='30%'></hr>
<div style={{marginLeft:'20px'}}>
{"Team： "+playersDetail[0].team_acronym}<br></br>
{"TeamName： "+playersDetail[0].team_name}<br></br>
{"Games： "+playersDetail[0].games_played}<br></br>
{"MPG： "+playersDetail[0].minutes_per_game}<br></br>
{"FGA： "+playersDetail[0].field_goals_attempted_per_game}<br></br>
{"FGM： "+playersDetail[0].field_goals_made_per_game}<br></br>
{"FG%： "+playersDetail[0].field_goal_percentage}<br></br>
{"FT%： "+playersDetail[0].free_throw_percentage}<br></br>
{"3PA： "+playersDetail[0].three_point_attempted_per_game}<br></br>
{"3PM： "+playersDetail[0].three_point_made_per_game}<br></br>
{"3PT%： "+playersDetail[0].three_point_percentage}<br></br>
{"Points： "+playersDetail[0].points_per_game}<br></br>
{"ORebounds： "+playersDetail[0].offensive_rebounds_per_game}<br></br>
{"DRebounds： "+playersDetail[0].defensive_rebounds_per_game}<br></br>
{"Rebounds： "+playersDetail[0].rebounds_per_game}<br></br>
{"Assists： "+playersDetail[0].assists_per_game}<br></br>
{"Steals： "+playersDetail[0].steals_per_game}<br></br>
{"Blocks： "+playersDetail[0].blocks_per_game}<br></br>
{"Turnovers： "+playersDetail[0].turnovers_per_game}<br></br>
{"Efficiency： "+playersDetail[0].player_efficiency_rating}<br></br>
</div>  
    {/* {
       Object.keys(playersDetail[0]).map((res)=>{
        return res
      })
    } */}
    </Paper>
    </Box>
    </ThemeProvider>
    :
    <ThemeProvider theme={mdTheme}>
    <Box sx={{ width: '100%' }}>
    <Paper sx={{ width: '100%',height:'150px', mb: 2 }}>
      <FormControl>
  <InputLabel id="demo-simple-select-label">Team</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={team}
    label="Team"
    onChange={handleSelectChange}
    sx={{width:'250px'}}
    size="small"
  >
    {
    allteam2.map((res,index)=>{
      return <MenuItem key={index} value={res.team_acronym}> {res.team_name} </MenuItem>;
    })
    }
    
  </Select>
</FormControl>

      
      <span style={{marginLeft:'50px'}}>Keywords：</span>
      <TextField  size="small" id="outlined-basic" variant="outlined" onChange={keywordsChange}/>
      
      <Button onClick={handleSent} variant="outlined" sx={{marginX:'45%',marginY:'4%'}}>Search</Button>
    </Paper>

    <button style={{marginLeft:'90%'}} onClick={newChart}>Show Charts</button>
      <Paper sx={{ width: '100%', mb: 2 }}>
      
        
      <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
             
              {stableSort(data1, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                   
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.team_name}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.games_played}</TableCell>
                      <TableCell align="right">{row.points_per_game}</TableCell>
                      <TableCell align="right">{row.rebounds_per_game}</TableCell>
                      <TableCell align="right">{row.assists_per_game}</TableCell>
                      <TableCell align="right">{row.steals_per_game}</TableCell>
                      <TableCell align="right">{row.blocks_per_game}</TableCell>
                      <TableCell align="right"><SearchIcon onClick={()=>{ window.localStorage.array=`["${row.team_acronym}","${row.name}"]` ;setDetail(true); }}></SearchIcon></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data1.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth='lg'
        >
          <DialogTitle align='center' id="alert-dialog-title">
            {"Chart"}
          </DialogTitle>

         {/*  <DialogContent>
           
            <DialogContentText id="alert-dialog-description">
              <Typography align='center'>
              人數小於等於15之nba隊伍
              </Typography>
            </DialogContentText> 
          </DialogContent> */}
          <Playerchart></Playerchart>
          
          <DialogActions>
            <Button onClick={handleClose}>關閉</Button>
          </DialogActions>
        </Dialog>
      </div>
      
    </Box>
    </ThemeProvider>
    } 
    </>
  );
  
}