
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Posts from './components/Posts';
import Layout from './components/Layout';
import Indexpage from './components/Indexpage';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Usercontext from './Context/Usercontext';
import Createpost from './components/Pages/Createpost';
import Viewpage from './components/Pages/Viewpage';
import Editpage from './components/Pages/Editpage';


function App() {
  return (
    <>

<Usercontext>
      <Routes>
         
      <Route path="/" element={<Layout />}>

      <Route index element={<Indexpage /> } />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      
      <Route path="/create" element={<Createpost />} />

      <Route path="/view/:id" element={<Viewpage />} />

      <Route path="/edit/:id" element={<Editpage />} />

</Route>

      </Routes>
      </Usercontext>


    </>
  );
}

export default App;
