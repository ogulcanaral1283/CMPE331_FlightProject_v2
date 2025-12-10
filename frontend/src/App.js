import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FlightSearch from "./pages/FlightSearch";
import FlightDetail from "./components/FlightDetail";
import SeatSelection from "./components/SeatSelection";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import PrivateRoute from "./auth/PrivateRoute";
import PassengerInfo from "./components/PassengerInfo";
import { AuthProvider } from "./auth/AuthContext"; // ✅ ÖNEMLİ
import FlightsPage from "./pages/FlightsPage";
import SelectPassengers from "./pages/SelectPassengers";
import BookingSuccess from "./pages/BookingSuccess";
import RosterManagement from "./pages/RosterManagement";
import CrewManagement from "./pages/CrewManagement";



function App() {
  console.log("Home:", Home);
  console.log("FlightSearch:", FlightSearch);
  console.log("FlightDetail:", FlightDetail);
  console.log("SeatSelection:", SeatSelection);
  console.log("PassengerInfo:", PassengerInfo);
  console.log("AdminDashboard:", AdminDashboard);
  console.log("PrivateRoute:", PrivateRoute);
  console.log("Login:", Login);
  return (
    <AuthProvider> {/* ✅ Tüm uygulama bunun içinde */}
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<FlightSearch />} />
          <Route path="/flight/:flightNumber" element={<FlightDetail />} />
          <Route path="/flights/:flightNumber/select-seats" element={<SeatSelection />} />
          <Route path="/flights/:flightNumber/passenger-info" element={<PassengerInfo />} />
          <Route path="/flights/:flightNumber/select-passengers" element={<SelectPassengers />} />
          <Route path="/booking-success" element={<BookingSuccess />} />

          <Route path="/login" element={<Login />} />

          {/* 🔒 Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/roster"
            element={
              <PrivateRoute>
                <RosterManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/flights"
            element={
              <PrivateRoute>
                <FlightsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <PrivateRoute>
                <CrewManagement />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;
