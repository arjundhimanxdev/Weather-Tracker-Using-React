import { Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/Home";


const AppRoutes = () => {
  return (
    <>
    <Suspense 
        fallback={<p className="text-black">Page is Loading...</p>}>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
    </Suspense>
    </>
  )
}

export default AppRoutes;