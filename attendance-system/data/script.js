


let jsonData;
fetch('teacher.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var teacherName = "Asma"
        let output = "";
        console.log(data[teacherName].length);
        var radioButtonsDiv = document.getElementById('radioSubjects');

        for (let i = 0; i < data[teacherName].length; i++) {

            output += `<input type="radio" id="${'option' + i}" name="options" value="${'option' + i}">
            <label for="${'option' + i}">${data[teacherName][i]}</label>`;
        }
        radioButtonsDiv.innerHTML = output;


    })
    .catch(error => {
        console.error('Error loading JSON file:', error);
    });

