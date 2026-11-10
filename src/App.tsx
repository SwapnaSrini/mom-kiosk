import './App.css'
import Header from './components/Header'
import WelcomeMessage from './components/WelcomeMessage'
import ProductsListPage from './pages/Products/ProductsList'
import ProductDetailsPage from './pages/Products/ProductsDetails'
import ViewPollsPage from './pages/Polls/ViewPolls'
import ViewEventsPage from './pages/Events/ViewEvents'
import CreateEventPage from './pages/Events/CreateEvent'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Tabs from './components/Tabs'
import { useState } from 'react'
import LocationSearch from './components/LocationSearch'
import type { LocationFilter } from './data/cities'

function App() {
  const [locationFilter, setLocationFilter] = useState<LocationFilter>({
    kind: 'all',
  })

  return (
    <div>
      <BrowserRouter>
        <Header />
        <WelcomeMessage name="Swapna" />
        <LocationSearch onChange={setLocationFilter} />
        <Tabs />
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />

          <Route
            path="/products"
            element={<ProductsListPage locationFilter={locationFilter} />}
          />

          <Route path="/products/:id" element={<ProductDetailsPage />} />

          <Route path="/polls" element={<ViewPollsPage />} />

          <Route
            path="/events"
            element={<ViewEventsPage locationFilter={locationFilter} />}
          />

          <Route path="/events/new" element={<CreateEventPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
