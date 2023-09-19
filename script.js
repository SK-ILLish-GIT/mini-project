// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Create the Navbar
    const navbarContainer = document.getElementById('navbar-container');
    const navbarHTML = `
        <!-- Bootstrap Navbar with Custom Styling -->
        <nav class="navbar navbar-expand-lg navbar-dark cool-navbar sticky-top">
            <a class="navbar-brand" href="#">PROJECT</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact</a>
                    </li>
                </ul>
            </div>

            <!-- Right-aligned buttons -->
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#">Sign Up</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Login</a>
                </li>
            </ul>

            <!-- Image Upload Input -->
            <form class="form-inline my-2 my-lg-0">
                <input type="file" class="form-control mr-sm-2" id="file-input" style="display: none;">
                <button class="btn btn-primary my-2 my-sm-0" type="button" id="upload-button">Upload Image</button>
            </form>
        </nav>
    `;

    navbarContainer.innerHTML = navbarHTML;

    // JavaScript to display the selected image
    const fileInput = document.getElementById('file-input');
    const imagePreview = document.getElementById('image-preview');
    const uploadButton = document.getElementById('upload-button');

    uploadButton.addEventListener('click', function () {
        fileInput.click();
    });

    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const image = document.createElement('img');
                image.src = e.target.result;
                imagePreview.innerHTML = '';
                imagePreview.appendChild(image);
            };

            reader.readAsDataURL(file);
        } else {
            imagePreview.innerHTML = 'No image selected';
        }
    });
});
