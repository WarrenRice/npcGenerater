const api_url = "https://api.parser.name/?api_key=YOUR_KEY&endpoint=generate";

document.addEventListener("DOMContentLoaded", function () {
  // Get references to the radio buttons and the Generate button
  const heroicModeRadio = document.getElementById("heroicMode");
  const averageModeRadio = document.getElementById("averageMode");
  const generateButton = document.getElementById("generateButton");

  // Get a reference to the NPC display div
  const npcDisplay = document.getElementById("npcDisplay");

  // Add an event listener to the Generate button
  generateButton.addEventListener("click", async function () {
    let selectedMode;

    // Check which radio button is selected
    if (heroicModeRadio.checked) {
      selectedMode = heroicModeRadio.value;
    } else if (averageModeRadio.checked) {
      selectedMode = averageModeRadio.value;
    } else {
      // If neither radio button is selected, you can handle it here
      console.log("Please select a mode.");
      return;
    }

    // Generate an NPC based on the selected mode
    const npc = await generateNPC(selectedMode); //do not display, wait until get the object

    // Display the NPC in the HTML
    displayNPC(npc, npcDisplay);
  });

  // Function to generate an NPC object based on the selected mode
  async function generateNPC(selectedMode) {
    let atk, def, hp, name;

    if (selectedMode === "Heroic") {
      atk = getRandomNumber(100, 200);
      def = getRandomNumber(100, 200);
      hp = getRandomNumber(100, 200);
    } else if (selectedMode === "Average") {
      atk = getRandomNumber(10, 100);
      def = getRandomNumber(10, 100);
      hp = getRandomNumber(10, 100);
    }

    name = await getName(); //do not return, wait until get the name

    //return an object
    return {
      NAME: name,
      ATK: atk,
      DEF: def,
      HP: hp,
    };
  }

  // Function to generate a random number in the specified range
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Function to display the NPC in the HTML
  function displayNPC(npc, displayElement) {
    displayElement.innerHTML = `
          <h3>Generated NPC</h3>
          <p>NAME: ${npc.NAME}</p>
          <p>ATK: ${npc.ATK}</p>
          <p>DEF: ${npc.DEF}</p>
          <p>HP: ${npc.HP}</p>
      `;
  }

  async function getName() {
    const response = await fetch(api_url);
    const data = await response.json();

    return (
      data.data[0].name.firstname.name + " " + data.data[0].name.lastname.name
    );
  }
});
