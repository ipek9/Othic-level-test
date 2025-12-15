using Microsoft.EntityFrameworkCore;
using othic_level_test.Data;

namespace othic_level_test.Services
{

    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<ProductDto>> GetAllAsync()
        {
            return await _context.Products
                .Include(p => p.Category) // para poder sacar el nombre de la categoría
                .Select(p => new ProductDto(
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.CategoryId,
                    p.Category != null ? p.Category.Name : string.Empty
                ))
                .ToListAsync();
        }

        public async Task<ProductDto?> GetByIdAsync(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);
            if (product == null) return null;
            return new ProductDto(
                product.Id,
                product.Name,
                product.Description,
                product.Price,
                product.CategoryId,
                product.Category != null ? product.Category.Name : string.Empty
            );
        }

        public async Task<ProductDto?> CreateAsync(ProductCreateRequest request)
        {
            var category = await _context.Categories
                .FirstOrDefaultAsync(c => c.Id == request.CategoryId);

            if (category == null)
            {
                // Podrías lanzar una excepción custom, pero para simplificar:
                throw new ArgumentException("La categoría indicada no existe.");
            }

            var product = new Product
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                CategoryId = request.CategoryId
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            // Recargamos categoría por si acaso
            await _context.Entry(product).Reference(p => p.Category).LoadAsync();

            return new ProductDto(
                product.Id,
                product.Name,
                product.Description,
                product.Price,
                product.CategoryId,
                product.Category != null ? product.Category.Name : string.Empty
            );

        }

        public async Task<ProductDto?> UpdateAsync(int id, ProductUpdateRequest request)
        {
            var product = await _context.Products
                            .Include(p => p.Category)
                            .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null) return null;

            var categoryExists = await _context.Categories
                .AnyAsync(c => c.Id == request.CategoryId);

            if (!categoryExists)
            {
                throw new ArgumentException("La categoría indicada no existe."); 
            }

            product.Name = request.Name;
            product.Description = request.Description;
            product.Price = request.Price;
            product.CategoryId = request.CategoryId;

            await _context.SaveChangesAsync();

            await _context.Entry(product).Reference(p => p.Category).LoadAsync();

            return new ProductDto(
                product.Id,
                product.Name,
                product.Description,
                product.Price,
                product.CategoryId,
                product.Category != null ? product.Category.Name : string.Empty
            );

        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IReadOnlyList<ProductDto>> GetFilteredAsync(ProductFilterRequest filter)
        {
            var query = _context.Products
                .Include(p => p.Category)
                .AsQueryable();

            if (filter.CategoryIds != null && filter.CategoryIds.Count > 0)
            {
                query = query.Where(p => filter.CategoryIds.Contains(p.CategoryId));
            }

            if (filter.MinPrice.HasValue)
            {
                query = query.Where(p => p.Price >= filter.MinPrice.Value);
            }

            if (filter.MaxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= filter.MaxPrice.Value);
            }

            if (!string.IsNullOrWhiteSpace(filter.SearchTerm))
            {
                var term = filter.SearchTerm.Trim();

                var pattern = $"%{term}%";

                query = query.Where(p =>
                    EF.Functions.Like(p.Name, pattern) ||
                    (p.Description != null && EF.Functions.Like(p.Description, pattern))
                );
            }

            return await query
                .Select(p => new ProductDto(
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.CategoryId,
                    p.Category != null ? p.Category.Name : string.Empty
                ))
                .ToListAsync();
        }

        public async Task<decimal?> GetMaxPriceAsync()
        {
            var hasProducts = await _context.Products.AnyAsync();
            if (!hasProducts)
            {
                return null;
            }

            var maxPrice = await _context.Products.MaxAsync(p => p.Price);
            return maxPrice;
        }

    }

};