let params = {};
let regExp = /([^&=]+)=([^&]*)/g,
  m;
while ((m = regExp.exec(location.href))) {
  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
}
if (Object.keys(params).length !== 0) {
  localStorage.setItem("authInfo", JSON.stringify(params));
  localStorage.setItem("userName", params["name"]);
  localStorage.setItem("userEmail", params["email"]);
  localStorage.setItem("profilePic",params["prfileImage"])
}
//hide access token
window.history.pushState({}, document.title, "/" + "profile.html");

let info = JSON.parse(localStorage.getItem("authInfo"));

// console.log(info);
// console.log(info['access_token']);
// console.log(info['expires_in']);

fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
  headers: {
    Authorization: `Bearer ${info["access_token"]}`,
  },
})
  .then((response) => response.json())
  .then((userInfo) => {
    // console.log(userInfo);
    document.getElementById("name").innerHTML += userInfo.name;
    document.getElementById("mail").innerHTML += userInfo.email;
    document
      .getElementById("profileImage")
      .setAttribute("src", userInfo.picture);

    // Store name and email in local storage
    localStorage.setItem("userName", userInfo.name);
    localStorage.setItem("userEmail", userInfo.email);
    localStorage.setItem("profilePic",userInfo.picture);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function logOut() {
  fetch(
    "https://accounts.google.com/o/oauth2/revoke?token=" + info["access_token"],
    {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    }
  )
    .then((info) => {
      // clear local storage
      localStorage.clear();
      localStorage.setItem("authInfo", null);
      // redirect to index.html
      window.location.href = "https://mini-project-0vul.onrender.com/";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
