using System.ComponentModel.DataAnnotations;

namespace othic_level_test.Services
{
    public class ProductCreateRequest
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue, ErrorMessage = "El precio debe ser mayor que 0.")]
        public decimal Price { get; set; }

        [Required]
        public int CategoryId { get; set; }
    }
}
