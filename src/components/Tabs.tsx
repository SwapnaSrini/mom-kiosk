import { NavLink, useLocation } from 'react-router-dom'
import './Tabs.css'

function Tabs() {
  const { search } = useLocation()
  return (
    <nav className="tabs">
      <NavLink to={{ pathname: '/products', search }}>Giveaways</NavLink>
      <NavLink to={{ pathname: '/polls', search }}>Polls</NavLink>
      <NavLink to={{ pathname: '/events', search }}>Events</NavLink>
    </nav>
  )
}
export default Tabs
