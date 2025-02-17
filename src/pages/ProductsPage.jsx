import axios from "axios";
import ReactLoading from 'react-loading';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ProductsPage () {
  const [products, setProducts] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      setIsScreenLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`);
        setProducts(res.data.products);
      } catch (error) {
        alert("取得產品失敗");
      } finally {
        setIsScreenLoading(false);
      }
    };
    getProducts();
  }, []);

  const addCartItem = async (product_id, qty, isFromModal = false) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
        data: {
          product_id,
          qty: Number(qty)
        }
      });
      alert("成功加入購物車");
    } catch (error) {
      alert("加入購物車失敗");
    } finally {
      setIsLoading(false);
    }
  };

  return(
    <>
      <div className="container">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{ width: "200px" }}>
                  <img
                    className="img-fluid"
                    src={product.imageUrl}
                    alt={product.title}
                  />
                </td>
                <td>{product.title}</td>
                <td>
                  <del className="h6 text-secondary">原價 {product.origin_price} 元</del>
                  <div className="h5">特價 {product.price}元</div>
                </td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <Link
                      to={`/products/${product.id}`}
                      // onClick={() => handleSeeMore(product)}
                      className="btn btn-outline-secondary"
                    >
                      查看更多
                    </Link>
                    <button
                      disabled={isLoading}
                      onClick={() => addCartItem(product.id, 1, false)}
                      type="button"
                      className="btn btn-outline-danger position-relative d-flex align-items-center justify-content-center gap-2"
                    >
                      <span>加入購物車</span>
                      {isLoading && (
                        <div
                          className="position-absolute"
                          style={{
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <ReactLoading
                            type={"spin"}
                            color={"#FF5049"}
                            height={"1.5rem"}
                            width={"1.5rem"}
                          />
                        </div>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      { isScreenLoading && (
        <div 
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            zIndex: 999,
          }}>
          <ReactLoading type="spin" color="#779ECB" width="4rem" height="4rem" />
        </div>)
      }
    </>
  )
}