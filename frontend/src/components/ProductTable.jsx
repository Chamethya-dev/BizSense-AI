import { Pencil, Trash2, AlertTriangle } from 'lucide-react'

export default function ProductTable({ products = [], onEdit, onDelete, loading = false }) {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="shimmer h-12 rounded-lg" />
        ))}
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="text-center py-16 text-white/30">
        <p className="text-sm">No products found</p>
        <p className="text-xs mt-1">Add your first product to get started</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-surface-border">
            <th className="table-header text-left pb-3 pr-4">Product</th>
            <th className="table-header text-left pb-3 pr-4">SKU</th>
            <th className="table-header text-right pb-3 pr-4">Price</th>
            <th className="table-header text-right pb-3 pr-4">Stock</th>
            <th className="table-header text-left pb-3 pr-4">Category</th>
            <th className="table-header text-right pb-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border">
          {products.map((product) => {
            const isLowStock = product.quantity <= (product.reorderPoint || 10)
            return (
              <tr key={product._id} className="group hover:bg-surface-raised/40 transition-colors">
                <td className="py-3 pr-4">
                  <p className="table-cell font-500">{product.name}</p>
                  {product.description && (
                    <p className="text-xs text-white/30 mt-0.5 truncate max-w-[200px]">{product.description}</p>
                  )}
                </td>
                <td className="py-3 pr-4">
                  <span className="text-xs font-mono text-white/40">{product.sku || '—'}</span>
                </td>
                <td className="py-3 pr-4 text-right">
                  <span className="font-mono text-sm text-jade">${Number(product.price || 0).toFixed(2)}</span>
                </td>
                <td className="py-3 pr-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {isLowStock && <AlertTriangle size={12} className="text-amber-alert" />}
                    <span className={`font-mono text-sm ${isLowStock ? 'text-amber-alert' : 'text-white/70'}`}>
                      {product.quantity ?? 0}
                    </span>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  {product.category ? (
                    <span className="badge-blue">{product.category}</span>
                  ) : <span className="text-white/25 text-xs">—</span>}
                </td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit?.(product)}
                      className="p-1.5 rounded-md text-white/40 hover:text-electric hover:bg-electric/10 transition-colors"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => onDelete?.(product._id)}
                      className="p-1.5 rounded-md text-white/40 hover:text-rose-alert hover:bg-rose-alert/10 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}