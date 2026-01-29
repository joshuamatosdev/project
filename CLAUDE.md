# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

This is a full-stack tactical mapping application built for educational purposes. It demonstrates:
- Interactive map-based unit placement and artillery simulation
- TensorFlow.js browser-based vehicle image detection
- Geospatial calculations (distance, midpoint, proximity)
- ML integration with WEKA (sentiment analysis prototype)

**Tech Stack:**
- **Backend:** Spring Boot 3.2.2, Java 17, Spring Data JPA, PostgreSQL, Gradle, WEKA ML library
- **Frontend:** React 18 (Create React App), Material-UI v5, Google Maps JavaScript API, TensorFlow.js, axios
- **Database:** PostgreSQL 15 (Docker)

---

## Development Commands

### Backend (Spring Boot)

```bash
# Run the application (default port 8080)
./gradlew bootRun

# Run tests
./gradlew test

# Build without running
./gradlew build

# Clean build artifacts
./gradlew clean
```

**Configuration:** `src/main/resources/application.yaml`
- Database runs on port `5435` (not default 5432)
- CORS configured via `WebConfig.java` (default: `http://localhost:3000`)
- Uses Spring profiles: `dev`, `prod`, `test`
- Environment variables required (see Environment Variables section below)
- Hibernate `ddl-auto`: `update` (default), `create-drop` (dev), `validate` (prod)

### Frontend (React)

```bash
cd src/frontend

# Install dependencies
yarn install

# Start development server (port 3000)
yarn start

# Run tests
yarn test

# Build for production
yarn build

# Copy ArcGIS assets (if needed)
yarn copy
```

**Environment Variables:** Create `src/frontend/.env` (see `src/frontend/.env.example`):
```
REACT_APP_GOOGLE_MAPS_KEY=<your-google-maps-api-key>
REACT_APP_API_BASE=http://localhost:8080/api
```

### Database (Docker)

```bash
# Start PostgreSQL container (from project root)
docker-compose up -d

# Stop container
docker-compose down
```

---

## Environment Variables

### Backend Environment Variables

Create a `.env` file in the project root (see `.env.example`):

```bash
SPRING_PROFILES_ACTIVE=dev
DB_URL=jdbc:postgresql://localhost:5435/postgres
DB_USERNAME=postgres
DB_PASSWORD=your_password_here
```

**Spring Profiles:**
- `dev` - Development mode (creates/drops tables on startup, shows SQL)
- `prod` - Production mode (validates schema only, requires all env vars)
- `test` - Test mode (uses H2 in-memory database)

**Setting Active Profile:**
```bash
# Option 1: Environment variable
export SPRING_PROFILES_ACTIVE=dev
./gradlew bootRun

# Option 2: Command line argument
./gradlew bootRun --args='--spring.profiles.active=dev'
```

### Frontend Environment Variables

Create `src/frontend/.env` (see `src/frontend/.env.example`):

```bash
REACT_APP_API_BASE=http://localhost:8080/api
REACT_APP_GOOGLE_MAPS_KEY=your_google_maps_api_key_here
```

**Important:** Never commit `.env` files to version control. Use `.env.example` as templates.

---

## Architecture

### Backend Structure

**Package:** `com.joshuamatos.library`

```
src/main/java/com/joshuamatos/library/
├── TacticalMapsApplication.java    # Spring Boot entry point
├── artillery/                       # Artillery domain
│   ├── Artillery.java              # JPA Entity
│   ├── ArtilleryController.java    # REST endpoints (/api/artillery)
│   ├── ArtilleryService.java       # Business logic
│   ├── ArtilleryRepository.java    # JPA Repository
│   └── ArtilleryConfiguration.java # Bean configuration
├── infantry/                        # Infantry domain (same structure)
└── weka/                           # ML sentiment analysis (WIP)
    └── WekaDemo.java               # WEKA classifier demo
```

**REST API Endpoints:**

Artillery:
- `GET    /api/artillery`     - List all artillery units
- `POST   /api/artillery`     - Create artillery unit
- `GET    /api/artillery/{id}` - Get single unit
- `PATCH  /api/artillery/{id}` - Update unit
- `DELETE /api/artillery/{id}` - Delete unit

Infantry (same pattern at `/api/infantry`)

**Entity Structure:**
```java
Artillery {
  Long id;
  String type;           // e.g., "M198 howitzer"
  Integer artRange;      // Range in meters
  Boolean favorite;      // User favorite flag
  Integer rpm;           // Rounds per minute
  String facts;          // Description (65555 char limit)
}
```

### Frontend Structure

```
src/frontend/src/
├── App.js                          # Main component, routing, state management
├── components/
│   ├── googlemaps/
│   │   ├── Gmap.js                # Main map component (Google Maps integration)
│   │   ├── mapstyles.js           # Custom map styling
│   │   └── helper/paddedSeq.js    # Utility functions
│   ├── ai/
│   │   └── ObjectDetectV.jsx      # TensorFlow.js vehicle detection
│   ├── inputforms/
│   │   └── InputWithIcon.js       # Unit selection forms
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   └── Register.js
│   ├── nav/ResponsiveAppBar.js
│   └── common/                     # Reusable UI components
└── index.js                        # React entry point
```

**Key Features:**

1. **Map Interaction (`Gmap.js`):**
   - Place artillery/infantry units on map via click
   - Calculate firing trajectories between units
   - Animate artillery fire with trajectory lines
   - Elevation API integration for terrain data

