import { useEffect, useMemo, useState } from "react";
import axios from "../api/axios";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    customer: "",
    productId: "",
    quantity: 1,
  });

  const fetchData = async () => {
    try {
      setLoading(true);

      const [salesRes, productsRes, customersRes] = await Promise.all([
        axios.get("/sales"),
        axios.get("/products"),
        axios.get("/customers"),
      ]);

      setSales(salesRes.data.sales || []);
      setProducts(productsRes.data.products || []);
      setCustomers(customersRes.data.customers || []);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectedProduct = products.find(
    (product) => product._id === formData.productId
  );

  const totalAmount = useMemo(() => {
    if (!selectedProduct) return 0;
    return Number(selectedProduct.price || 0) * Number(formData.quantity || 0);
  }, [selectedProduct, formData.quantity]);

  const openModal = () => {
    setFormData({
      customer: "",
      productId: "",
      quantity: 1,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecordSale = async (e) => {
    e.preventDefault();

    if (!formData.productId) {
      alert("Please select a product");
      return;
    }

    if (Number(formData.quantity) < 1) {
      alert("Quantity must be at least 1");
      return;
    }

    if (selectedProduct && Number(formData.quantity) > selectedProduct.quantity) {
      alert("Not enough stock available");
      return;
    }

    const saleData = {
      customer: formData.customer || null,
      products: [
        {
          productId: formData.productId,
          quantity: Number(formData.quantity),
        },
      ],
    };

    try {
      await axios.post("/sales", saleData);
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error recording sale:", error);
      alert(error.response?.data?.message || "Failed to record sale");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this sale?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/sales/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting sale:", error);
      alert(error.response?.data?.message || "Failed to delete sale");
    }
  };

  return (
    <div className="p-6 bg-primary min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Sales</h1>
          <p className="text-white/50">Record sales and view sales history</p>
        </div>

        <button
          onClick={openModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow font-medium"
        >
          + Record Sale
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading sales...</p>
        ) : sales.length === 0 ? (
          <p className="p-6 text-gray-500">No sales found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Products</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Revenue</th>
                  <th className="px-6 py-4">Profit</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {sales.map((sale) => {
                  const totalQuantity = sale.products?.reduce(
                    (sum, item) => sum + Number(item.quantity || 0),
                    0
                  );

                  return (
                    <tr key={sale._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {sale.customer?.name || "Walk-in Customer"}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {sale.products?.map((item) => item.name).join(", ") ||
                          "N/A"}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {totalQuantity || 0}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        Rs. {sale.totalAmount ?? 0}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Rs. {sale.totalProfit ?? 0}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {sale.createdAt
                          ? new Date(sale.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(sale._id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-5 text-gray-800">
              Record Sale
            </h2>

            <form onSubmit={handleRecordSale} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer
                </label>
                <select
                  name="customer"
                  value={formData.customer}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                >
                  <option value="">Walk-in Customer</option>
                  {customers.map((customer) => (
                    <option key={customer._id} value={customer._id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product
                </label>
                <select
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name} - Rs. {product.price} - Stock:{" "}
                      {product.quantity}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max={selectedProduct?.quantity || ""}
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                />
              </div>

              <div className="rounded-lg bg-gray-100 p-4">
                <p className="text-sm text-gray-500">Auto Total</p>
                <p className="text-2xl font-bold text-gray-800">
                  Rs. {totalAmount}
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Record Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;