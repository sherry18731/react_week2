import { Outlet, NavLink } from "react-router-dom";
import './FrontLayout.scss';

export default function FrontLayout() {
  const routes = [
    { path: "/", name: "首頁", icon: "book_5" },
    { path: "/products", name: "產品列表", icon: "shopping_bag" },
    { path: "/cart", name: "購物車", icon: "shopping_cart" },
  ];

  return (<>
      {/* <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container">
          <ul className="navbar-nav flex-row gap-5 fs-5">
          {
            routes.map((routes) => (
              <li key={routes.path} className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={routes.path}>{routes.name}</NavLink>
              </li>
            )) 
          }
          </ul>
        </div>
      </nav> */}
      <nav className="navbar navbar-expand-lg mb-4 py-4">
        <div className="container">
        <NavLink className="navbar-brand" to=''>
          <img src="../src/assets/images/logo-2.png" alt="logo" style={{width: '200px'}}/>
        </NavLink>
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-4">
            {
              routes.map((routes) => (
                <li key={routes.path} className="nav-item">
                  <NavLink className="nav-link text-brand-01" to={routes.path}>
                  <span class="material-symbols-outlined align-bottom me-1">{routes.icon}</span>{routes.name}</NavLink>
                </li>
              )) 
            }
              <li className="nav-item">
                <NavLink className="nav-link text-brand-01" to=''>登入</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}