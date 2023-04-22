import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./views/Login/Login";
import Layout from "./views/Layout/Layout";
import Layout_Buy from "./views/Layout_Buy/Layout_Buy";
import Layout_hotel from "./views/Layout_hotel/Layout_hotel";
import HotelDetail from "./views/HotelDetail/HotelDetail";
import Layout_PersonCenter from "./views/Layout_PersonCenter/Layout_PersonCenter";
import "../src/mock";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/layout/" element={<Layout />}>
          <Route path="personcenter" element={<Layout_PersonCenter />}></Route>
          <Route path="buy" element={<Layout_hotel />}>
            <Route path="buyhotel" element={<Layout_Buy />}></Route>
            <Route path="hoteldetail" element={<HotelDetail />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
