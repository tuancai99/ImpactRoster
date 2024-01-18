import './App.css';
import { Routes, Route} from "react-router-dom";
import {TableComponent, VolunteerNote} from "./components";
function App() {

  return (
    <Routes>
        <Route path="/:role" element={<TableComponent />} />
        <Route path="volunteer/:id" element={<VolunteerNote />} />

    </Routes>
  );
}

export default App;
