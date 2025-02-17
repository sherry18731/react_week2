import { createHashRouter } from "react-router-dom";

import FrontLayout from "../layouts/FrontLayout";
import Home from "../pages/Home";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import NotFound from "../pages/NotFound";

const router = createHashRouter([
  {
    path:'/',
    element: <FrontLayout />,
    children: [
      {
        path:'',
        element: <Home />,
      },
      {
        path:'products',
        element: <ProductsPage />,
      },
      {
        path:'products/:id',
        element: <ProductDetailPage />,
      },
      {
        path:'cart',
        element: <CartPage />,
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router;