window.addEventListener("DOMContentLoaded", event => {
  console.log("DOM fully loaded and parsed");
  const projectList = document.querySelector(".projectList");
  const send = document.querySelector("#send");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");
  const sentMessage = document.querySelector("#cm");
  const thumbs = document.querySelector("#thumbs");
  const formMessage = document.querySelector("#formMessage");

  const checkImage = path =>
    new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve({ path, status: "ok" });
      img.onerror = () => resolve({ path, status: "error" });
      img.src = path;
    });

  //Set background images
  let backgroundLinks = ["img/apple2-min.jpg", "img/apple3-min.jpg"];
  const sections = [...document.getElementsByTagName("section")].filter(
    (section, i) => {
      if (i % 2 == 0) {
        return section;
      }
    }
  );
  for (let section of sections) {
    let bg = document.createElement("div"); //node to insert
    let after = document.createElement("div");
    after.className = "afterSection";
    let className = "sectionBg";
    bg.className = className;
    section.insertBefore(bg, section.firstChild);
    section.insertBefore(after, section.lastChild.nextSibling);
  }

  //rgba(244, 110, 66, 1), rgba(255, 255, 0, 0.2)
  let sectionColor1 = "rgba(244, 110, 66, 1)";
  let sectionColor2 = "rgba(255, 255, 0, 0.2)";
  let proms = [];
  backgroundLinks.forEach(path => {
    proms.push(checkImage(path));
  });
  proms.forEach((prom, i) => {
    prom.then(res => {
      if (res.status == "ok") {
        sections[
          i
        ].firstChild.style.background = ` linear-gradient(45deg,${sectionColor1}, ${sectionColor2}),url("${
          res.path
        }") right/50% 100% no-repeat`;
      }
    });
  });

  //set screenshot images
  let screenshotLinks = [
    "img/screenshot1-min.png",
    "img/screenshot2-min.png",
    "img/screenshot3-min.png",
    "img/screenshot4.png"
  ].forEach(link => {
    projectList.insertAdjacentHTML(
      "beforeend",
      ` <div class="projectItem"> <img src=${link} alt="project screenshot image" /> <hr /> <div class="projectDescription"><p>some project description</p></div> </div>`
    );
  });

  //Click handler for contact
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
