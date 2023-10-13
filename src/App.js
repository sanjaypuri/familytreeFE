import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewPerson from './pages/NewPerson';
import ListPersons from './pages/ListPersons';
import Relations from './pages/Relations';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer></ToastContainer>
      <div className="container-fluid d-flex flex-column vh-100 m-0 p-0">
        <div>
          <Navbar />
        </div>
        <div className="flex-grow-1 bg-secondary overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/newperson" element={<NewPerson />} />
            <Route path="/listpersons" element={<ListPersons />} />
            <Route path="/relations" element={<Relations />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
