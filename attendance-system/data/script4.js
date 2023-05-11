const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const loginBox = document.getElementById("login-box");
const signupBox = document.getElementById("signup-box");

signupBox.classList.add("show");
let updatedJsonData;
async function goTo() {
    await fetch("attendence.json")
        .then(response => response.json())
        .then(jsonData => {
            // Modify the JSON data in memory
            jsonData["TE1"]["DSBDA"]["19-04-2023"].push("TC176");

            // Write the modified JSON data back to the file
            console.log(jsonData);
            updatedJsonData = JSON.stringify(jsonData);

            fetch("attendence.json", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: updatedJsonData
            })
                .then(response => response.json())
                .then(() => console.log("Data added to JSON file"))
                .catch(error => console.error(error));

        })
        .catch(error => console.error(error));



    // window.location.replace("http://192.168.4.1/ty?r=" + btoa(document.getElementById("nrn").value));
}




loginBtn.addEventListener("click", function () {
    loginBox.classList.add("show");
    signupBox.classList.remove("show");
    console.log(ip);
});

signupBtn.addEventListener("click", function () {
    signupBox.classList.add("show");
    loginBox.classList.remove("show");

});

function teacherLogin() {
    window.location.replace("http://192.168.4.1/admin");
}
