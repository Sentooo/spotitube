import Layout from "../Layout/Layout";

import "../assets/css/dashboard.css";

// chart imports
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import { Breadcrumbs, Typography } from "@mui/material";
import { HomeOutlined } from "@mui/icons-material";

import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";

function Dashboard() {
  const listenersCanvasRef = useRef(null);
  useEffect(() => {
    const listenersData = {
      labels: ["Artist 1", "Artist 2", "Artist 3", "Artist 4"],
      datasets: [
        {
          label: "Number of Listeners",
          backgroundColor: "white",
          borderColor: "white",
          borderWidth: 1,
          data: [10000, 25000, 30000, 8000],
        },
      ],
    };

    const listenersCanvas = listenersCanvasRef.current;

    if (listenersCanvas) {
      if (listenersCanvas.chart) {
        listenersCanvas.chart.destroy();
      }

      listenersCanvas.chart = new Chart(listenersCanvas, {
        type: "bar",
        data: listenersData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "white",
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "white",
              },
            },
          },
        },
      });
    }
  }, []);
  return (
    <>
      <Layout activePage={"Dashboard"}>
        {/* Page Content */}
        <div className="container w-100 h-100 m-0 p-3 py-2 dashboard-container overflow-hidden ">
          {/* Dashboard title Row */}
          <div className="row w-auto m-0 overflow-x-hidden overflow-y-auto">
            <div className="col p-2 m-0 mt-1 page-title d-flex align-items-center justify-content-between ">
              <h1 className="m-0">Dashboard</h1>
              {/* Breadcrumb Component */}
              <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
                <Link color="#fffffff2" to="/">
                  <HomeOutlined
                    className="home-breedcrumbs"
                    fontSize="small"
                    title="Home"
                  />
                </Link>
                <Typography color="#d40000" fontSize="small">
                  Dashboard
                </Typography>
              </Breadcrumbs>
            </div>
          </div>

          {/* Charts Section */}
          <div className="container col-md-10">
            <div
              className="card border-black mb-4"
              style={{ border: "2px solid black" }}
            >
              <div
                className="card-body bg-maroon"
                style={{ backgroundColor: "maroon" }}
              >
                <h5 className="card-title text-white text-center mb-4">
                  Number of Listeners
                </h5>
                <canvas
                  id="listenersChart"
                  width="400"
                  height="200"
                  ref={listenersCanvasRef}
                ></canvas>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card bg-maroon border-black mb-3 mt-2">
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <h5 className="card-title text-white mb-3">
                      Number of Artist
                    </h5>
                    <h4 className="text-center text-white">
                      133,122 listeners
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-maroon border-black mb-3 mt-1">
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <h5 className="card-title text-white mb-3">Top Music</h5>
                    <h3 className="text-center text-white">
                      133,122 Listeners
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-maroon border-black mb-3 mt-1">
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <h5 className="card-title text-white mb-3">
                      Number of Viewers
                    </h5>
                    <h3 className="text-center text-white">133,122 viewers</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-maroon border-black mb-3 mt-1">
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <h5 className="card-title text-white mb-3">Top Podcasts</h5>
                    <h3 className="text-center text-white">
                      133,122 Listeners
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;
