let roles = ["Mafia", "Doctor", "Detective", "Jester", "Citizen", "Mayor", "Shapeshifter"]
let assignedRoles = []
let error = document.getElementById("error");

function getNameByRole(role) {
    let entry = assignedRoles.find(person => person.role === role);
    return entry ? entry.name : null;
}

function killPerson(name){
    let person = assignedRoles.find(p => p.name === name);
    if(person){
        person.alive = false;
    }
}

function savePerson(guy){
    let person = assignedRoles.find(p => p.guy === guy);
    if(person){
        person.alive = true;
    }
}

function Narrator() {
    let mafiaAlive = assignedRoles.some(person => person.role === "Mafia" && person.alive);
    let count = 0;

    while(mafiaAlive && assignedRoles.length > 2){
        assignedRoles.forEach((role, i) => {
            if(role.role === "Mafia"){
                console.log("Mafia put your head up");
                Mafia();
            }
            else if(role.role === "Doctor"){
                console.log("Doctor put your head up");
                Doctor();
            }
            else if(role.role === "Detective"){
                console.log("Detective put your head up");
                Detective();
            }
        })
    }
}

function players() {
    let numOfPlayers = Number(document.getElementById("numOfPlayers").value);

    if(numOfPlayers >= 3){
        let playerNames = [];

        for(let i = 0; i< numOfPlayers; i++){
            let name = prompt(`Enter player ${i + 1}`);
            playerNames.push(name)
        }

        let container = document.getElementById("cardContainer");

        playerNames.forEach((playerName, index) => {
            let card = document.createElement("div");
            card.classList.add("card");
            card.id = "card" + index;
            card.textContent = playerName;
            container.appendChild(card);
        })
        let tempNames = [...playerNames];
        let tempRoles = ["Mafia", "Doctor", "Detective"];
        if(numOfPlayers>3){
            tempRoles.forEach((roleName) => {
                let randomNum = Math.floor(Math.random() * tempNames.length);
                let randomName = tempNames[randomNum];
                let assignedName = {name: randomName, role: roleName, alive: true};
                tempNames.splice(randomNum,1);
                assignedRoles.push(assignedName);
            })
            let remainingRoles = roles.slice(3);
            tempNames.forEach((Name) => {
                let randomNumRole = Math.floor(Math.random() * remainingRoles.length);
                let randomRole = remainingRoles[randomNumRole];
                let assignedName = {name: Name, role: randomRole, alive: true};
                assignedRoles.push(assignedName);
            })
        }
        else{
        let tempNames = [...playerNames];
        let tempRoles = ["Mafia", "Doctor", "Detective"];
        tempRoles.forEach((roleName) => {
                let randomNum = Math.floor(Math.random() * tempNames.length);
                let randomName = tempNames[randomNum];
                let assignedName = {name: randomName, role: roleName, alive: true};
                tempNames.splice(randomNum,1);
                assignedRoles.push(assignedName);
            })
        }
        console.log(assignedRoles);
}
    else{
        error.textContent = "Must be atleast 3 players";
    }
    
}