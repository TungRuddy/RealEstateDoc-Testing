
# RealEstateDoc interview

This app manage items with basic information: ID, Name, Type, Category, Price…


## Features

- Angular 19
- Interfaces with Angular Material
- TailwindCSS for styling and responsive design


## Run Locally With 4 Steps

Clone the project

```bash
  git clone https://github.com/TungRuddy/RealEstateDoc-Testing.git
```

Install dependencies

```bash
  npm install
```

Start the server for mock api

```bash
  npm run server
```

Start web application

```bash
  npm start
```

## Project Structure (Overview)

```javascript
RealEstateDoc-Testing/
├── server/                     # Mock API server
│   └── database.json           # JSON data for mock API
│
├── src/
│   ├── app/                    # Main application source
│   │   ├── items/              # Item-related components
│   │   ├── services/           # Data services and APIs
│   │   ├── pipes/              # Custom pipes
│   │   ├── models/             # TypeScript models/interfaces
│   │   └── share/              # Shared modules and components
│   │       └── redoc-table/    # Reusable table component
│   │
│   └── environments/           # Environment configs
│
├── package.json                # Project dependencies and scripts
└── angular.json                # Angular CLI configuration

```

