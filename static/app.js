// taking value in the localstorage:
const value = sessionStorage.getItem("value")
console.log(value)

if (value) {
    const homecontroller = document.getElementById('homecontainer').style.width = "0px"
    console.log(homecontroller)
    const maincontainer = document.getElementById('backcontainer').style.display = "inherit"

} else {
    // opening homecontainer in this :

    console.log("app.js is working")
    const homecontroller = document.getElementById('homecontainer').style.width = "1200px"
    console.log(homecontroller);

    function closefunction() {
        console.log("clicked on back back button");
        const homecontroller = document.getElementById('homecontainer').style.width = "0px"
        console.log(homecontroller)
        const maincontainer = document.getElementById('backcontainer').style.display = "inherit"

        // saveing true value in local storage:
        window.sessionStorage.setItem("value", 1)

    }
    
    // displaying main container when click on back:
    const maincontainer = document.getElementById('backcontainer').style.display = "none"
    console.log(maincontainer);
}