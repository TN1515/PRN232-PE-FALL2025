using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly IMovieService _movieService;
    private readonly ILogger<MoviesController> _logger;

    public MoviesController(IMovieService movieService, ILogger<MoviesController> logger)
    {
        _movieService = movieService;
        _logger = logger;
    }

    /// <summary>
    /// Get all movies
    /// </summary>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<MovieResponseDto>>> GetMovies()
    {
        _logger.LogInformation("Getting all movies");
        var movies = await _movieService.GetAllMoviesAsync();
        return Ok(movies);
    }

    /// <summary>
    /// Get a movie by ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MovieResponseDto>> GetMovie(Guid id)
    {
        _logger.LogInformation("Getting movie with ID: {MovieId}", id);
        var movie = await _movieService.GetMovieByIdAsync(id);

        if (movie == null)
        {
            _logger.LogWarning("Movie with ID {MovieId} not found", id);
            return NotFound(new { message = $"Movie with ID {id} not found" });
        }

        return Ok(movie);
    }

    /// <summary>
    /// Create a new movie
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<MovieResponseDto>> CreateMovie([FromBody] CreateMovieDto createMovieDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _logger.LogInformation("Creating new movie: {MovieTitle}", createMovieDto.Title);
        var movie = await _movieService.CreateMovieAsync(createMovieDto);

        return CreatedAtAction(nameof(GetMovie), new { id = movie.Id }, movie);
    }

    /// <summary>
    /// Update an existing movie
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MovieResponseDto>> UpdateMovie(Guid id, [FromBody] UpdateMovieDto updateMovieDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _logger.LogInformation("Updating movie with ID: {MovieId}", id);
        var movie = await _movieService.UpdateMovieAsync(id, updateMovieDto);

        if (movie == null)
        {
            _logger.LogWarning("Movie with ID {MovieId} not found for update", id);
            return NotFound(new { message = $"Movie with ID {id} not found" });
        }

        return Ok(movie);
    }

    /// <summary>
    /// Delete a movie
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteMovie(Guid id)
    {
        _logger.LogInformation("Deleting movie with ID: {MovieId}", id);
        var result = await _movieService.DeleteMovieAsync(id);

        if (!result)
        {
            _logger.LogWarning("Movie with ID {MovieId} not found for deletion", id);
            return NotFound(new { message = $"Movie with ID {id} not found" });
        }

        return NoContent();
    }
}
