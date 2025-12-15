using System.Collections.Generic;
using System.Threading.Tasks;

namespace othic_level_test.Services
{
    public interface IProductService
    {
        Task<IReadOnlyList<ProductDto>> GetAllAsync();
        Task<ProductDto?> GetByIdAsync(int id);
        Task<ProductDto?> CreateAsync(ProductCreateRequest request);
        Task<ProductDto?> UpdateAsync(int id, ProductUpdateRequest request);
        Task<bool> DeleteAsync(int id);
        Task<IReadOnlyList<ProductDto>> GetFilteredAsync(ProductFilterRequest filter);
        Task<decimal?> GetMaxPriceAsync();

    }
}
