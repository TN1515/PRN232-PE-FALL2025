using backend.Models;

namespace backend.Repositories;

public interface IMovieRepository
{
    Task<IEnumerable<Movie>> GetAllAsync();
    Task<Movie?> GetByIdAsync(Guid id);
    Task<Movie> CreateAsync(Movie movie);
    Task<Movie?> UpdateAsync(Guid id, Movie movie);
    Task<bool> DeleteAsync(Guid id);
    Task<bool> ExistsAsync(Guid id);
}
