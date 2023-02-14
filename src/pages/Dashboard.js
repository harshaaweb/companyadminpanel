import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import axios from "axios";
import StoreIcon from "@mui/icons-material/Store";
import "../styles/dashboard.css";
import GroupIcon from "@mui/icons-material/Group";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from "chart.js";
import WidgetsIcon from "@mui/icons-material/Widgets";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Bar, Pie } from "react-chartjs-2";
import { PolarArea } from "react-chartjs-2";
import { CircularProgress } from "@mui/material";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
);
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "start",
  color: theme.palette.text.secondary,
  borderRadius: 0,
  color: "#ffffff",
}));
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Recent Sales",
    },
  },
};
const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() =>
        // random number between 0 and 100
        Math.floor(Math.random() * 10000)
      ),
      backgroundColor: "#1A2027",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => Math.floor(Math.random() * 5000)),
      backgroundColor: "#F55D0B",
    },
  ],
};

export const polarData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function Dashboard() {
  // code to get the length of the all products

  const [products, setProducts] = useState([]);
  const getallproducts = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/my-products`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        // setProducts(res.data);

        //  code to count the length of the total products and set it to the state
        setProducts(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getallproducts();
  }, []);

  // code to get the length of the all auctions and set it to the state

  const [countacution, setCountacution] = useState([]);
  const getallacutions = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auctions`)
      .then((res) => {
        // console.log(res.data.length);
        // setProducts(res.data);
        // count the length of the total auctions and set it to the state
        setCountacution(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getallacutions();
  }, []);

  // code to count the length of the total contract and set it to the state
    const [allcontract, setAllcontract] = useState([]);
    const getallcontract = () => {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/contracts`)
        .then((res) => {  
          // count the length of the total contract and set it to the state
          setAllcontract(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    React.useEffect(() => {
      getallcontract();
    }, []);



  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginTop: 5,
          boxShadow: 0,
          animation: "fadeIn 0.5s ease-in-out",
          transition: "box-shadow 1s ease-in-out",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs>
            <Item
              className="itemcard"
              sx={{
                backgroundColor: "white",
              }}
            >
              <div>
                <Typography
                  sx={{
                    fontSize: 20,
                    color: "#1A2027",
                  }}
                >
                  Total Products
                </Typography>
                {products && products.length > 0 ? (
                  <Typography
                    sx={{
                      fontSize: 20,
                      color: "#1A2027",
                    }}
                  >
                    <CircularProgress size={17} />
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      fontSize: 20,
                      color: "#1A2027",
                    }}
                  >
                    {products}
                  </Typography>
                )}
              </div>
              <div
                style={{
                  backgroundColor: "#e5e7eb",
                  width: "50px",
                  height: "50px",
                  borderRadius: "10px",
                  textAlign: "center",
                  alignContent: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <GroupIcon style={{ fontSize: 30, color: "red" }} />
              </div>
            </Item>
          </Grid>
          <Grid item xs>
            <Item
              className="itemcard"
              sx={{
                backgroundColor: "white",
              }}
            >
              <div>
                <Typography
                  sx={{
                    fontSize: 20,
                    color: "#1A2027",
                  }}
                >
                  Total Auctions
                </Typography>
                <Typography
                  sx={{
                    fontSize: 20,
                    color: "#1A2027",
                  }}
                >
                  {countacution}
                </Typography>
              </div>
              <div
                style={{
                  backgroundColor: "#e5e7eb",
                  width: "50px",
                  height: "50px",
                  borderRadius: "10px",
                  textAlign: "center",
                  alignContent: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <PeopleOutlineIcon style={{ fontSize: 30, color: "#187FFF" }} />
              </div>
            </Item>
          </Grid>
          <Grid item xs>
            <Item
              className="itemcard"
              sx={{
                backgroundColor: "white",
              }}
            >
              <div>
                <Typography
                  sx={{
                    fontSize: 20,
                    color: "#1A2027",
                  }}
                >
                  Total Contracts
                </Typography>
                <Typography
                  sx={{
                    fontSize: 20,
                    color: "#1A2027",
                  }}
                >
                  {allcontract}
                </Typography>
              </div>
              <div
                style={{
                  backgroundColor: "#e5e7eb",
                  width: "50px",
                  height: "50px",
                  borderRadius: "10px",
                  textAlign: "center",
                  alignContent: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <WidgetsIcon style={{ fontSize: 30, color: "#F55D0B" }} />
              </div>
            </Item>
          </Grid>
          <Grid item xs>
            <Item
              className="itemcard"
              sx={{
                backgroundColor: "white",
              }}
            >
              <div>
                <Typography
                  sx={{
                    fontSize: 20,
                    color: "#1A2027",
                  }}
                >
                  Completed Products
                </Typography>
                <Typography
                  sx={{
                    fontSize: 20,
                    color: "#1A2027",
                  }}
                >
                  1,234
                </Typography>
              </div>
              <div
                style={{
                  backgroundColor: "#e5e7eb",
                  width: "50px",
                  height: "50px",
                  borderRadius: "10px",
                  textAlign: "center",
                  alignContent: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <SendTimeExtensionIcon
                  style={{ fontSize: 30, color: "#3EAF41" }}
                />
              </div>
            </Item>
          </Grid>
          <Grid item xs>
            <Item
              className="itemcard"
              sx={{
                backgroundColor: "white",
              }}
            >
              <div>
                <Typography
                  sx={{
                    fontSize: 20,
                    color: "#1A2027",
                  }}
                >
                  Total Vendors
                </Typography>
                <Typography
                  sx={{
                    fontSize: 20,
                    color: "#1A2027",
                  }}
                >
                  1,234
                </Typography>
              </div>
              <div
                style={{
                  backgroundColor: "#e5e7eb",
                  width: "50px",
                  height: "50px",
                  borderRadius: "10px",
                  textAlign: "center",
                  alignContent: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <StoreIcon style={{ fontSize: 30, color: "#F57171" }} />
              </div>
            </Item>
          </Grid>
        </Grid>
        <div className="chartcontainer">
          <div className="leftchart">
            <Bar
              data={data}
              options={options}
              style={{
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="rightchart">
            <Pie
              data={polarData}
              style={{
                width: "30%",
                height: "30%",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </Box>
    </>
  );
}
