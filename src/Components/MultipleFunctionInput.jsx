import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import Plot from 'react-plotly.js';

const MultipleFunctionInput = () => {
  const [expressions, setExpressions] = useState(['x^2']);
  const [graphData, setGraphData] = useState([]);

  // Update function when the input field changes
  const handleChange = (index, value) => {
    const updatedExpressions = [...expressions];
    updatedExpressions[index] = value;
    setExpressions(updatedExpressions);
  };

  // Generate data for all functions and display them on the same graph
  const generateData = () => {
    const allData = expressions.map((expr) => {
      const points = {
        x: [],
        y: [],
        name: expr, // Use the function expression as the name
        mode: 'lines',
        type: 'scatter'
      };

      // Calculate y-values for a range of x-values
      for (let x = -10; x <= 10; x += 0.5) {
        try {
          const y = evaluate(expr, { x });
          points.x.push(x);
          points.y.push(y);
        } catch (error) {
          console.error(`Error evaluating expression "${expr}":`, error);
        }
      }

      return points;
    });

    setGraphData(allData);
  };

  // Add a new function input field
  const addFunction = () => {
    setExpressions([...expressions, '']);
  };

  return (
    <div className="input-container">
      {/* Input fields for functions */}
      {expressions.map((expr, index) => (
        <input
          key={index}
          type="text"
          value={expr}
          onChange={(e) => handleChange(index, e.target.value)}
          placeholder={`Function ${index + 1}`}
          className="input-field"
        />
      ))}
      
      {/* Buttons to add a function or plot all */}
      <div className="button-container">
        <button onClick={addFunction}>Add Function</button>
        <button onClick={generateData}>Plot All</button>
      </div>

      {/* Plot the graph in the graph container */}
      <div className="graph-container">
        {graphData.length > 0 && (
          <Plot
            data={graphData}
            layout={{
              title: 'Multiple Function Plot',
              xaxis: { title: 'X-axis' },
              yaxis: { title: 'Y-axis' },
              responsive: true,
              autosize: true,
            }}
            style={{ width: '100%', height: '600px' }}
            useResizeHandler={true}
          />
        )}
      </div>
    </div>
  );
};

export default MultipleFunctionInput;