2. **Vehicle Detection (`ObjectDetectV.jsx`):**
   - Uses `@tensorflow-models/coco-ssd` for object detection
   - User uploads image and provides lat/lng coordinates
   - Detected vehicle class is placed as marker on map
   - Prediction results passed to parent component via `predictionService` callback

3. **Geospatial Calculations (`App.js`):**
   - `haversine_distance(mk1, mk2)` - Great circle distance between coordinates
   - `midpoint(lat1, lng1, lat2, lng2)` - Calculate midpoint between two points
   - `arePointsNear(checkPoint, centerPoint, km)` - Proximity check

---

## Testing

### Backend Tests

Located in `src/test/java/com/joshuamatos/library/`

**Test Structure:**
```java
@SpringBootTest
@AutoConfigureMockMvc
class LibraryApplicationTests {
  @Autowired MockMvc mvc;

  // Tests use @Transactional @Rollback for isolation
  // Integration tests hit real endpoints via MockMvc
}
```

**Run specific test:**
```bash
./gradlew test --tests LibraryApplicationTests.getSingleBooksTest
```

### Frontend Tests

- Uses `@testing-library/react` and `jest`
- Run with `yarn test`
- Limited test coverage currently (mostly default CRA tests)

---

## Important Development Notes

### Database Port Configuration
The application uses PostgreSQL on **port 5435** (not default 5432) to avoid conflicts. This is configured in:
- `application.yaml`: `jdbc:postgresql://localhost:5435/postgres`
- `docker-compose.yaml`: `"5435:5432"` port mapping

### CORS Configuration
Backend allows cross-origin requests from `http://localhost:3000` only. If changing frontend port, update `@CrossOrigin` annotations in controllers.

### Artillery Entity Field Names
- `artRange` is used (not `range`) to avoid SQL reserved word conflicts
- Method names follow Java conventions: `getArtRange()`, `setArtRange()`

### Google Maps API Setup
1. Enable Maps JavaScript API in Google Cloud Console
2. Create API key with HTTP referrer restrictions
3. Add key to `src/frontend/.env` as `REACT_APP_MAPS_API_KEY`

### TensorFlow.js Model Loading
- Models are loaded on-demand when user uploads image
- Uses `@tensorflow/tfjs-backend-cpu` (WebGL backend commented out)
- `cocoSsd.load()` is async and may take a few seconds on first load

### Lombok Usage
Backend uses Lombok for boilerplate reduction. Note:
- `@AllArgsConstructor` on controllers for dependency injection
- Manual getters/setters in entities (could be converted to `@Data`)

---

## Known Patterns & Conventions

### Backend Patterns

1. **Repository Pattern:**
   - Extend `JpaRepository<Entity, Long>`
   - No custom query methods needed (using default CRUD)

2. **Service Layer:**
   - All business logic in `*Service` classes
   - Controllers delegate to services (thin controllers)

3. **REST Conventions:**
   - All endpoints under `/api/` prefix
   - Use standard HTTP methods (GET, POST, PATCH, DELETE)
   - Return entities directly (Spring handles JSON serialization)

### Frontend Patterns

1. **State Management:**
   - Top-level state in `App.js`
   - Props drilling for deep components (no Redux/Context API)
   - Callback functions passed down: `setMessageFunc`, `setCurrentGridFunc`, `predictionService`, etc.

2. **API Calls:**
   - Using axios directly (no centralized API service)
   - Hardcoded API URL: `http://localhost:8080/api/`
   - useEffect for data fetching on mount

3. **Styling:**
   - Mix of Material-UI components and custom CSS
   - `styled-components` for AI detection component
   - Global styles in `text.scss` and `App.css`

---

## Development Workflow

1. **Start Database:**
   ```bash
   docker-compose up -d
   ```

2. **Start Backend:**
   ```bash
   ./gradlew bootRun
   ```
   Backend runs on `http://localhost:8080`

3. **Start Frontend:**
   ```bash
   cd src/frontend && yarn start
   ```
   Frontend runs on `http://localhost:3000`

4. **Verify Setup:**
   - Navigate to `http://localhost:3000/gmap`
   - Check browser console for errors
   - Verify backend connectivity via Network tab

---

## Common Issues

### Database Connection Failures
- Ensure PostgreSQL is running: `docker ps`
- Check port 5435 is not in use: `netstat -an | grep 5435` (Linux/Mac) or `netstat -an | findstr 5435` (Windows)
- Verify credentials in `application.yaml` match Docker environment variables

### Google Maps Not Loading
- Verify API key is set in `.env` file
- Check browser console for API key errors
- Ensure Maps JavaScript API is enabled in Google Cloud Console
- Check for CORS errors (API key restrictions)

### TensorFlow.js Model Loading Errors
- Clear browser cache if models fail to load
- Check browser console for WebGL errors
- Ensure sufficient memory (models are ~10-20MB)

### CORS Errors
- Backend must be running on port 8080
- Frontend must be on port 3000
- If using different ports, update `@CrossOrigin` annotations

---

## Future Enhancements (from README.md)

- Enhanced ballistic model with terrain/elevation
- Layer toggles (satellite, terrain, MGRS grid)
- Real-time collaboration via WebSocket
- Export/import scenario JSON
- Complete sentiment analysis module with WEKA integration
