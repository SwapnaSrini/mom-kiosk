import "./Tabs.css"
type TabsProps = {
    activeTab: string
    onTabChange: (tab: string) => void
}

function Tabs ({activeTab , onTabChange }: TabsProps) {
    return (
        <nav className="tabs">
            <button onClick={() => onTabChange("products")}
                className={activeTab === "products" ? "tab active" : "tab"}>
                Products
            </button>
            <button onClick={() => onTabChange("polls")}
                className={activeTab === "polls" ? "tab active" : "tab"}>
                Polls
            </button>
            <button onClick={() => onTabChange("events")}
                className={activeTab === "events" ? "tab active" : "tab"}>
                Events
            </button>
        </nav>
    )
}
export default Tabs