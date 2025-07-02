# MovieTrend 🎬

A modern React-based movie discovery application that allows users to explore trending movies, search for films, manage favorites.

## 🌟 Features

### Core Functionality
- **Movie Discovery**: Browse trending, popular, and top-rated movies
- **Advanced Search**: Search movies with filters (genre, year, rating)
- **Movie Details**: Comprehensive movie information including trailers, and ratings
- **User Authentication**: Secure login/signup system with Appwrite
- **Favorites Management**: Save and manage your favorite movies
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Advanced Features
- **Infinite Scroll**: With pagination
- **Real-time Updates**: Live data synchronization

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Next-generation frontend build tool
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library

### Backend & Services
- **Appwrite** - Backend-as-a-Service for authentication and database
- **TMDB API** - The Movie Database API for movie data
- **React Query/TanStack Query** - Data fetching and caching

### Development Tools
- **ESLint** - Code linting and quality checks
- **TypeScript Support** - Type-safe development
- **Vite Dev Server** - Hot module replacement

## 📁 Project Structure

```
MovieTrend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/       # Common components (Header, Footer, etc.)
│   │   ├── movie/        # Movie-specific components
│   │   └── ui/           # UI components (Button, Modal, etc.)
│   ├── pages/            # Page components
│   │   ├── Home.jsx      # Landing page
│   │   ├── Movies.jsx    # Movie listing page
│   │   ├── MovieDetail.jsx # Individual movie details
│   │   ├── Search.jsx    # Search results page
│   │   ├── Favorites.jsx # User favorites
│   │   └── Profile.jsx   # User profile
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API service functions
│   │   ├── tmdb.js       # TMDB API integration
│   │   └── appwrite.js   # Appwrite configuration
│   ├── utils/            # Utility functions
│   ├── context/          # React Context providers
│   ├── styles/           # Global styles
│   └── App.jsx           # Main application component
├── .env.example          # Environment variables template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite configuration
└── README.md            # Project documentation
```
### Homepage:
![Screenshot 2025-07-03 001719](https://github.com/user-attachments/assets/78f969a6-a4b5-499d-b912-a10856286727)

### MovieList:
![Screenshot 2025-07-03 001730](https://github.com/user-attachments/assets/0a2a5408-5dac-4fb1-b124-2e2d9d6fb6c2)
![Screenshot 2025-07-03 001752](https://github.com/user-attachments/assets/efdfd392-22f2-445a-8009-5236e64bb9c1)
![Screenshot 2025-07-03 002400](https://github.com/user-attachments/assets/7ca4ae45-5d63-449a-9b1c-6b5ffb5ebdb9)


### User-Panel:
![Screenshot 2025-07-03 002100](https://github.com/user-attachments/assets/abf938d4-daca-492f-84ae-38c76847e3c5)
![Screenshot 2025-07-03 002232](https://github.com/user-attachments/assets/a0501a98-5df9-48df-b560-d03bdc47f67c)

### Login & Registration:
![Screenshot 2025-07-03 002319](https://github.com/user-attachments/assets/55194e4a-955f-46a5-9211-2dfca4cc61f2)
![Screenshot 2025-07-03 002327](https://github.com/user-attachments/assets/5232b07c-02a4-49d2-a85f-eac1923242fe)



## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **TMDB API Key** - Get from [The Movie Database](https://www.themoviedb.org/settings/api)
- **Appwrite Account** - Sign up at [Appwrite](https://appwrite.io/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MovieTrend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # TMDB API Configuration
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500

   # Appwrite Configuration
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
   VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   VITE_APPWRITE_COLLECTION_FAVORITES_ID=your_favorites_collection_id
   VITE_APPWRITE_COLLECTION_AUTHENTICATION_ID=your_auth_collection_id
   VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   ```

4. **Set up Appwrite**
   - Create a new project in Appwrite console
   - Create database collections for users, favorites, and watchlists
   - Configure authentication settings
   - Update the collection IDs in your `.env.local` file

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts development server with hot reload |
| `npm run lint` | Runs ESLint for code quality checks |
| `npm run build` | Builds optimized production bundle |
| `npm run preview` | Previews production build locally |


## 🔧 Configuration

### TMDB API Setup
1. Visit [TMDB](https://www.themoviedb.org/) and create an account
2. Go to Settings → API → Create API Key
3. Copy your API key to the `.env.local` file


---

**Happy Movie Browsing! 🍿**
