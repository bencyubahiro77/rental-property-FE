import { Routes, Route } from "react-router-dom"
import Property from './pages/Admin/property'
import Booking from './pages/Admin/Booking'
import Home from './pages/Admin/Login'
import CreateAndUpdateProperty from "./pages/Admin/createandUpdateProperty"
import { ThemeProvider } from "@/AppComponent/theme-provider"
import ProtectedRoute from "./utils/protectedRoute"
import '@fontsource/nunito-sans/400.css';
import '@fontsource/nunito-sans/600.css';
import '@fontsource/nunito-sans/700.css';
import './App.css'

const App: React.FC = () => {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Protected routes by admin and hosts */}
          <Route element={<ProtectedRoute allowedRoles={['Admin', "Hosts"]} />}>
            <Route path="admin/booking" element={<Booking />} />
            <Route path="authorized/createProperty" element={<CreateAndUpdateProperty />} />
            <Route path="admin/property" element={<Property />} />
          </Route>
        </Routes>
      }
    </ThemeProvider>
  )
}
export default App
