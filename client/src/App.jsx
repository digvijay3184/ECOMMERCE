import { Routes, Route } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import AuthLayout from "./components/auth/layout.jsx"
import AuthLogin from "./pages/auth/login.jsx"
import AuthRegister from "./pages/auth/register.jsx"
import AdminLayout from "./components/admin-view/layout.jsx"
import AdminDashboard from "./pages/admin-view/dashboard.jsx"
import AdminProducts from "./pages/admin-view/products.jsx"
import AdminOrders from "./pages/admin-view/orders.jsx"
import AdminFeatures from "./pages/admin-view/features.jsx"
import ShoppingLayout from "./components/shopping-view/layout.jsx"
import NotFound from "./pages/not-found/index.jsx"
import ShoppingHome from "./pages/shopping-view/home.jsx"
import ShoppingListing from "./pages/shopping-view/listing.jsx"
import ShoppingCheckout from "./pages/shopping-view/checkout.jsx"
import ShoppingAccount from "./pages/shopping-view/account.jsx"
import CheckAuth from "./components/common/check-auth.jsx"
import Unauth from "./pages/un-auth/unauth.jsx"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuthUser } from "./store/auth-slice/index.js"

function App() {
  const {isAuthenticated, user , isLoading} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuthUser())
  },[dispatch])

  if(isLoading)return <Skeleton className="w-[100px] h-[20px] bg-slate-800 rounded-full" />


  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white ">
        <h1>Header Component</h1>
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }>
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>
          {/* Admin Routes */}
          <Route path="/admin" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>
          {/* Shopping Routes */}
          <Route path="/shopping" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }>
            <Route path="home" element={<ShoppingHome />} />
            <Route path="listing" element={<ShoppingListing/>} />
            <Route path="checkout" element={<ShoppingCheckout/>} />
            <Route path="account" element={<ShoppingAccount/>} />
          </Route>
          <Route path="/unauth" element={<Unauth/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
