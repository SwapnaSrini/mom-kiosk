import './WelcomeMessage.css'
type User = {
  name: string
}
function WelcomeMessage({ name }: User) {
  return (
    <div>
      <h2 className="welcomeback-header">Hello, {name}!</h2>
      <p>
        Give away or request used baby items, connect with parents or
        caregivers, and plan playdates.
      </p>
    </div>
  )
}
export default WelcomeMessage
