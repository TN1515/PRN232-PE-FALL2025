using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Movie
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? Genre { get; set; }

    [Range(1, 5)]
    public int? Rating { get; set; }

    public string? PosterUrl { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
