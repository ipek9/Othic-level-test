using System.Collections.Generic;
using System.Threading.Tasks;

namespace othic_level_test.Services
{
    public interface ICategoryService
    {
        Task<IReadOnlyList<CategoryDto>> GetAllAsync();
    }
}
