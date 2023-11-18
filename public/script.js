// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Create the Navbar
    const navbarContainer = document.getElementById('navbar-container');
    const navbarHTML = `
        <!-- Bootstrap Navbar with Custom Styling -->
        <nav class="navbar navbar-expand-lg navbar-dark cool-navbar sticky-top">
            <a class="navbar-brand" href="/">PROJECT</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact">Contact Us</a>
                    </li>
                </ul>
            </div>

            <!-- Right-aligned buttons -->
            <ul class="navbar-nav ml-auto p-10">
                <li class="nav-item">
                    <a class="nav-link" href="#">Sign Up</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Login</a>
                </li>
            </ul>
        </nav>
    `;
    navbarContainer.innerHTML = navbarHTML;
});
