console.log("Content script");

if (window.location.hash.includes("/result")) {
    console.log("Results screen");
}

return window;