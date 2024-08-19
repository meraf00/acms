---
sidebar_position: 1
---

# Frontend

The frontend is built using **Next.js** and serves as the user interface for the application. It provides key features such as contest listing, user authentication, and monitoring interfaces.

## Folder Structure

```bash
├── src
│   ├── app
│   ├── components
│   ├── lib
│   │   ├── core
│   │   ├── features
│   │   │   ├── *feature folders*
│   │   │   │   ├── components
│   │   │   │   ├── hooks
│   │   │   │   ├── store
│   │   │   │   ├── types
│
├── public
│   ├── *static assets*
│   
├── .env.example
├── components.json
├── package.json
├── package-lock.json
└── .gitignore
```

### Key Folders

- **`/components`**: Contains reusable UI components like buttons, modals, and forms.
- **`/app`**: Follows the Next.js app routing.
- **`/public`**: Hosts static files that are served directly (e.g., images and fonts).
- **`/lib`**: Contains core and feature-specific logic. Each feature has its own folder with feature specific components, hooks, store, and types.
- **`.env.example`**: Example environment variables file.
- **`components.json`**: Configuration file for component generation with [shadcn](https://ui.shadcn.com/docs).
