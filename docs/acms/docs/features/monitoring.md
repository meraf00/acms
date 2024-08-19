---
title: Monitoring
sidebar_label: Monitoring
sidebar_position: 2
---

The monitoring system is designed to facilitate and oversee remote contests while ensuring the integrity of the contest process. Below is a step-by-step outline of the system's flow, from contest creation to image monitoring and storage.

### 1. Contest Creation

- **Heads** have the ability to create contests within the system.
- When a contest is created, it is added to the system and becomes visible to all students. The actual contest is conducted on codeforces.
- Contest details, such as the codeforces contest url, start and end time, are configured during creation.

### 2. Student Registration

- Once a contest is created, students can view it in the list of available contests.

### 3. Image Capturing

- **Screen and Camera Monitoring**:
  - The monitoring system captures images from both the student’s screen and their camera at random intervals throughout the contest.

- **Image Upload and Storage**:
  - Captured images are uploaded to **Google Cloud Storage**.

- **Database Logging**:
  - The system stores the keys (references) to the uploaded images in a **MongoDB** database.

### 5. Post-Contest Review

- After the contest has concluded, **Heads** can review the captured images.

## Diagram

```mermaid
sequenceDiagram
    participant Student
    participant Frontend
    participant Backend
    participant GoogleCloudStorage
    participant MongoDB

    Student->>Frontend: Start Contest (Manual Input)
    Frontend->>Student: Request Camera and Screen Permissions
    Student-->>Frontend: Grant Permissions

    loop During Contest
        Frontend->>Student: Display Camera and Screen Recording
        Frontend->>Frontend: Capture Image (Random Interval: 3-10 min)
        
        Frontend->>GoogleCloudStorage: Upload Captured Image
        GoogleCloudStorage-->>Frontend: Confirm Image Upload

        alt Upload Success
            Frontend->>Backend: Notify Backend of Successful Upload
            Backend->>MongoDB: Register Image Key and Metadata
            Backend-->>Frontend: Confirm Registration
        else Upload Fails
            Frontend->>Frontend: Retry Upload (Maximum 5 Attempts)
        end
    end

    Backend->>Frontend: Notify Contest End (Triggered by Time)
    Frontend->>Student: Stop Camera and Screen Recording    

    Note over Frontend, Head: Head can view stored images
    Head->>Frontend: Request Captured Images
    Frontend->>Backend: Request Image Data
    Backend->>MongoDB: Retrieve Image Keys and Metadata
    MongoDB-->>Backend: Return Image Keys and Metadata
    Backend-->>Frontend: Provide Image URLs and Metadata

    loop Fetch Images
        Frontend->>GoogleCloudStorage: Request Image using URL
        GoogleCloudStorage-->>Frontend: Return Image
        Frontend-->>Head: Display Captured Images
    end
```
