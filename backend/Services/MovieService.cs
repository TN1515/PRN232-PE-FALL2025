using backend.DTOs;
using backend.Models;
using backend.Repositories;

namespace backend.Services;

public class MovieService : IMovieService
{
    private readonly IMovieRepository _movieRepository;

    public MovieService(IMovieRepository movieRepository)
    {
        _movieRepository = movieRepository;
    }

    public async Task<IEnumerable<MovieResponseDto>> GetAllMoviesAsync()
    {
        var movies = await _movieRepository.GetAllAsync();
        return movies.Select(MapToResponseDto);
    }

    public async Task<MovieResponseDto?> GetMovieByIdAsync(Guid id)
    {
        var movie = await _movieRepository.GetByIdAsync(id);
        return movie != null ? MapToResponseDto(movie) : null;
    }

    public async Task<MovieResponseDto> CreateMovieAsync(CreateMovieDto createMovieDto)
    {
        var movie = new Movie
        {
            Title = createMovieDto.Title,
            Genre = createMovieDto.Genre,
            Rating = createMovieDto.Rating,
            PosterUrl = createMovieDto.PosterUrl
        };

        var createdMovie = await _movieRepository.CreateAsync(movie);
        return MapToResponseDto(createdMovie);
    }

    public async Task<MovieResponseDto?> UpdateMovieAsync(Guid id, UpdateMovieDto updateMovieDto)
    {
        var movie = new Movie
        {
            Title = updateMovieDto.Title,
            Genre = updateMovieDto.Genre,
            Rating = updateMovieDto.Rating,
            PosterUrl = updateMovieDto.PosterUrl
        };

        var updatedMovie = await _movieRepository.UpdateAsync(id, movie);
        return updatedMovie != null ? MapToResponseDto(updatedMovie) : null;
    }

    public async Task<bool> DeleteMovieAsync(Guid id)
    {
        return await _movieRepository.DeleteAsync(id);
    }

    private static MovieResponseDto MapToResponseDto(Movie movie)
    {
        return new MovieResponseDto
        {
            Id = movie.Id,
            Title = movie.Title,
            Genre = movie.Genre,
            Rating = movie.Rating,
            PosterUrl = movie.PosterUrl,
            CreatedAt = movie.CreatedAt,
            UpdatedAt = movie.UpdatedAt
        };
    }
}
