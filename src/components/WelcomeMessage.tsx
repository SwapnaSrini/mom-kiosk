import "./WelcomeMessage.css"
type User= {
   name : string
}
function WelcomeMessage ({name } : User){
    return(
    <div>
        <h2 className="welcomeback-header">Welcome back, {name}!</h2>
        <p>
          Give away baby items, connect with local moms,
          and plan play dates. #momtribe
        </p>
    </div>
    )
}
export default WelcomeMessage