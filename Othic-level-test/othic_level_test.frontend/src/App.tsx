import { useEffect, useState } from 'react';

import Header from './components/Header';
import CategoriesMenu from './components/CategoriesMenu';
import FiltersMenu from './components/FiltersMenu';
import ProductDataTable from './components/ProductDataTable';
import ModalProduct from './components/ModalProduct';
import { Dialog } from 'primereact/dialog';

import {
  fetchProducts,
  fetchCategories,
  fetchFilteredProducts,
  fetchMaxProductPrice,
  deleteProduct,
  type Product,
  type Category,
  type ProductFilterRequest,
} from './api';


function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [maxAvailablePrice, setMaxAvailablePrice] = useState<number | null>(null);


  const loadProducts = async () => {
    try {
      setLoadingProducts(true);

      let data: Product[];
      
      const filter: ProductFilterRequest = {};

       if (selectedCategoryIds.length > 0) {
        filter.categoryIds = selectedCategoryIds;
      }

      if (maxPrice !== null) {
        filter.maxPrice = maxPrice;
      }

      
      const trimmedSearch = searchTerm.trim();
      
      if (trimmedSearch !== '') {
        filter.searchTerm = trimmedSearch;
      }

      const hasFilters =
        !!filter.categoryIds ||
        filter.maxPrice !== undefined ||
        !!filter.searchTerm;

      if (!hasFilters) {
        data = await fetchProducts();
      } else {
        data = await fetchFilteredProducts(filter);
      }

      setProducts(data);

    } catch (error) {
      console.error(error);
      alert('No se pudieron cargar los productos');
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
      alert('No se pudieron cargar las categorías');
    } finally {
      setLoadingCategories(false);
    }
  };
  const loadMaxPrice = async () => {
    try {
      const value = await fetchMaxProductPrice();
      setMaxAvailablePrice(value);

      setMaxPrice((prev) => (prev === null ? value : prev));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCategories();
    loadMaxPrice();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [selectedCategoryIds, maxPrice, searchTerm]);

  const handleProductUpdated = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setSelectedProduct(updated);
  };

  const handleDeleteProduct = async (product: Product) => {
  const confirmed = window.confirm(
      `¿Seguro que quieres eliminar "${product.name}"?`
    );
    if (!confirmed) return;

    try {
      await deleteProduct(product.id);

      setProducts((prev) => prev.filter((p) => p.id !== product.id));

      if (selectedProduct && selectedProduct.id === product.id) {
        setSelectedProduct(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      alert('No se pudo eliminar el producto');
    }
  };


  return (
    <div className="px-28">
      <Header />
      
      <div className='pt-3'>
        <CategoriesMenu 
          categories={categories} 
          loading={loadingCategories} 
          selectedCategoryIds={selectedCategoryIds}
          onChangeSelectedCategories={setSelectedCategoryIds}
          />
      </div>

      <div className='pt-3'>
        <FiltersMenu 
          maxPrice={maxPrice}
          onChangeMaxPrice={setMaxPrice}
          searchTerm={searchTerm}
          onChangeSearchTerm={setSearchTerm}
          onChangeSelectedCategories={setSelectedCategoryIds}
          maxAvailablePrice={maxAvailablePrice}
          />
      </div>

      <div className="pb-10">
        <ProductDataTable 
          products={products} 
          loading={loadingProducts} 
          onEditProduct={(product) => {
            setSelectedProduct(product);
            setModalVisible(true);
          }} 
          onDeleteProduct={handleDeleteProduct}
          />
      </div>

      <Dialog
        header="Editar producto"
        visible={modalVisible}
        style={{ width: '70vw', padding: '2rem', backgroundColor: 'white' }}
        onHide={() => setModalVisible(false)}
        modal
      >
        {selectedProduct && 
          <ModalProduct 
            product={selectedProduct} 
            setModalVisible={setModalVisible} 
            categories={categories} 
            onProductUpdated={handleProductUpdated} />}
      </Dialog>
    </div>
  );
}

export default App;
