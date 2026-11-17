import './App.css'
import Header from './components/Header'
import WelcomeMessage from './components/WelcomeMessage'
import ProductsListPage from './pages/Products/ViewProductList'
import ProductDetailsPage from './pages/Products/ProductsDetails'
import ViewPollsPage from './pages/Polls/ViewPolls'
import ViewEventsPage from './pages/Events/ViewEvents'
import CreateEventPage from './pages/Events/CreateEvent'
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom'
import Tabs from './components/Tabs'
import LocationSearch from './components/LocationSearch'
import { toLocationFilter } from './data/cities'
import CreatePollPage from './pages/Polls/CreatePoll'

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

// Only the list pages filter by city, so only they show the search bar
const SEARCHABLE_PATHS = ['/products', '/polls', '/events']

function AppContent() {
  const { pathname } = useLocation()
  const showSearch = SEARCHABLE_PATHS.includes(pathname.replace(/\/+$/, ''))
  const [searchParams, setSearchParams] = useSearchParams()
  const cityParam = searchParams.get('city') ?? ''
  const locationFilter = toLocationFilter(cityParam) // derived from the URL, no separate state

  function handleSearch(text: string) {
    const trimmed = text.trim()
    setSearchParams(trimmed ? { city: trimmed } : {}) // adds a history entry, so Back works
  }
  return (
    <div>
      <Header />
      <WelcomeMessage name="Swapna" />
      <div
        className={`search-collapse${showSearch ? ' is-open' : ''}`}
        aria-hidden={!showSearch}
        inert={!showSearch}
      >
        <div className="search-collapse-inner">
          <LocationSearch
            key={cityParam}
            initialQuery={cityParam}
            invalid={locationFilter.kind === 'invalid'}
            onSearch={handleSearch}
          />
        </div>
      </div>
      <Tabs />
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />

        <Route
          path="/products"
          element={<ProductsListPage locationFilter={locationFilter} />}
        />

        <Route path="/products/:id" element={<ProductDetailsPage />} />

        <Route
          path="/polls"
          element={<ViewPollsPage locationFilter={locationFilter} />}
        />

        <Route path="/polls/new" element={<CreatePollPage />} />

        <Route
          path="/events"
          element={<ViewEventsPage locationFilter={locationFilter} />}
        />

        <Route path="/events/new" element={<CreateEventPage />} />
      </Routes>
    </div>
  )
}

export default App
