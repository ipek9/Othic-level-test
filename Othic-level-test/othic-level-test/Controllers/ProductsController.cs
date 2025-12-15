using Microsoft.AspNetCore.Mvc;
using othic_level_test.Services;

namespace othic_level_test.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    // GET: api/products
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> Get()
    {
        var products = await _productService.GetAllAsync();
        return Ok(products);
    }

    // GET: api/products/{id}
    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductDto>> Get(int id)
    {
        var product = await _productService.GetByIdAsync(id);
        if (product == null)
        {
            return NotFound();
        }
        return Ok(product);
    }

    // POST: api/products
    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create([FromBody] ProductCreateRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var createdProduct = await _productService.CreateAsync(request);
            return CreatedAtAction(nameof(Get), new { id = createdProduct!.Id }, createdProduct);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // PUT: api/products/5
    [HttpPut("{id:int}")]
    public async Task<ActionResult<ProductDto>> Update(int id, [FromBody] ProductUpdateRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var updated = await _productService.UpdateAsync(id, request);

            if (updated == null)
                return NotFound();

            return Ok(updated);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    // DELETE: api/products/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _productService.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }

    // GET: api/products/filter?categoryIds=2&categoryIds=4&minPrice=100&maxPrice=500
    [HttpGet("filter")]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetFiltered([FromQuery] ProductFilterRequest filter)
    {
        var products = await _productService.GetFilteredAsync(filter);
        return Ok(products);
    }

    // GET: api/products/max-price
    [HttpGet("max-price")]
    public async Task<ActionResult<decimal>> GetMaxPrice()
    {
        var maxPrice = await _productService.GetMaxPriceAsync();
        if (maxPrice == null)
        {
            return NotFound();
        }
        return Ok(maxPrice.Value);
    }

}
