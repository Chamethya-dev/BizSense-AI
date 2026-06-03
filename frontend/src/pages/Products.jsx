import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const emptyForm = {
    name: "",
    category: "",
    price: "",
    costPrice: "",
    quantity: "",
    supplier: "",
    lowStockLimit: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/products");
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      costPrice: product.costPrice || "",
      quantity: product.quantity || "",
      supplier: product.supplier || "",
      lowStockLimit: product.lowStockLimit || "",
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      costPrice: Number(formData.costPrice),
      quantity: Number(formData.quantity),
      supplier: formData.supplier,
      lowStockLimit: Number(formData.lowStockLimit),
    };

    try {
      if (editingProduct) {
        await axiosInstance.put(`/products/${editingProduct._id}`, productData);
      } else {
        await axiosInstance.post("/products", productData);
      }

      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert(error.response?.data?.error || "Error saving product");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(error.response?.data?.error || "Error deleting product");
    }
  };

  return (
    <div className="p-6 bg-primary min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-white/50">Manage your inventory products</p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow font-medium"
        >
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="p-6 text-gray-500">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Selling Price</th>
                  <th className="px-6 py-4">Cost Price</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Low Stock Limit</th>
                  <th className="px-6 py-4">Supplier</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {product.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {product.category || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Rs. {product.price ?? 0}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Rs. {product.costPrice ?? 0}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.quantity <= product.lowStockLimit
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.quantity ?? 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {product.lowStockLimit ?? 0}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {product.supplier || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-5 text-gray-800">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost Price
                </label>
                <input
                  type="number"
                  name="costPrice"
                  value={formData.costPrice}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Low Stock Limit
                </label>
                <input
                  type="number"
                  name="lowStockLimit"
                  value={formData.lowStockLimit}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier
                </label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                />
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
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;