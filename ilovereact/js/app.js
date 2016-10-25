// Use the onscroll callback to update slider.
window.onscroll = function () {
    // ...
    updateSliderControl();
}

// Update the slider for the first time when the page is loaded.
window.onload = function () {
    // ...
    updateSliderControl();
    addSmoothScrolling();
};


function animateLogo() {
    console.log(window.scrollY)
    // TweenMax.to(".react-logo", 2, {
    //     css: {
    //         // animate multiple CSS properties at the same time
    //         // left: "200px",
    //         // rotation: 360,
    //         // ease: Linear.easeNone
    //     },

    //     repeat: -1,

    // });
    // setTimeout(animateLogo, 1000000000)
}

function updateSliderControl() {
    // get all the slider links
    var links = document.querySelectorAll("#slider-control a")

    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        // console.log(link)
        // Get the section pointed to by the link
        // var section = document.querySelector(link.attributes.getNamedItem("href").value);
        var section = document.querySelectorAll(".section")[i];

        var sectionTop = section.offsetTop
        var sectionBottom = sectionTop + window.innerHeight

        // Check if window.scrollY is between the section.
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            link.className = "active";
        } else {
            link.className = "";
        }
    }
}

function scrollToElement(element) {
    var topOfElement = element.offsetTop

    TweenMax.to(window, 1, {
        scrollTo: {
            y: topOfElement,
        },

        ease: Power2.easeInOut,
    });
}

function addSmoothScrolling() {
    var links = document.querySelectorAll("#slider-control a")

    for (var i = 0; i < links.length; i++) {

        //     function sc(index) {

        //     }(i)

        (function (n) {
            var link = links[n];
            console.log(link)
            link.addEventListener("click", function (event) {
                var section = document.querySelectorAll(".section")[n];

                // var section = document.querySelector(link.attributes.getNamedItem("href").value);
                // // console.log(section)
                scrollToElement(section);
            });
        })(i)
    }
}