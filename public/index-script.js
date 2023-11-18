const fileInput = document.getElementById("file-input");
const imagePreview = document.getElementById("image-preview");
const image = document.getElementById("image");
const generateButton = document.getElementById("generate-button");
const previewButton = document.getElementById("preview-button");
const croppedImgContainer = document.getElementById("cropped-img");
const notSelected  = document.getElementById("not-selected");
let cropper = "";
let finalImage="";

// Add an event listener to the file input
fileInput.addEventListener("change", function () {
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    notSelected.innerHTML = "🏞️ Image selected";
    // Read the uploaded file and display it in the image preview
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;
      img.classList.add("img-thumbnail");
      img.alt = "Uploaded Image";

      img.style.maxHeight = "300px";

      imagePreview.innerHTML = "";
      imagePreview.appendChild(img);
      finalImage=img;

      //Initialize cropper
      cropper = new Cropper(img);
      // console.log(canvas.toDataURL());
      //delete everything inside the cropped image container if there is any image inside delelte it
      // croppedImgContainer.innerHTML = "";
      // if(croppedImgContainer.hasChildNodes()){
      //   croppedImgContainer.removeChild(croppedImgContainer)
      // }
    };
    reader.readAsDataURL(file);

    generateButton.removeAttribute("disabled");
    previewButton.removeAttribute("disabled");
  } else {
    // If no file is selected, display a message
    if (cropper) {
      cropper.destroy();
    }
    notSelected.innerHTML = "🗾 No Image selected";
    generateButton.setAttribute("disabled", "disabled");
    previewButton.setAttribute("disabled", "disabled");
  }
});

previewButton.addEventListener("click", function (e) {
  e.preventDefault();

  // Get a canvas element from Cropper.js
  const canvas = cropper.getCroppedCanvas();
  // console.log(canvas.toDataURL());
  if (canvas.toDataURL()) {
    // Create a new Image element for the cropped image
    const croppedImg = new Image();
    croppedImg.src = canvas.toDataURL();
    croppedImg.classList.add("img-thumbnail");
    croppedImg.alt = "Cropped Image";
    croppedImg.style.maxHeight = "300px";
    // Append the cropped image to the container
    croppedImgContainer.innerHTML = "";
    croppedImgContainer.appendChild(croppedImg);
    finalImage=croppedImg;
  }
  // else{
  //   if(croppedImgContainer.hasChildNodes()){
  //     croppedImgContainer.removeChild(croppedImgContainer)
  //   }
  // }
});

// generateButton.addEventListener("click", function (event) {
//   // Prevent the default form submission
//   event.preventDefault();

//   // Your image processing logic here...
//   console.log("here..")
//   // Convert the image data to a Blob
//   const blob = new Blob([finalImage], { type: 'image/bmp' });

//   // Create a FormData object and append the image file
//   const formData = new FormData();
//   formData.append('input_image', blob, 'input_image.bmp');

//   // Send a POST request using fetch
//   fetch('/', {
//       method: 'POST',
//       body: formData,
//   })
//   .then(response => response.json())
//   .then(data => {
//       // Handle the response data as needed
//       console.log('Response:', data);
//   })
//   .catch(error => {
//       console.error('Error:', error);
//   });
// });