# Mini Project: Image Upload and LaTeX Equation Generation

This is a mini project created for the 5th semester. The project allows users to upload an image, preview the image, and then generate a LaTeX equation.

## Project Overview

The project consists of a simple web application that allows users to upload an image and then generates a LaTeX equation. The steps involved are as follows:

1. **Image Upload**
   - Users can upload an image of their choice.
   - The uploaded image is displayed in a preview section.

2. **Generate LaTeX Equation**
   - After uploading the image, users can generate a LaTeX equation.

## Project Structure

The project has the following structure:

- `index.html`: HTML file for the web application.
- `css/`: Directory containing CSS files.
  - `style.css`: Custom styles for the web application.
  - `navbar.css`: Styles for the navbar.
- `public/`: Directory for serving static files.
- `app.js`: Node.js server code.
- `script.js`: Client-side JavaScript for image preview and handling.

## Running the Project

1. Install necessary dependencies:
   - Node.js
   - Express
   - Body-parser
   - Multer

2. Run the server:
   ```bash
   node app.js
