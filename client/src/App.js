import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Books from "./pages/Books";
import Add from "./pages/Add";
import Update from "./pages/Update";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          {/* path 是这个页面的位置 element是要展示的页面 Books 写好的页面掉包过来的 
        Books 这些也要用标签的形式  <Books/>*/}
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
