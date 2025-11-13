using backend.DTOs;

namespace backend.Services;

public interface IMovieService
{
    Task<IEnumerable<MovieResponseDto>> GetAllMoviesAsync();
    Task<MovieResponseDto?> GetMovieByIdAsync(Guid id);
    Task<MovieResponseDto> CreateMovieAsync(CreateMovieDto createMovieDto);
    Task<MovieResponseDto?> UpdateMovieAsync(Guid id, UpdateMovieDto updateMovieDto);
    Task<bool> DeleteMovieAsync(Guid id);
}
