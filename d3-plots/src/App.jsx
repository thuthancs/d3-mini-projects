import * as d3 from "d3";
import './App.css';
import SketchPlot from './components/SketchPlot';

function App() {
  // Create bar chart data with category and value
  const barData = d3.ticks(0, 10, 5).map((i) => ({
    cat: `Category ${i + 1}`,
    val: Math.random() * 100
  }));
  
  return (
    <>
      <h1>d3 mini projects</h1>
      <SketchPlot barData={barData} />
    </>
  )
}

export default App
