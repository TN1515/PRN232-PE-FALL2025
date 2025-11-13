namespace backend.DTOs;

public class MovieResponseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Genre { get; set; }
    public int? Rating { get; set; }
    public string? PosterUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
