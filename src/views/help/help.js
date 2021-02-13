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
import GroupIcon from "@material-ui/icons/Group";
import TimerIcon from "@material-ui/icons/Timer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import moment from "moment";
import axios from "axios";
import { ShowLoadingIcon, HideLoadingIcon } from "../../global/globalFunction";

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
    id: "Question type",
    numeric: false,
    disablePadding: false,
    label: "Question type",
  },
  { id: "Content", numeric: false, disablePadding: false, label: "Content" },
  {
    id: "Language",
    numeric: false,
    disablePadding: false,
    label: "Language",
  },
  {
    id: "Created at",
    numeric: true,
    disablePadding: false,
    label: "Created at",
  },
  {
    id: "Link",
    numeric: true,
    disablePadding: false,
    label: "Link",
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
export default function Help() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [type, setType] = React.useState("Question");
  const [overviewData, setOverviewData] = React.useState({
    totalActiveUser: 0,
    totalSession: 0,
    averageSession: 0,
    userLastWeek: 0,
    logLastWeek: 0,
    sessionLastWeek: 0,
  });
  const [
    isOpenDialogReportDetail,
    setIsOpenDialogReportDetail,
  ] = React.useState(false);

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
  const fetchData = async () => {
    await axios
      .get("https://test-deploy-express.herokuapp.com/report/dashboard")
      .then((res) => {
        const totalActiveUser = res.data.data.totalActiveUser[0]["COUNT(*)"];
        const oldestLog = res.data.data.oldestLog[0].createdAt;
        const totalSession = res.data.data.totalSession[0]["COUNT(*)"];
        const time =
          moment(new Date()).diff(moment(oldestLog)) / (60 * 24 * 1000);
        const _totalSession = res.data.data._totalSession[0]["COUNT(*)"];
        const _totalActiveUser = res.data.data._totalActiveUser[0]["COUNT(*)"];
        setOverviewData({
          totalActiveUser,
          userLastWeek: (
            ((totalActiveUser - _totalActiveUser) * 100) /
            _totalActiveUser
          ).toFixed(2),
          totalSession: totalSession,
          logLastWeek: (
            ((totalSession - _totalSession) * 100) /
            _totalSession
          ).toFixed(2),
          averageSession: (time / totalSession).toFixed(2),
          sessionLastWeek: (
            (time / totalSession - time / _totalSession) *
            100
          ).toFixed(2),
        });
      })
      .catch((err) => {
        console.log(err);
        HideLoadingIcon();
      });
  };
  const fetchDataNoCommentQuestion = async () => {
    ShowLoadingIcon();
    await axios
      .get(
        "https://test-deploy-express.herokuapp.com/question/no-comment-question"
      )
      .then((res) => {
        setRows(res.data.data);
        fetchData();
      })
      .catch((err) => HideLoadingIcon());
    HideLoadingIcon();
  };
  useEffect(() => {
    fetchDataNoCommentQuestion();
    return () => {};
  }, []);

  const handleClickReportLink = (e, row) => {
      window.open(`https://togebetter.netlify.app/questions/${row.Id}`);
  };

  return (
    <div className="help">
      <div className={classes.root}>
        <div className="overview">
          <div className="total-active-user">
            <div className="overview-content">
              <div className="icon">
                <GroupIcon />
              </div>
              <div className="overview-text">
                <h3>Total active user</h3>
                <div className="value">{overviewData.totalActiveUser}</div>
              </div>
            </div>
            <div className="compare-text">
              Compare to last week :{" "}
              <span style={{ color: "green" }}>
                {overviewData.userLastWeek}%
              </span>
            </div>
          </div>
          <div className="total-sessions">
            <div className="overview-content">
              <div className="icon">
                <ExitToAppIcon />
              </div>
              <div className="overview-text">
                <h3>Total sessions</h3>
                <div className="value">{overviewData.totalSession}</div>
              </div>
            </div>
            <div className="compare-text">
              Compare to last week :{" "}
              <span style={{ color: "green" }}>
                {overviewData.logLastWeek}%
              </span>{" "}
            </div>
          </div>
          <div className="average-session-duration">
            <div className="overview-content">
              <div className="icon">
                <TimerIcon />
              </div>
              <div className="overview-text">
                <h3>Session Duration</h3>
                <div className="value">{overviewData.averageSession}</div>
              </div>
            </div>
            <div className="compare-text">
              Compare to last week :{" "}
              <span style={{ color: "green" }}>
                {overviewData.sessionLastWeek}%
              </span>
            </div>
          </div>
        </div>

        <Paper className={classes.paper}>
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
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          // padding="none"
                          align="left"
                        >
                          {row.questionType}
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          // padding="none"
                          align="left"
                        >
                          {row.content}
                        </TableCell>
                        <TableCell align="left">{row.lang}</TableCell>
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
                            {`https://togebetter.netlify.app/questions/${row.Id}`} 
                          </span>
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
      </div>
    </div>
  );
}
