namespace othic_level_test.Services
{
    public class ProductFilterRequest
    {
        public List<int>? CategoryIds { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public string? SearchTerm { get; set; }


    }
}
