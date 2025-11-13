# 🎬 Movie Watchlist Application

A full-stack movie watchlist application that allows users to manage their personal movie collection with features like adding, editing, deleting, searching, filtering, and rating movies.

## 🚀 Tech Stack

### Backend
- **Framework**: C# .NET 8.0 Web API
- **Database**: PostgreSQL
- **ORM**: Entity Framework Core 8.0
- **Architecture**: Repository Pattern + Service Layer
- **API Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: ReactJS 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS (Netflix-inspired dark theme)

### Deployment
- **Backend**: Docker (Render)
- **Frontend**: Static hosting (Vercel/Netlify)
- **Package Manager**: npm

---

## 📁 Project Structure

```
PRN232-PE-FALL2025/
│
├── backend/                        # C# .NET Web API
│   ├── Controllers/                # API endpoints
│   │   └── MoviesController.cs     # Movies REST API
│   ├── Models/                     # Entity models
│   │   └── Movie.cs                # Movie entity
│   ├── DTOs/                       # Data Transfer Objects
│   │   ├── CreateMovieDto.cs       # Create movie request
│   │   ├── UpdateMovieDto.cs       # Update movie request
│   │   └── MovieResponseDto.cs     # API response
│   ├── Services/                   # Business logic layer
│   │   ├── IMovieService.cs
│   │   └── MovieService.cs
│   ├── Repositories/               # Data access layer
│   │   ├── IMovieRepository.cs
│   │   └── MovieRepository.cs
│   ├── Data/                       # Database context
│   │   └── ApplicationDbContext.cs
│   ├── Middleware/                 # Custom middleware
│   │   └── ErrorHandlingMiddleware.cs
│   ├── Properties/
│   │   └── launchSettings.json
│   ├── Program.cs                  # App entry point
│   ├── backend.csproj              # Project file
│   ├── appsettings.json            # Configuration
│   ├── appsettings.Development.json
│   ├── appsettings.Production.json
│   ├── Dockerfile                  # Docker configuration
│   ├── .dockerignore
│   └── .gitignore
│
├── frontend/                       # ReactJS Application
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── components/             # Reusable components
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── MovieCard.jsx       # Movie card display
│   │   │   ├── MovieList.jsx       # Movies grid with filters
│   │   │   └── MovieForm.jsx       # Add/Edit form
│   │   ├── pages/                  # Page components
│   │   │   ├── HomePage.jsx        # Main movie list page
│   │   │   ├── AddMoviePage.jsx    # Add movie page
│   │   │   └── EditMoviePage.jsx   # Edit movie page
│   │   ├── services/               # API integration
│   │   │   └── movieService.js     # Axios API calls
│   │   ├── styles/                 # CSS files
│   │   │   ├── index.css           # Global styles
│   │   │   ├── App.css
│   │   │   ├── Navbar.css
│   │   │   ├── MovieCard.css
│   │   │   ├── MovieList.css
│   │   │   ├── MovieForm.css
│   │   │   ├── HomePage.css
│   │   │   ├── AddMoviePage.css
│   │   │   └── EditMoviePage.css
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # Entry point
│   ├── index.html                  # HTML template
│   ├── package.json                # Dependencies
│   ├── vite.config.js              # Vite configuration
│   ├── .env                        # Environment variables
│   ├── .env.development
│   ├── .env.production
│   └── .gitignore
│
└── README.md                       # This file
```

---

## 🎯 Features

### Core Functionality
- ✅ **CRUD Operations**: Create, Read, Update, Delete movies
- ✅ **Search**: Search movies by title (case-insensitive)
- ✅ **Filter**: Filter movies by genre
- ✅ **Sort**: Sort by newest, title, or rating
- ✅ **Ratings**: Rate movies from 1-5 stars
- ✅ **Validation**: Input validation on both frontend and backend
- ✅ **Error Handling**: Comprehensive error handling and user feedback
- ✅ **Responsive Design**: Mobile-friendly interface

### Movie Model
- **Id**: Unique identifier (GUID)
- **Title**: Movie title (required)
- **Genre**: Movie genre (optional)
- **Rating**: 1-5 star rating (optional)
- **PosterUrl**: Image URL (optional)
- **CreatedAt**: Timestamp
- **UpdatedAt**: Timestamp

### API Endpoints
```
GET    /api/movies       - Get all movies
GET    /api/movies/{id}  - Get movie by ID
POST   /api/movies       - Create new movie
PUT    /api/movies/{id}  - Update existing movie
DELETE /api/movies/{id}  - Delete movie
```

---

## 🛠️ Setup Instructions

### Prerequisites
- .NET 8.0 SDK
- PostgreSQL
- Node.js 18+ and npm
- Docker (for containerization)
- Git

---

## 🔧 Backend Setup

### 1. Local Development

#### Install PostgreSQL
Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)

#### Create Database
```powershell
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE moviedb;

# Exit
\q
```

#### Configure Connection String
Edit `backend/appsettings.Development.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=moviedb;Username=postgres;Password=YOUR_PASSWORD"
  }
}
```

#### Install Dependencies & Run
```powershell
cd backend

# Restore NuGet packages
dotnet restore

# Install EF Core tools (if not already installed)
dotnet tool install --global dotnet-ef

# Create database migration
dotnet ef migrations add InitialCreate

# Apply migration to database
dotnet ef database update

# Run the application
dotnet run
```

Backend will start at: **http://localhost:5000**
Swagger UI: **http://localhost:5000/swagger**

### 2. Docker Development

#### Build Docker Image
```powershell
cd backend
docker build -t movie-api .
```

#### Run Container
```powershell
# With local PostgreSQL
docker run -p 8080:8080 `
  -e DATABASE_URL="Host=host.docker.internal;Database=moviedb;Username=postgres;Password=YOUR_PASSWORD" `
  movie-api
```

