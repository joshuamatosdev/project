# Tactical Maps

An educational web application that demonstrates how to build a reconnaissance-focused map tool. Users can place infantry and artillery units, simulate artillery fire with animations, upload photos to auto-identify vehicles and drop them on the map, and experiment with a work-in-progress sentiment analysis module for unit descriptions.

> Teaching goal: show students how to combine mapping, basic geospatial UX, and in-browser ML to generate on-the-fly insights from identified vehicles/equipment.

---

## Contents
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Usage](#usage)
- [Testing & Quality](#testing--quality)
- [Security Notes](#security-notes)
- [Roadmap](#roadmap)
- [License](#license)

---

## Features
- **Interactive Map (Google Maps JS API):** Place artillery and infantry units; drag, remove, and annotate.<br>
- **Firing Simulation:** Select an artillery unit, select a target, and watch a simple trajectory/impact animation on the map.<br>
- **Vehicle Image Detection (TensorFlow.js):** Upload an image; the app identifies the vehicle class and places a marker at user-provided coordinates. Uses browser-side ML so no model server is required.<br>
- **Sentiment Analysis (WIP):** Prototype text sentiment classifier for unit/notes fields to illustrate NLP pipelines. <br>

---

## Architecture
project/<br>
├─ backend/ # Spring Boot service (REST), Spring Data JPA<br>
│ ├─ src/main/java/...<br>
│ └─ src/main/resources/application.yaml<br>
├─ frontend/ # React app (Vite or CRA) with MUI + Maps JS API + TF.js<br>
│ └─ src/components/googlemaps/Gmap.tsx|js<br>
├─ infra/ # docker-compose for Postgres (optional)<br>
└─ docs/ # Diagrams, ADRs, notes<br>


- **Frontend** renders Google Maps, manages unit state, runs TF.js models for object detection and sentiment. <br>
- **Backend** exposes REST endpoints (e.g., persisted units/sessions) via Spring Boot, with JPA to PostgreSQL. <br>
- **Database** uses PostgreSQL locally (Docker recommended). <br>

---

## Tech Stack
- **Frontend:** React, Material-UI, Google Maps JavaScript API, TensorFlow.js.<br>
- **Backend:** Java 17+, Spring Boot, Spring Data JPA, Gradle.<br>
- **Database:** PostgreSQL (local via Docker).<br>

---

## Quick Start

### Prerequisites
- **Google Maps API Key** with Maps JavaScript API enabled.<br>
- **Java 17+**, **Node 18+**, **npm** or **yarn**. <br>
- **Docker** (optional) if running PostgreSQL locally. <br>

### 1) Clone
```bash
git clone https://github.com/joshuamatosdev/project.git
bash cd <your-repo>
```

### 2) Database (optional but recommended locally)
Use Docker to start Postgres:<
```bash
docker run --name tacticalmaps-db -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres -e POSTGRES_DB=tacticalmaps \
  -p 5432:5432 -d postgres:16
```
You can also use PostGIS if you plan to add spatial queries later. 


### 4) Backend
Update backend/src/main/resources/application.yaml with your DB settings, then:

```bash
cd backend
./gradlew bootRun
```

The Spring Boot Gradle plugin will build and run the app. 
Home

### 4) Frontend
Create frontend/.env (or your framework’s env file) and set:

```bash
VITE_MAPS_API_KEY=<YOUR_GOOGLE_MAPS_API_KEY>
VITE_API_BASE=http://localhost:8080
```
Install and start:

```bash
cd ../frontend
npm install
npm start   # or: npm run dev (Vite)
```

### Configuration
Backend (application.yaml)
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/tacticalmaps
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: update
server:
  port: 8080
```
### Frontend (.env)
```bash
VITE_MAPS_API_KEY=<required>
VITE_API_BASE=http://localhost:8080
```
Enabling the Maps API & key: follow Google’s steps to enable Maps JS API and create a restricted API key (HTTP referrers). 


#### Usage
Open the app (frontend dev server).

Place Units: choose Artillery or Infantry and click the map to drop units.

Fire an Artillery Round:

Click an Artillery unit (source).

Click a target on the map.

Watch the firing animation; details (range/bearing/ETA) display alongside markers.

Vehicle Recon (Image Detection):

Click VEHICLE RECONNAISSANCE.

Upload a vehicle image.

Enter latitude/longitude where the vehicle should be placed.

The model predicts a vehicle class and drops a marker at the specified coordinates. (Implemented with TensorFlow.js pre-made/object-detection models.) 

Sentiment (WIP):

Enter text in the notes/unit description field and run the sentiment check to see a rough positive/negative score (prototype only). 
TensorFlow

Note: To load and render maps, you must include the Maps JavaScript API using your key; see Google’s “Get started”/reference docs for initialization patterns and advanced markers/custom overlays. 

#### Testing & Quality
Frontend: add unit tests (Vitest/Jest + React Testing Library).
Backend: JUnit 5 tests for services/controllers; use Testcontainers for Postgres if desired.

Formatting/Lint: ESLint/Prettier on frontend; Spotless/Checkstyle on backend.

#### Security Notes
Restrict your Maps API key (HTTP referrer restrictions; separate keys per environment). 
Google for Developers

Do not commit secrets (.env, credentials).

If you publish models, review license/attribution for any pretrained assets used (TensorFlow.js model garden / TF Hub). 
TensorFlow

#### Roadmap
Enhanced ballistic model (terrain, elevation, simple TOF tables).

Layer toggles for satellite, terrain, and overlays (MGRS grid).

Real-time collaboration (WebSocket) for multi-user planning.

Export/import scenario JSON.

## Notes on sources
- Google Maps JS API setup/overview and reference are cited for API-key steps and map initialization patterns. 
- TensorFlow.js docs cover pre-made models, browser-side ML, and example sentiment/object detection workflows. 
- Spring Boot/Gradle references confirm build/run conventions. 
- Postgres Docker image reference included for local DB setup. 
- Various sources (coded by flashing letters - CodePen, Author: ?, MapStyle: snazzymaps.com, bungie for the master chief drop in, ....

If you want this exported as a file, tell me the filename (e.g., `README.md`) and I’ll generate it here so you can download it.
::contentReference[oaicite:23]{index=23}
