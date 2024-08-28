---
title: Authentication
sidebar_label: Authentication
sidebar_position: 1
---

The Contest Monitoring System uses Google OAuth for user authentication. Users must authenticate with their organizational email to access the system.

:::warning
Students are registered to the database manually. Registration is not open to the public. Potential improvement includes allowing heads to add students to the system or send invitations.
:::

Below are the two primary authentication flows:

### OAuth Authentication

In this flow, the user initiates the login process through a redirect to Google OAuth.

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant GoogleOAuth
    participant Database

    User->>Frontend: Clicks "Login"
    Frontend->>Backend: Redirects to Backend
    Backend->>GoogleOAuth: Redirects to Google OAuth
    GoogleOAuth-->>Backend: Authenticates User
    Backend->>Database: Check if User Exists
    alt User Not Found
        Backend-->>User: Authentication Fails
    else User Found
        Backend->>Backend: Generate Access Token
        Backend->>Frontend: Redirect to Success URL with Access Token
        Frontend->>Frontend: Save Access Token
        User->>Frontend: Access App
        Frontend->>Backend: Access Resource with Access Token
    end
```

### Login URL via Email

In this flow, the user can request a login URL, which is sent to their email.

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Email

    User->>Frontend: Requests Login URL
    Frontend->>Backend: Send Request for Login URL
    Backend->>Backend: Generate Access Token
    Backend->>Email: Send Login URL with Access Token
    Email-->>User: Receives Login URL
    User->>Frontend: Follows Login URL
    Frontend->>Backend: Verify Login URL and Retrieve Access Token
    Frontend->>Frontend: Save Access Token
    User->>Frontend: Access App
    Frontend->>Backend: Access Resource with Access Token
```
