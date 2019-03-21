window.addEventListener("DOMContentLoaded", event => {
  console.log("DOM fully loaded and parsed");
  const projectList = document.querySelector(".projectList");
  const send = document.querySelector("#send");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");
  const sentMessage = document.querySelector("#cm");
  const thumbs = document.querySelector("#thumbs");
  const formMessage = document.querySelector("#formMessage");
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

  send.addEventListener("click", () => {
    const Url = "/sendEmail";
    const Data = {
      email: email.value,
      message: message.value
    };
    const params = {
      method: "POST",
      body: JSON.stringify(Data),
      headers: { "content-type": "application/json; charset=UTF-8" }
    };

    fetch(Url, params)
      .then(res => res.json())
      .then(res => {
        if (res.ok) {
          sentMessage.classList.remove("contactSent");
          sentMessage.classList.remove("contactFail");
          sentMessage.classList.add("contactSuccess");
          thumbs.classList.remove("fa-thumbs-down");
          thumbs.classList.add("fa-thumbs-up");
          formMessage.textContent = "Message successfully sent!";
          email.value = "";
          message.value = "";
        } else {
          sentMessage.classList.remove("contactSent");
          sentMessage.classList.remove("contactSuccess");
          sentMessage.classList.add("contactFail");
          thumbs.classList.remove("fa-thumbs-up");
          thumbs.classList.add("fa-thumbs-down");
          formMessage.textContent = "Failed to send message! Please try again.";
        }
      })
      .catch(err => console.log("error occured, try again"));

    setTimeout(function() {
      sentMessage.classList.remove("contactFail");
      sentMessage.classList.remove("contactSuccess");
      sentMessage.classList.add("contactSent");
    }, 2500);
  });
});
