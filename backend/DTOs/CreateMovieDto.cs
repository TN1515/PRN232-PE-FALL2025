using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public class CreateMovieDto
{
    [Required(ErrorMessage = "Title is required")]
    [MaxLength(200, ErrorMessage = "Title cannot exceed 200 characters")]
    public string Title { get; set; } = string.Empty;

    [MaxLength(100, ErrorMessage = "Genre cannot exceed 100 characters")]
    public string? Genre { get; set; }

    [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5")]
    public int? Rating { get; set; }

    public string? PosterUrl { get; set; }
}
