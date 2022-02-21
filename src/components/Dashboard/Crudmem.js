import * as React from 'react';
import {useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
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

import TextField from '@mui/material/TextField';

import {zhTW} from '@mui/material/locale';
/* import { zhTW } from '@material-ui/core/locale'; */
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

const allteam2 = [{"team_acronym":"min","team_name":"Minnesota Timberwolves"},{"team_acronym":"orl","team_name":"Orlando Magic"},{"team_acronym":"bos","team_name":"Boston Celtics"},{"team_acronym":"por","team_name":"Portland Trail Blazers"},{"team_acronym":"ind","team_name":"Indiana Pacers"},{"team_acronym":"uth","team_name":"Utah Jazz"},{"team_acronym":"pho","team_name":"Phoenix Suns"},{"team_acronym":"okc","team_name":"Oklahoma City Thunder"},{"team_acronym":"lal","team_name":"Los Angeles Lakers"},{"team_acronym":"tor","team_name":"Toronto Raptors"},{"team_acronym":"bro","team_name":"Brooklyn Nets"},{"team_acronym":"phi","team_name":"Philadelphia 76ers"},{"team_acronym":"det","team_name":"Detroit Pistons"},{"team_acronym":"gsw","team_name":"Golden State Warriors"},{"team_acronym":"mem","team_name":"Memphis Grizzlies"},{"team_acronym":"cle","team_name":"Cleveland Cavaliers"},{"team_acronym":"nor","team_name":"New Orleans Pelicans"},{"team_acronym":"chi","team_name":"Chicago Bulls"},{"team_acronym":"dal","team_name":"Dallas Mavericks"},{"team_acronym":"lac","team_name":"Los Angeles Clippers"},{"team_acronym":"mia","team_name":"Miami Heat"},{"team_acronym":"hou","team_name":"Houston Rockets"},{"team_acronym":"sac","team_name":"Sacramento Kings"},{"team_acronym":"was","team_name":"Washington Wizards"},{"team_acronym":"sas","team_name":"San Antonio Spurs"},{"team_acronym":"cha","team_name":"Charlotte Hornets"},{"team_acronym":"nyk","team_name":"New York Knicks"},{"team_acronym":"den","team_name":"Denver Nuggets"},{"team_acronym":"atl","team_name":"Atlanta Hawks"},{"team_acronym":"mil","team_name":"Milwaukee Bucks"}]


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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
    id: 'Team',
    numeric: false,
    disablePadding: true,
    label: 'Team',
  },
  {
    id: 'Name',
    numeric: true,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'Games',
    numeric: true,
    disablePadding: false,
    label: 'Games',
  },
  {
    id: 'Points',
    numeric: true,
    disablePadding: false,
    label: 'Points',
  },
  {
    id: 'Rebounds',
    numeric: true,
    disablePadding: false,
    label: 'Rebounds',
  },
  {
    id: 'Assists',
    numeric: true,
    disablePadding: false,
    label: 'Assists',
  },
  {
    id: 'Steals',
    numeric: true,
    disablePadding: false,
    label: 'Steals',
  },
  {
    id: 'Blocks',
    numeric: true,
    disablePadding: false,
    label: 'Blocks',
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
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
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
// Tool bar old home


//
export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('Name');
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
      console.log(newSelecteds);
      
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  
  
//
let rows = [];
let rows2 = [];
const url = 'http://localhost:8080/member/'
const [data1, setData1] = useState([]);
const [data2, setData2] = useState([]);
const [open, setOpen] = React.useState(false);

/* useEffect(() => {
  async function fetchapi() {
    try {
      const res = await (await axios.get(url)).data;
      setData1(res);
    } catch (error) {
      console.log(error);
    }
  }
  fetchapi();
}, []) */

/* useEffect(() => {
  data1.map((yo, index) => {
    
    rows[index] = { id: yo.memberid, name: yo.membername, gender: yo.membergender, birth: yo.memberbirth, time: yo.memberregistertime } 
    
    if(rows[index].gender==null){
      rows[index].gender = '未填寫'
    } else if (rows[index].gender==0){
      rows[index].gender = '男'
    } else {
      rows[index].gender = '女'
    } 
    
    setData2(yo)
   
  })
}, [data1]) */

const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data1.length) : 0;

    // Tool Bar moved
    const EnhancedTableToolbar = (props) => {
      const { numSelected, selected,newSelecteds } = props;
    
      return (
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
          }}
        >
          {numSelected > 0 ? (
            <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} 已選擇
            </Typography>
          ) : (
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              NBA球星列表
            </Typography>
          )}
    
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton >
                <DeleteIcon onClick={testyo}/>
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      );
    };
    EnhancedTableToolbar.propTypes = {
      numSelected: PropTypes.number.isRequired,
    };

    const handleClose = () => {
      setOpen(false);
    };

    const deletedata = () => {
      selected.map((e)=>{
        console.log(e);
        //
        async function fetchapidelete() {
          try {
            const res = await axios.delete('http://localhost:8080/member/'+e);
          } catch (error) {
            console.log(error);
          }
        }
        fetchapidelete();

        
      })
      window.location.reload();
      
    };
    function testyo(){
      console.log(selected);
      setOpen(true);
    }
    
    const [team, setTeam] = React.useState('');

    const handleSelectChange = (event) => {
      setTeam(event.target.value);
    };

    const keywordsChange = (event)=>{
      setData2(event.target.value);
    }

    const handleSent = ()=>{
      
      async function fetchapi2() {
        
        if(data2==""){
        try {
          const res = await (await axios.get("http://localhost:3001/players/"+team)).data;
          console.log(res);
          setData1(res);
        } catch (error) {
          console.log(error);
        }
      }else{
        try {
          const res = await (await axios.get("http://localhost:3001/players/"+team+"/"+data2)).data;
          console.log(res);
          setData1(res);
        } catch (error) {
          console.log(error);
        }
      }
    }
      fetchapi2();
      console.log(data1.length);
    };

  return (
    <ThemeProvider theme={mdTheme}>
     
      
     
    <Box sx={{ width: '100%' }}>

    <Paper sx={{ width: '100%',height:'150px', mb: 2 }}>
      Team：
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

    <button style={{marginLeft:'90%'}}>Show Charts</button>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 ,height:'auto'}}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data1.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(data1, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(index);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, index)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
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
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="緊密排列"
      />
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"刪除的資料就像變心的女朋友"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography>
              請問您確定要刪除編號：{selected.join(',')} 的會員資料嗎 ？
              </Typography>
             
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button onClick={()=>{handleClose();deletedata();}} autoFocus>
              確定
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
    </ThemeProvider>
  );
}