window.addEventListener("DOMContentLoaded", event => {
  const projectList = document.querySelector(".projectList");
  const send = document.querySelector("#send");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");
  const sentMessage = document.querySelector("#cm");
  const thumbs = document.querySelector("#thumbs");
  const formMessage = document.querySelector("#formMessage");
  const menu = document.getElementById("menu");
  const navLinks = document.getElementsByClassName("navLink");
  const navigation = document.querySelector(".navigation");
  const title = document.querySelector(".title");
  const navHolder = document.querySelector("#navHolder");
  const sectionColor1 = "rgba(244, 222, 66, 0.7)";
  const sectionColor2 = "rgba(255, 255, 0, 0.2)";
  const checkImage = path =>
    new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve({ path, status: "ok" });
      img.onerror = () => resolve({ path, status: "error" });
      img.src = path;
    });

  //Checks wether or not an element is fully in view
  function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
    // Partially visible elements return true:
    isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }

  //get every second section 1,3,5...
  const sections = [...document.getElementsByTagName("section")];
  const oddSections = sections.filter((section, i) => {
    if (i % 2 == 0) {
      return section;
    }
  });

  //add ::before and ::after divs instead of using css pseudo-selectors
  for (let section of oddSections) {
    let bg = document.createElement("div"); //node to insert
    let after = document.createElement("div");
    after.className = "afterSection";
    let className = "sectionBg";
    bg.className = className;
    section.insertBefore(bg, section.firstChild);
    section.insertBefore(after, section.lastChild.nextSibling);
  }

  //Set background images
  if (document.documentElement.clientWidth >= 1024) {
    let backgroundLinks = ["img/apple2_min.jpg", "img/apple3_min.jpg"];
    //rgba(244, 110, 66, 1), rgba(255, 255, 0, 0.2)

    let proms = [];
    backgroundLinks.forEach(path => {
      proms.push(checkImage(path));
    });
    proms.forEach((prom, i) => {
      prom.then(res => {
        if (res.status == "ok") {
          oddSections[
            i
          ].firstChild.style.background = ` linear-gradient(45deg,${sectionColor1}, ${sectionColor2}),url("${
            res.path
          }") right/50% 100% no-repeat`;
        }
      });
    });
  }
  let screens = [];

  //set screenshot images
  let screenshotLinks = [
    "img/screenshot1_min.jpg",
    "img/screenshot2_min.jpg",
    "img/screenshot3_min.jpg",
    "img/screenshot4.png"
  ];
  screenshotLinks.forEach(path => {
    screens.push(checkImage(path));
  });
  screens.forEach(prom => {
    prom.then(res => {
      if (res.status == "ok") {
        projectList.insertAdjacentHTML(
          "beforeend",
          ` <div class="projectItem"> <img src=${
            res.path
          } alt="project screenshot image" /> <hr /> <div class="projectDescription"><p>some project description</p></div> </div>`
        );
      } else {
        return;
      }
    });
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
    //Show success or fail message.
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

  // toggle menu
  const toggleMenu = () => {
    [...navLinks].forEach(navLink => {
      navLink.classList.toggle("hidden");
    });
  };
  [...navLinks].forEach(navLink => {
    navLink.addEventListener("click", () => {
      toggleMenu();
    });
  });
  menu.addEventListener("click", () => {
    toggleMenu();
  });

  //Toggle Read more
  const readMore = document.querySelectorAll(".readMore");
  [...readMore].forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      let p = this.previousElementSibling;
      if (p.style.height != "auto") p.style.height = "auto";
      else p.style.height = 20 * 1.5 * 5 + "px";
      if (this.text == "Read more") this.text = "Read less";
      else this.text = "Read more";
    });
  });

  // Fixed navbar
  window.addEventListener("scroll", () => {
    if (document.documentElement.clientWidth >= 767) {
      if (!isScrolledIntoView(title)) {
        if ([...navigation.classList].includes("fixed")) {
        } else {
          navigation.classList.toggle("fixed");
        }
      } else {
        navigation.classList.remove("fixed");
      }
    } else {
      if (
        document.body.scrollTop > 0 ||
        document.documentElement.scrollTop > 0
      ) {
        title.classList.add("fixed");
        navigation.classList.add("fixed");
      } else {
        title.classList.remove("fixed");
        navigation.classList.remove("fixed");
        navigation.removeAttribute = "top";
      }
    }
  });

  //add anchor for each section

  sections.forEach(section => {
    let a = document.createElement("a");
    a.id = section.getAttribute("data-name");
    a.style.display = "block";
    a.style.visibility = "hidden";
    a.style.position = "relative";
    if (document.documentElement.clientWidth <= 767) {
      a.style.top = Math.ceil(0 - title.getBoundingClientRect().height) + "px";
    } else {
      a.style.top =
        Math.ceil(0 - navigation.getBoundingClientRect().height) + "px";
    }
    let cont = section.querySelector(".container");
    section.insertBefore(a, cont);
  });
});
