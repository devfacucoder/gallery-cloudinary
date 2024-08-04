
# Gallery Cloudinary

This project is a simple image gallery that allows users to upload, view, and delete images using Cloudinary for image storage. It includes authentication to ensure that only authorized users can manage images.

## Features

- Image Upload: Users can upload images to Cloudinary.
- Image Deletion: Users can delete images from Cloudinary.
- User Authentication: Only authenticated users can manage images.
- Multiple Image Upload: Users can upload multiple images at once.


## Installation

Install my-project with npm

```bash
  git clone https://github.com/devfacucodergallery-cloudinary.git
  cd gallery-cloudinary
```
nstall dependencies
```bash
  npm Install
```
Create a ".env" file in the root directory with the following variables:
```bash
  PORT=3000
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
  SECRETJWT=your_jwt_secret
```
Start the server:

```bash
  npm Start
```
## API Reference

#### Upload a single image

```http
  POST api/image/upload
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `image` | `form-data` |**Required**. Image to upload |

#### DELETE item

```http
  DELETE /api/image/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |

#### POST
```http
  POST /api/image/upload-multiple
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `images`      | `form-data` | **Required**. array images

#### User endpoints

#### GET
```http
  GET /api/users
```
#### POST
```http
  POST /api/users
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nickname`      | `string` | nickname users
| `password` |`string`| Must be strong, containing uppercase letters, numbers, and special character                       |
| `email` | `string` | Must be a valid email address |

## Upcoming Features
#### Future Endpoints
- DELETE `/api/users/:id`
    Endpoint to delete a user by their ID.
- PUT `/api/users/:id`
    Endpoint to edit user details by their ID.

## Future Features

- **Email Verification on Registration**: In a future update, we will implement email verification for new users during registration. This feature will help ensure the authenticity of users and enhance the security of the platform.
## Authors

- [@devfacucoder](https://github.com/devfacucoder)

