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
                    <button id="signUp" onclick="signIn()">
                        <img src="/images/logo/gLogo.png" alt="Google Logo" style="height: 25px; margin-right: 10px;">
                    </button>
                </li>
            </ul>
        </nav>
    `;
    navbarContainer.innerHTML = navbarHTML;
});
function signIn(){
    let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    let form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);
    let params = {
        'client_id': '895922906167-i2pe2g5s8m57oi8gjgolahpuqc63aus7.apps.googleusercontent.com',
        'redirect_uri': 'http://127.0.0.1:3000/profile.html',
        'response_type': 'token',
        'scope': 'openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        'include_granted_scopes': 'true',
        'state': 'pass-through value'
    };
    for(var p in params){
        let input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
}
