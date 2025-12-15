namespace othic_level_test.Services;

public record ProductDto(
    int Id,
    string Name,
    string? Description,
    decimal Price,
    int CategoryId,
    string CategoryName
);
