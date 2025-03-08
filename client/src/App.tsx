import { Button } from "@/components/ui/button"
import { ModeToggle } from "./components/modeToggle"

function App() {
  return (
    <>
    <ModeToggle />
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>Click me</Button>
    </div>
    </>
  )
}

export default App
