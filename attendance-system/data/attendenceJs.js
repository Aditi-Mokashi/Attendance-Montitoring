let jsonData;
fetch('attendence.json')
    .then(response => response.json())
    .then(data => {
        var className = "TE1"
        var sub = "DSBDA"
        var date = "19-04-2023";

        let output = "";
        console.log(data[className][sub][date]);

        var radioButtonsDiv = document.getElementById('studentsPresent');
        let counter = 1;

        for (let i = 0; i < data[className][sub][date].length; i++) {

            output += `<tr>
            <td>${counter}</td>
            <td>${data[className][sub][date][i]}</td> </tr>`;
            counter++;
        }

        radioButtonsDiv.innerHTML = output;


    })
    .catch(error => {
        console.error('Error loading JSON file:', error);
    });