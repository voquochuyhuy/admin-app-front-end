import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DetailsIcon from "@material-ui/icons/Details";
import moment from "moment";
import axios from "axios";
import { ShowLoadingIcon, HideLoadingIcon } from "../../global/globalFunction";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DialogReportDetail from "../../components/dialogReportDetail";
// import {db} from '../../firebase.js';

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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  // { id: "content", numeric: false, disablePadding: false, label: "Content" },
  {
    id: "Report message",
    numeric: false,
    disablePadding: false,
    label: "Report message",
  },
  { id: "Reporter", numeric: false, disablePadding: false, label: "Reporter" },
  {
    id: "Created at",
    numeric: false,
    disablePadding: false,
    label: "Created at",
  },
  {
    id: "Link",
    numeric: true,
    disablePadding: false,
    label: "Link",
  },
  {
    id: "Action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    ></Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));
const useStylesDropDown = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function Report() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [type, setType] = React.useState("Question");
  const [
    isOpenDialogReportDetail,
    setIsOpenDialogReportDetail,
  ] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({});

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const fetchDataQuestion = async () => {
    ShowLoadingIcon();
    await axios
      .get("https://test-deploy-express.herokuapp.com/report/question-report")
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        setRows(data);
      });
    HideLoadingIcon();
  };
  const fetchDataUser = async () => {
    ShowLoadingIcon();
    await axios
      .get("https://test-deploy-express.herokuapp.com/report/user-report")
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        setRows(data);
      });
    HideLoadingIcon();
  };
  const fetchDataAnswer = async () => {
    ShowLoadingIcon();
    await axios
      .get("https://test-deploy-express.herokuapp.com/report/answer-report")
      .then((res) => {
        const data = res.data.data;
        setRows(data);
      });
    HideLoadingIcon();
  };
  useEffect(() => {
    fetchDataQuestion();
    return () => {};
  }, []);
  const classesDropDown = useStylesDropDown();
  const handleChange = (event) => {
    setType(event.target.value);
    if (event.target.value === "Question") {
      fetchDataQuestion();
    } else if (event.target.value === "User") {
      fetchDataUser();
    } else {
      fetchDataAnswer();
    }
  };
  const handleDeleteReportDetail = async () => {
    ShowLoadingIcon();
    setIsOpenDialogReportDetail(false);
    await axios
      .put("https://test-deploy-express.herokuapp.com/question", {
        id: selectedItem.id,
      })
      .then((res) => {
        HideLoadingIcon();
      })
      .catch((err) => {
        HideLoadingIcon();
      });
      
  };
  const handleBanReportDetail = async ()=>{
    ShowLoadingIcon();
    setIsOpenDialogReportDetail(false);
    await axios
      .put("https://test-deploy-express.herokuapp.com/user", {
        id: selectedItem.id,
        status: 'deactive',
      })
      .then((res) => {
        HideLoadingIcon();
      })
      .catch((err) => {
        HideLoadingIcon();
      });
  }
  const onCloseDialogReportDetail = () => {
    setIsOpenDialogReportDetail(false);
  };
  const onOpenDialogReportDetail = (e, row) => {
    setSelectedItem(row);
    setIsOpenDialogReportDetail(true);
  };
  const handleClickReportLink = (e, row) => {
    if(type !== "User")
      window.open(`https://togebetter.netlify.app/questions/${row.targetID}`);
    else window.open(`https://togebetter.netlify.app/users/${row.targetID}`);
  };
  
  return (
    <div className="report-management">
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div style={{ marginLeft: "8px" }}>
            <FormControl className={classesDropDown.formControl}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                onChange={handleChange}
              >
                <MenuItem value={"Question"}>Question</MenuItem>
                <MenuItem value={"Answer"}>Answer</MenuItem>
                <MenuItem value={"User"}>User</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}
                      >
                        {/* <TableCell align="left">{row.content}</TableCell> */}

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          // padding="none"
                          align="left"
                        >
                          {row.message}
                        </TableCell>

                        <TableCell align="left">{row.username}</TableCell>
                        <TableCell align="left">
                          {moment(row.createdAt).format("DD-MM-YYYY hh:mm:ss")}
                        </TableCell>
                        <TableCell align="left">
                          <span
                            onClick={(e) => {
                              handleClickReportLink(e, row);
                            }}
                            className="link-main-app"
                          >
                            {type === "Answer" || type === "Question"
                              ? `https://togebetter.netlify.app/questions/${row.targetID}`
                              : `https://togebetter.netlify.app/users/${row.targetID}`}
                          </span>
                        </TableCell>
                        <TableCell align="left">
                          <Tooltip title="Detail" placement="top">
                            <IconButton
                              aria-label="delete"
                              onClick={(e) => onOpenDialogReportDetail(e, row)}
                            >
                              <DetailsIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <DialogReportDetail
          open={isOpenDialogReportDetail}
          handleDelete={handleDeleteReportDetail}
          handleBan={handleBanReportDetail}
          onClose={onCloseDialogReportDetail}
          type={type}
          selectedItem={selectedItem}
        />
      </div>
    </div>
  );
}
