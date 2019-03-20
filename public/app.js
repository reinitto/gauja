window.addEventListener("DOMContentLoaded", event => {
  console.log("DOM fully loaded and parsed");
  const projectList = document.querySelector(".projectList");
  let screenshotLinks = [
    "img/screenshot1.png",
    "img/screenshot2.png",
    "img/screenshot3.png",
    "img/screenshot4.png"
  ].forEach(link => {
    projectList.insertAdjacentHTML(
      "beforeend",
      ` <div class="projectItem"> <img src=${link} alt="project screenshot image" /> <hr /> <div class="projectDescription"><p>some project description</p></div> </div>`
    );
  });
});
