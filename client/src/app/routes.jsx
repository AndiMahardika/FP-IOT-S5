import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "../components/Dashboard.jsx"
import DashboardBath from "../components/bathing.jsx"
import DashboardCleaning from "../components/cleaning.jsx"

export default function RoutesApp(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardCleaning />} />
        <Route path="/bathing" element={<DashboardBath />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}