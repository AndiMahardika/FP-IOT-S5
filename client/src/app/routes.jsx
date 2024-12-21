import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./index.jsx"
import Kotoran from "../components/kotoran.jsx"
import Dashboard from "../components/Dashboard.jsx"

export default function RoutesApp(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Kotoran />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}