import { useState } from "react"
import './App.css'
import Header from './components/Header'
import WelcomeMessage from './components/WelcomeMessage'
import ProductsListPage from "./pages/Products/ProductsList"
import ProductDetailsPage from "./pages/Products/ProductsDetails"
import Tabs from "./components/Tabs"
import ViewPollsPage from "./pages/Polls/ViewPolls"
import ViewEventsPage from "./pages/Events/ViewEvents"
import { BrowserRouter , Route, Routes} from "react-router-dom"

function App() {
  const [activeTab, setActiveTab] = useState("products")
 
  return (
    <div>
      <BrowserRouter>
       <Header/>
        <WelcomeMessage name="Swapna"/>
      <Tabs
      activeTab={activeTab}
      onTabChange={setActiveTab}
      />
      {activeTab === "products" && (
        <ProductsListPage/>
     )}
      {activeTab === "polls" && (
        <ViewPollsPage />
     )}
      {activeTab === "events" && (
        <ViewEventsPage />
     )}
      <Routes>
        <Route
          path="/products"
          element={<ProductsListPage />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetailsPage />}
        />

      </Routes>
      </BrowserRouter>
     
    </div>
  )}
export default App
