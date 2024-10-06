import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import HomePage from "./pages/HomePage";
import Redirect from "./pages/Redirect";
const queryClient = new QueryClient();
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QueryClientProvider client={queryClient}><HomePage /></QueryClientProvider>} />
          <Route path="/:urlId" element={<QueryClientProvider client={queryClient}><Redirect /></QueryClientProvider>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
