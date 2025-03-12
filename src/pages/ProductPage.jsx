import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import ProductModal from "../components/ProductModal";
import DelProductModal from "../components/DelProductModal";
import Toast from "../components/Toast";
import { useDispatch } from "react-redux";
import { pushMessage } from "../redux/toastSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""]
};

function ProductPage({ setIsAuth }) {
  const [products, setProducts] = useState([])
  const [modalMode, setModalMode] = useState(null)
  const [isProductsModalOpen, setIsProductsModalOpen] = useState(false)
  const [isDelProductsModalOpen, setIsDelProductsModalOpen] = useState(false)
  const dispatch = useDispatch();

  const getProducts = async (page = 1) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`
      );
      setProducts(res.data.products);
      setPageInfo(res.data.pagination);
    } catch (error) {
      alert("取得產品失敗",error);
    }
  };

  useEffect(() => {
    getProducts()
  },[])


const handleOpenDelProductModal = (product) => {
  setTempProduct(product)
  setIsDelProductsModalOpen(true)
}

const [tempProduct, setTempProduct] = useState(defaultModalState);

  const handleOpenProductModal = (mode, product) => {
    setModalMode(mode);
    
    switch (mode) {
      case 'create':
        setTempProduct(defaultModalState);
        break;
  
        case 'edit':
          setTempProduct({
          ...defaultModalState,
          ...product,
          imagesUrl: product.imagesUrl || [],
          });
          break;
    
      default:
        break;
    }
  
    setIsProductsModalOpen(true)
  }

  const  [pageInfo, setPageInfo] = useState({})

  const handlePageChange = (page) => {
    getProducts(page)
  }

  useEffect(() => {
    getProducts()
  },[])

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/v2/logout`);
      setIsAuth(false);
    } catch (error) {
      dispatch(pushMessage({ text: "登出失敗", status: "danger" }));
      // alert("喔齁～出不去了",error);
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="row mb-3">
          <div className="justify-content-end">
            <button onClick={handleLogout} type="button" className="btn btn-secondary">
              登出
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between">
            <h2>產品列表</h2>
            <button onClick={() => handleOpenProductModal('create')} type="button" className="btn btn-primary">建立新的產品</button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>{product.is_enabled == true ? <span className="text-success">啟用</span> : <span className="text-secondary">未啟用</span>}</td>
                    <td>
                    <div className="btn-group">
                      <button onClick={() => handleOpenProductModal('edit', product)} type="button" className="btn btn-outline-primary btn-sm">編輯</button>
                      <button onClick={() => handleOpenDelProductModal(product)} type="button" className="btn btn-outline-danger btn-sm">刪除</button>
                    </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange}></Pagination>
        </div>
      </div>

      <ProductModal 
      modalMode={modalMode} 
      tempProduct={tempProduct} 
      isOpen={isProductsModalOpen} 
      setIsOpen={setIsProductsModalOpen}
      getProducts={getProducts} />

      <DelProductModal 
      tempProduct={tempProduct} 
      isOpen={isDelProductsModalOpen} 
      setIsOpen={setIsDelProductsModalOpen}
      getProducts={getProducts}/>

      <Toast/>
    </>
  )
}

export default ProductPage;