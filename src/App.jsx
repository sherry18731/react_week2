/* eslint-disable no-unused-vars */
import { useState } from "react"
import axios from 'axios'

const {VITE_BASE_URL, VITE_API_PATH} = import.meta.env

function App() {
  const [isAuth, setIsAuth] = useState(false)

  const [tempProduct, setTempProduct] = useState({})
  const [products, setProduct] =useState([])

  const [account, setAccount] = useState({
    username: "example@test.com",
    password: "example"
  })
  
  const handleInputChange = (e) => {
    const {value, name} = e.target;
    setAccount({
      // 展開資料，此處會等於{username: "example@test.com",password: "example"}
      ...account,
      // [name]筆記待補
      [name]: value
    })
  }
  const handleLogin = (e) => {
    // 取消預設行爲，讓事件也可以通過按enter觸發
    e.preventDefault();
    axios.post(`${VITE_BASE_URL}/v2/admin/signin`, account)
      .then((res) => {
        // 取得 token, expired，並存入cookie中
        const { token, expired } = res.data;
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;

        axios.defaults.headers.common['Authorization'] = token;

        axios.get(`${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/products`)
          .then((res) => setProduct(res.data.products))
          .catch((error) => console.log(error))
        setIsAuth(true)
      })
      .catch(() => alert('登入失敗'))
  }

  const checkUserLogin = async() => {
    axios.post(`${VITE_BASE_URL}/v2/api/user/check`)
      .then((res) => alert('使用者已登入'))
      .catch((error) => console.error(error))
  }

  return (
    <>
      {isAuth ? (
    <div className="container py-5">
      <div className="row">
        <div className="col-6">
          <button onClick={checkUserLogin} className="btn btn-success mb-5" type="button">檢查是否登入</button>
          <h2>雪場列表</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">雪場名稱</th>
                <th scope="col">雪道數量</th>
                <th scope="col">纜車數量</th>
                <th scope="col">夜間滑雪</th>
                <th scope="col">詳細資料</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.title}</th>
                  <td>{product.skiRuns}</td>
                  <td>{product.cableCars}</td>
                  <td>{product.is_enabled === true ? "有" : "無"}</td>
                  <td>
                    <button
                      onClick={() => setTempProduct(product)}
                      className="btn btn-primary"
                      type="button"
                    >
                      查看細節
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-6">
          <h2>雪場介紹</h2>
          {tempProduct.title ? (
            <div className="card">
              <img
                src={tempProduct.imageUrl}
                className="card-img-top img-fluid"
                alt={tempProduct.title}
              />
              <div className="card-body">
              <span className="badge text-bg-primary mb-2">{tempProduct.category}</span>
                <h5 className="card-title">{tempProduct.title}</h5>
                <h4 className="card-title">{tempProduct.japaneseTitle}</h4>
                <p className="card-text">雪場描述：{tempProduct.describe}</p>
                <p className="card-text">最長坡道：{tempProduct.longestDistance}</p>
                <p className="card-text">最大坡度：{tempProduct.maxSlope}{" "}度</p>
                {/* <h5 className="card-title">更多圖片：</h5>
                {tempProduct.imagesUrl?.map((image) => (image && (<img key={image} src={image} className="img-fluid" />)))} */}
              </div>
            </div>
          ) : (
            <p>請選擇一個商品查看</p>
          )}
        </div>
      </div>
    </div>
  ) : 
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="mb-5">請先登入</h1>
        {/* 常見的做法會是在form標籤上面綁定onSubmit，而非綁定在button上綁onClick */}
        <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
          <div className="form-floating mb-3">
            {/* 在input上綁定name, value, onchange */}
            <input name="username" value={account.username} onChange={handleInputChange} type="email" className="form-control" id="username" />
            <label htmlFor="username">Email address</label>
          </div>
          <div className="form-floating">
            <input name="password" value={account.password} onChange={handleInputChange} type="password" className="form-control" id="password"/>
            <label htmlFor="password">Password</label>
          </div>
          <button className="btn btn-info">登入</button>
        </form>
        <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
      </div>}
    </>
  )
}

export default App
