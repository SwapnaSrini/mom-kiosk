
import './App.css'
import Header from './components/Header'
import WelcomeMessage from './components/WelcomeMessage'
import ProductsListPage from "./pages/Products/ProductsList"
import ProductDetailsPage from "./pages/Products/ProductsDetails"
import ViewPollsPage from "./pages/Polls/ViewPolls"
import ViewEventsPage from "./pages/Events/ViewEvents"
import { BrowserRouter , Route, Routes} from "react-router-dom"
import Tabs from './components/Tabs'

function App() {
 
  return (
    <div>
      <BrowserRouter>
       <Header/>
        <WelcomeMessage name="Swapna"/>
        <Tabs />
      <Routes>
        <Route
          path="/products"
          element={<ProductsListPage />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetailsPage />}
        />

        <Route
          path="/polls"
          element={<ViewPollsPage />}
        />

        <Route
          path="/events"
          element={<ViewEventsPage />}
        />

      </Routes>
      </BrowserRouter>
     
    </div>
  )}
export default App
