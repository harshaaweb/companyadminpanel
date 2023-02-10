import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";

import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AppBar from "@mui/material/AppBar";
import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  Divider,
  OutlinedInput,
  TextareaAutosize,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Stack } from "@mui/system";
const headCells = [
  {
    id: "1",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "2",
    numeric: false,
    disablePadding: true,
    label: "Description",
  },
  {
    id: "3",
    numeric: false,
    disablePadding: false,
    label: "Published At",
  },
  {
    id: "4",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

function EnhancedTableHead(props) {
  const {
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

  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
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
            sx={
              {
                // color: "white"
              }
            }
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            // sx={{ color: "white" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%", display: { xs: "none", md: "flex" } }}
          color="inherit"
          variant="h6"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%", mr: 2, display: { xs: "none", md: "flex" } }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Services Details
        </Typography>
      )}

      {/* View Product */}
      {numSelected === 1 ? (
        <Tooltip title="View">
          <IconButton
            // sx={{ color: "#fff" }}
            to={`./../view-product/${window.selected}`}
            component={RouterLink}
          >
            <RemoveRedEyeTwoToneIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}

      {/* Edit Product */}
      {numSelected === 1 ? (
        <Tooltip
          title="Edit"
          // sx={{ color: "#fff" }}
        >
          <IconButton
            to={`./../update-product/${window.selected}`}
            component={RouterLink}
          >
            <EditTwoToneIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}

      {/* Delete Product */}
      {numSelected > 0 ? (
        <Tooltip title="Delete" sx={{}}>
          <IconButton onClick={window.deleteProduct}>
            <DeleteTwoToneIcon />
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

export default function CreateContract() {
  const navigate = useNavigate();
  // Alert
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: 3,
        boxShadow: 0,
        animation: "fadeIn 0.5s ease-in-out",
        transition: "box-shadow 1s ease-in-out",
      }}
    >
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ background: "#333", color: "#fff" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/admin/addservices")}
          >
            <AddIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Create Contracts
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
      <div>
        {/* title */}
        <TextField
          id="outlined-basic"
          label="Title"
          size="small"
          variant="outlined"
          sx={{ width: "100%", marginTop: 2 }}
        />
        {/* terms */}
        <TextField
          id="outlined-basic"
          label="Terms"
          size="small"
          variant="outlined"
          sx={{ width: "100%", marginTop: 2 }}
        />
        {/* local terms */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "24%",
              textAlign: "left",
            }}
          >
            <InputLabel
              id="demo-simple-select-label"
              sx={{ marginTop: 2, marginRight: 2 }}
            >
              Local Terms
            </InputLabel>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "70%",
            }}
          >
            <div
              style={{
                width: "50%",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Price"
                size="small"
                variant="outlined"
                sx={{ width: "100%", marginTop: 2 }}
              />
            </div>
            <div
              style={{
                width: "50%",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Days"
                size="small"
                variant="outlined"
                sx={{ width: "100%", marginTop: 2 }}
              />
            </div>
          </div>
        </div>
        {/* International terms */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "24%",
              textAlign: "left",
            }}
          >
            <InputLabel
              id="demo-simple-select-label"
              sx={{ marginTop: 2, marginRight: 2 }}
            >
              International Terms
            </InputLabel>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "70%",
            }}
          >
            <div
              style={{
                width: "50%",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Price"
                size="small"
                variant="outlined"
                sx={{ width: "100%", marginTop: 2 }}
              />
            </div>
            <div
              style={{
                width: "50%",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Days"
                size="small"
                variant="outlined"
                sx={{ width: "100%", marginTop: 2 }}
              />
            </div>
          </div>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Return Term"
            size="small"
            variant="outlined"
            sx={{ width: "100%", marginTop: 2 }}
          />
        </div>
        <div>
          {/* menu drodown  */}
          <InputLabel
            id="demo-simple-select-label"
            sx={{ width: "100%", marginTop: 2, textAlign: "left" }}
          >
            Menu
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={10}
            label="Age"
            size="small"
            sx={{ width: "100%", marginTop: 2 }}
          >
            <MenuItem value={10}>Term 1</MenuItem>
            <MenuItem value={20}>Term 2</MenuItem>
            <MenuItem value={30}>Term 3</MenuItem>
          </Select>
        </div>
      </div>
    </Box>
  );
}