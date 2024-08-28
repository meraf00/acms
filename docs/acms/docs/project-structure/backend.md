---
sidebar_position: 1
---

# Backend

The backend is built using **NestJS**. All modules follow common patterns to ensure consistency and maintainability.

## Folder Structure

```bash
├── src
│   ├── modules
│   │   └─── **module**
│   │       ├── dtos
│   │       ├── entities
│   │       ├── services
│   │       ├── controllers
│   │       └── **module**.module.ts
│   │
│   ├── shared
│   │   ├── events
│   │   ├── pipes
│   │   ├── interceptors
│   │   ├── controllers
│   │   ├── services
│   │   ├── config
│   │   └── types
│   │   
│   ├── app.service.ts
│   ├── app.controller.ts
│   └── main.ts
│   
├── .env.example
├── app.example.yaml
├── bucket.cors.json
├── package.json
├── package-lock.json
└── .gitignore

```

## Key Folders and Files

### `/src`

The `src` directory contains the main source code of the application.

#### `/src/modules`

The `modules` directory is where the application's core functionality is divided into separate, self-contained modules. Each module typically represents a specific domain of the application.

- **`/src/modules/**module**`**: This is a placeholder for individual modules, each of which follow the usual NestJS module structure.
  
#### `/src/shared`

The `shared` directory contains shared resources and utilities that are used across multiple modules. These are generic components that can be reused throughout the application.

- **`/src/shared/events`**: Contains event-related classes, constant names and handlers for event-driven patterns, such as implementing event emitters and listeners.
- **`/src/shared/pipes`**: Houses custom pipes, which are used for transforming and validating data before it is processed by a controller or service.
- **`/src/shared/interceptors`**: Includes interceptors that format and modify of requests and responses.
- **`/src/shared/controllers`**: Contains base controllers that are extended by other controllers in the application. These include common CRUD logic shared across multiple controllers.
- **`/src/shared/services`**: Generic base service class that implements CRUD login and are reused across different modules.
- **`/src/shared/config`**: Holds configuration files and classes that manage and validate application settings, environment variables, and other configuration-related logic.
- **`/src/shared/types`**: Contains TypeScript type definitions and interfaces that are shared across the application, for strong typing and reducing duplication.

### Project Root Files

- **`.env.example`**: An example environment configuration file that lists all the environment variables needed for the application, providing a template for creating your own `.env` file.
- **`app.example.yaml`**: An example YAML configuration file, used for configurations related to GCP mainly GAE.
- **`bucket.cors.json`**: A JSON file that defines the CORS (Cross-Origin Resource Sharing) configuration for a google storage bucket. You will need to use [gsutil cli](https://cloud.google.com/sdk/docs/install) to configure CORS on google cloud storage.
