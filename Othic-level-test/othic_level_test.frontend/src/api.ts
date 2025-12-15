// src/api.ts

const API_BASE_URL = 'http://localhost:5246';

export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  categoryId: number;
  categoryName: string;
};

export type Category = {
  id: number;
  name: string;
};

export type ProductFilterRequest = {
  categoryIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
};

export type ProductCreateRequest = {
  name: string;
  description: string;
  price: number;
  categoryId: number;
};

export type ProductUpdateRequest = ProductCreateRequest;

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error en la petición GET a ${url}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}


export async function fetchProducts(): Promise<Product[]> {
  return getJson<Product[]>(`${API_BASE_URL}/api/products`);
}

export async function fetchFilteredProducts(filter: ProductFilterRequest): Promise<Product[]> {
  const params = new URLSearchParams();

  if (filter.categoryIds && filter.categoryIds.length > 0) {
    filter.categoryIds.forEach((id) => params.append('categoryIds', id.toString()));
  }

  if (filter.minPrice !== undefined) {
    params.append('minPrice', filter.minPrice.toString());
  }

  if (filter.maxPrice !== undefined) {
    params.append('maxPrice', filter.maxPrice.toString());
  }
  
  if (filter.searchTerm && filter.searchTerm.trim() !== '') {
    params.append('searchTerm', filter.searchTerm.trim());
  }

  const query = params.toString();
  const url = query
    ? `${API_BASE_URL}/api/products/filter?${query}`
    : `${API_BASE_URL}/api/products`;

  return getJson<Product[]>(url);
}

export async function fetchProductById(id: number): Promise<Product> {
  return getJson<Product>(`${API_BASE_URL}/api/products/${id}`);
}

export async function createProduct(request: ProductCreateRequest): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Error al crear producto: ${response.status}`);
  }

  return response.json() as Promise<Product>;
}

export async function updateProduct(id: number, request: ProductUpdateRequest): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Error al actualizar producto: ${response.status}`);
  }

  return response.json() as Promise<Product>;
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Error al eliminar producto: ${response.status}`);
  }
}


export async function fetchCategories(): Promise<Category[]> {
  return getJson<Category[]>(`${API_BASE_URL}/api/categories`);
}

export async function fetchMaxProductPrice(): Promise<number> {
  return getJson<number>(`${API_BASE_URL}/api/products/max-price`);
}