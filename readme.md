# Image Management Web Application

## Project Description

This project is a web application where users can register, create nested folders, upload images inside these folders, and search for images by name. Users can only see and search the folders and images they have uploaded. The application includes user authentication, which is implemented using JWT tokens for signup and login.

## Features

1. **Signup**: Users can create a new account.
2. **Login**: Users can log into their account.
3. **Logout**: Users can log out of their account.
4. **Create Nested Folders**: Users can create folders and subfolders.
5. **Upload Images**: Users can upload images to specific folders. The required fields are the name of the image and the image file itself.
6. **View Folders and Images**: Users can view the folders and images they have uploaded.
7. **Search Images**: Users can search for images by name.

## Tech Stack

- **Back End**: Node.js
- **Front End**: React.js
- **Database**: MongoDB

## API Endpoints

### Authentication

- **Signup**: `POST /api/auth/signup`
- **Login**: `POST /api/auth/login`

### Folder Operations

- **Create Folder**: `POST /api/folder/`
- **Delete Folder**: `DELETE /api/folder/`
- **Get All Images and Folders in a Folder**: `GET /api/folder/all/:parentId?`
- **Get Folders in a Folder**: `GET /api/folder/:id?`

### Image Operations

- **Upload Image**: `POST /api/image/upload`
- **Get Images in a Specific Folder**: `GET /api/image/:folderId?`
- **Delete Image**: `DELETE /api/images`

## Database Schemas

### User Schema

| Field    | Type   | Description     |
|----------|--------|-----------------|
| username | String | Unique username |
| email    | String | Unique email    |
| password | String | User password   |

```javascript
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
```

### Image Schema

| Field      | Type                | Description             |
|------------|---------------------|-------------------------|
| name       | String              | Image name              |
| image      | String              | Image file              |
| folder     | mongoose.ObjectId   | Reference to Folder     |
| user       | mongoose.ObjectId   | Reference to User       |
| createdAt  | Date                | Image creation date     |

```javascript
const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
```

### Folder Schema

| Field      | Type                | Description             |
|------------|---------------------|-------------------------|
| name       | String              | Folder name             |
| user       | mongoose.ObjectId   | Reference to User       |
| parent     | mongoose.ObjectId   | Reference to Parent Folder |
| createdAt  | Date                | Folder creation date    |

```javascript
const FolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
```

## Authentication

JWT tokens are used for user authentication during signup and login. This ensures secure access to the user's resources.
