using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Repositories;

public class MovieRepository : IMovieRepository
{
    private readonly ApplicationDbContext _context;

    public MovieRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Movie>> GetAllAsync()
    {
        return await _context.Movies
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();
    }

    public async Task<Movie?> GetByIdAsync(Guid id)
    {
        return await _context.Movies.FindAsync(id);
    }

    public async Task<Movie> CreateAsync(Movie movie)
    {
        movie.Id = Guid.NewGuid();
        movie.CreatedAt = DateTime.UtcNow;
        movie.UpdatedAt = DateTime.UtcNow;

        _context.Movies.Add(movie);
        await _context.SaveChangesAsync();
        return movie;
    }

    public async Task<Movie?> UpdateAsync(Guid id, Movie movie)
    {
        var existingMovie = await _context.Movies.FindAsync(id);
        if (existingMovie == null)
        {
            return null;
        }

        existingMovie.Title = movie.Title;
        existingMovie.Genre = movie.Genre;
        existingMovie.Rating = movie.Rating;
        existingMovie.PosterUrl = movie.PosterUrl;
        existingMovie.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return existingMovie;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie == null)
        {
            return false;
        }

        _context.Movies.Remove(movie);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Movies.AnyAsync(m => m.Id == id);
    }
}
