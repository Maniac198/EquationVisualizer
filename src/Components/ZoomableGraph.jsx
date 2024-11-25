import React, { useState } from 'react';
import Plot from 'react-plotly.js';

const ZoomableGraph = ({ data }) => {
  const formattedData = [
    {
      x: data.map(point => point.x),
      y: data.map(point => point.y),
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'red' }
    }
  ];

  return (
    <Plot
      data={formattedData}
      layout={{
        title: 'Interactive Graph',
        xaxis: { title: 'X-axis' },
        yaxis: { title: 'Y-axis' },
        dragmode: 'pan',  // Enable panning
        responsive: true
      }}
    />
  );
};

export default ZoomableGraph;
