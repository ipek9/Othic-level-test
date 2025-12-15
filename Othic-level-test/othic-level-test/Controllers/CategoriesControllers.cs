using Microsoft.AspNetCore.Mvc;
using othic_level_test.Services;

namespace othic_level_test.Controllers;


[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    // GET: api/categories
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> Get()
    {
        var categories = await _categoryService.GetAllAsync();
        return Ok(categories);
    }
}
