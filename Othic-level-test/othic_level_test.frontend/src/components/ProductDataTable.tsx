import { useRef } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { type Product } from '../api';

type ProductDataTableProps = {
  products: Product[];
  loading?: boolean;
  onEditProduct?: (product: Product) => void;
  onDeleteProduct?: (product: Product) => void; 
};

export default function ProductDataTable({ products, loading, onEditProduct, onDeleteProduct }: ProductDataTableProps) {
  const ds = useRef<DataScroller>(null);
  
  const footer = <Button icon="pi pi-plus" className="w-[120px] px-3 py-3 rounded shadow-lg text-white " label="Load" onClick={() => ds.current?.load()} style={{ backgroundColor: '#3188f7' }} />;

  const itemTemplate = (product: Product) => {
        return (
        <div className="w-full mb-3 px-3 border border-slate-300 rounded shadow-lg py-3">
            <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
                <div className="text-sm text-slate-500">#{product.id}</div>
                <div className="text-lg font-semibold">{product.name}</div>
                <div className="text-sm text-slate-600">
                {product.description}
                </div>
                <div className="text-sm text-slate-500">
                Categoría: <strong>{product.categoryName}</strong>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="text-lg font-bold text-green-600">
                    {product.price.toFixed(2)} €
                </p>
                <div className='flex items-center justify-center gap-3'>
                    <Button icon="pi pi-pencil" className=" mt-2 ps-4 pe-2 py-2 text-white gap-2 rounded" style={{ backgroundColor: '#3188f7' }} onClick={() => onEditProduct?.(product)} />
                    <Button icon="pi pi-trash" className="mt-2 ps-4 pe-2 py-2 text-white gap-2 rounded" style={{ backgroundColor: '#dc2626' }} onClick={() => onDeleteProduct?.(product)}/>

                </div>
            </div>
            </div>
        </div>
        );
    };

  return (
    <div>

    <DataScroller
        ref={ds}
        value={products}
        itemTemplate={itemTemplate}  
        rows={5}
        loader={loading}
        footer={footer}
        
      />
    </div>
    
  );
}