### 3. Useful EF Core Commands

```powershell
# Create new migration
dotnet ef migrations add MigrationName

# Apply migrations
dotnet ef database update

# Remove last migration
dotnet ef migrations remove

# Generate SQL script
dotnet ef migrations script

# Drop database
dotnet ef database drop
```

---

## 🎨 Frontend Setup

### 1. Install Dependencies
```powershell
cd frontend
npm install
```

### 2. Configure API URL

Edit `.env.development`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Server
```powershell
npm run dev
```

Frontend will start at: **http://localhost:3000**

### 4. Build for Production
```powershell
npm run build
```

Output will be in `frontend/dist/`

---

## 🐳 Docker Deployment (Render)

### 1. Prepare Backend

The `backend/Dockerfile` is already configured for Render deployment.

### 2. Deploy to Render

1. **Create PostgreSQL Database**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Create new PostgreSQL database
   - Copy the **Internal Database URL**

2. **Deploy Backend**:
   - Create new **Web Service**
   - Connect your GitHub repository
   - Set **Root Directory**: `backend`
   - Set **Build Command**: (leave empty - Docker handles it)
   - Set **Docker Command**: (leave empty)
   - Add Environment Variable:
     - Key: `DATABASE_URL`
     - Value: Your PostgreSQL Internal Database URL
   - Deploy

3. **Run Migrations** (one-time):
   After deployment, run migrations via Render Shell:
   ```bash
   dotnet ef database update
   ```

### 3. Update Frontend API URL

Edit `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend-app.onrender.com/api
```

---

## 🌐 Frontend Deployment

### Option 1: Vercel

```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel

# For production
vercel --prod
```

**Or use Vercel Dashboard**:
1. Import GitHub repository
2. Set **Root Directory**: `frontend`
3. Set **Build Command**: `npm run build`
4. Set **Output Directory**: `dist`
5. Add Environment Variable: `VITE_API_URL=https://your-backend.onrender.com/api`
6. Deploy

### Option 2: Netlify

```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Build
cd frontend
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

**Or use Netlify Dashboard**:
1. Import GitHub repository
2. Set **Base Directory**: `frontend`
3. Set **Build Command**: `npm run build`
4. Set **Publish Directory**: `frontend/dist`
5. Add Environment Variable: `VITE_API_URL=https://your-backend.onrender.com/api`
6. Deploy

---

## 🗄️ Database Configuration

### Local PostgreSQL
```
Host: localhost
Port: 5432
Database: moviedb
Username: postgres
Password: YOUR_PASSWORD
```

### Cloud PostgreSQL (Render, ElephantSQL, etc.)
Update connection string in `appsettings.Production.json` or use environment variable `DATABASE_URL`.

---

## 📤 Push to GitHub

```powershell
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Movie Watchlist application"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/movie-watchlist.git

# Push
git push -u origin main
```

### Recommended .gitignore

Backend:
```
bin/
obj/
*.user
.vs/
appsettings.Development.json
appsettings.Local.json
```

Frontend:
```
node_modules/
dist/
.env.local
.DS_Store
```

---

## 🧪 Testing the Application

### Test Backend API (PowerShell)

```powershell
# Get all movies
Invoke-RestMethod -Uri "http://localhost:5000/api/movies" -Method GET

# Create movie
$body = @{
    title = "The Shawshank Redemption"
    genre = "Drama"
    rating = 5
    posterUrl = "https://example.com/poster.jpg"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/movies" -Method POST -Body $body -ContentType "application/json"

# Get movie by ID
Invoke-RestMethod -Uri "http://localhost:5000/api/movies/{GUID}" -Method GET

# Update movie
Invoke-RestMethod -Uri "http://localhost:5000/api/movies/{GUID}" -Method PUT -Body $body -ContentType "application/json"

# Delete movie
Invoke-RestMethod -Uri "http://localhost:5000/api/movies/{GUID}" -Method DELETE
```

---

## 🐛 Troubleshooting

### Backend Issues

**Port already in use**:
```powershell
# Change port in Properties/launchSettings.json
"applicationUrl": "http://localhost:5001"
```

**Database connection failed**:
- Check PostgreSQL is running
- Verify connection string
- Ensure database exists

**Migration errors**:
```powershell
# Drop database and recreate
dotnet ef database drop
dotnet ef database update
```

### Frontend Issues

**API connection refused**:
- Ensure backend is running
- Check `.env.development` has correct API URL
- Verify CORS is enabled in backend

**npm install fails**:
```powershell
# Clear cache
npm cache clean --force
npm install
```

**Build errors**:
```powershell
# Remove node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

---

## 📝 Environment Variables Summary

### Backend
```env
# Production (Render)
DATABASE_URL=postgresql://user:password@host:port/database
ASPNETCORE_ENVIRONMENT=Production
```

### Frontend
```env
# Development
VITE_API_URL=http://localhost:5000/api

# Production
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## 🎯 Future Enhancements

- [ ] User authentication and authorization
- [ ] User-specific watchlists
- [ ] Movie recommendations
- [ ] External API integration (TMDb, OMDb)
- [ ] Advanced search and filtering
- [ ] Movie reviews and comments
- [ ] Social features (share, like)
- [ ] Watch history tracking
- [ ] Dark/Light theme toggle
- [ ] Export watchlist (CSV, PDF)

---

## 📄 License

This project is for educational purposes.

---

## 👨‍💻 Author

Created as a practical exercise for learning full-stack development with .NET and React.

---

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation at `/swagger`
3. Check browser console for frontend errors
4. Review backend logs for API errors

---

**Happy Coding! 🎬✨**
