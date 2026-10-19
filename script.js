
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "yourDesk";

// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "backyard" for the first example
  backyard: {
    title: "Location: Backyard",
    character: "Interviewee:Grandma",
    text: "Text: well what I remember happening is that Darcie went inside to play with her pretend kitchen, I heard her neighbor mention he was really hungry, and the dog ran around really quickly",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Chase after the dog (-10 HP)",
        action: function () {
          updateHealth(-10);
        },
        nextScene: "entrance"
      },
      {
        text: "Ask about the neighbor",
        nextScene: "hallway"
      },
      {
        text: "Pick up the brass key",
        action: function () {
          pickUpItem("brass key");
        },
        nextScene: "hallway"
      }
    ]
  },

  yourDesk: {
    title: "Location: Your Desk",
    text: "Your quiz is still unfinished. There are several problems that you don’t know how to solve.",
    choices: [
      {
        text: "Work on quiz (will make progress but burn time)",
        action: function () {
          updateTime(-1);
          updateProgress(2.5);
        },
      },
      {
        text: "Look at your friend's desk",
        action: function () {
          updateTime(-1);
        },
        nextScene: "friendDesk"
      },
      {
        text: "Look at wall of shame",
        action: function () {
          updateTime(-1);
          if (checkedWallOfShame) {
            updateScene("useWallOfShame");
          } else {
            updateScene("wallOfShame");
            checkedWallOfShame = true;
          }
        },
      },
      {
        text: "Use inventory item",
        action: function () {
          if (inventory.includes("goldfish") && !ateGoldfish) {
            updateScene("useGoldFish");
          } else {
            updateScene("noGoldFish");
          }
        }
      },
      {
        text: "Pretend to blow nose in corner",
        action: function () {
          updateTime(-1);
        },
        nextScene: "corner"
      },
      {
        text: "Pull out phone to cheat",
        action: function () {
          if (timeleft > 10) {
            updateScene("checkPhoneNotYet");
          } else if (timeleft > 5) {
            updateScene("checkPhoneAlmost");
          } else {
            updateScene("checkPhoneYes");
          }
        }
      }
    ]
  },

  noGoldFish: {
    title: "You don't have anything",
    text: "You don't have any items in your inventory. Maybe you should try to find something to help you with the quiz",
    choices: [
      {
        text: "Go back to your desk",
        nextScene: "yourDesk"
      }
    ]
  },

  useGoldFish: {
    title: "You have goldfish",
    text: "You have goldfish in your inventory. Wanna eat it?",
    choices: [
      {
        text: "Eat the goldfish",
        action: function () {
          ateGoldfish = true;
          updateHealth(-20);
          updateProgress(20);
          updateScene("ateGoldFish");
        }
      },
      {
        text: "Don't eat the goldfish",
        nextScene: "yourDesk"
      }
    ]
  },

  ateGoldFish: {
    title: "You ate the goldfish",
    text: "You ate it fatty. The goldfish imbued you with the power of cheddar. You feel a surge of energy that lets you solve a couple problems. You're lactose intolerant though so you lost 20 health.",
    choices: [
      {
        text: "Go back to your desk",
        nextScene: "yourDesk"
      }
    ]
  },

  checkPhoneNotYet: {
    title: "Trying to check the phone?",
    text: "Don't do that yet...you still have time, try something else first. Don't wanna get caught by Ms. Fong",
    choices: [
      {
        text: "Go back to your desk",
        nextScene: "yourDesk"
      }
    ]
  },

  checkPhoneAlmost: {
    title: "Trying to check the phone?",
    text: "You're running out of time, but you still have a little bit left. Maybe come back in a bit after trying something else",
    choices: [
      {
        text: "Go back to your desk",
        nextScene: "yourDesk"
      }
    ]
  },

  checkPhoneYes: {
    title: "Trying to check the phone?",
    text: "You are desparate and need a solution now, go ahead and check the wretched device...unless you're too scared",
    choices: [
      {
        text: "Check the phone",
        nextScene: "slimedOutEnding"
      },
      {
        text: "Go back to your desk",
        nextScene: "yourDesk"
      }
    ]
  },

  friendDesk: {
    title: "The Friend's Desk",
    text: "Your friend seems just as stumped as you. But he’s a little further ahead...",
    choices: [
      {
        text: "copy his work",
        action: function () {
          updateTime(-1);
          timesAskedFriend++;
          if (timesAskedFriend >= 3) {
            updateScene("noMoreCopy");
          } else {
            updateProgress(8);
            updateScene("yourDesk");
          }
        },
      }
    ]
  },

  noMoreCopy: {
    title: "The Friend's Desk",
    text: "You copied too many times. Your friend is now mad at you and refuses to let you copy",
    choices: [
      {
        text: "Go back to your desk",
        nextScene: "yourDesk"
      }
    ]
  },

  wallOfShame: {
    title: "The Wall of Shame",
    text: "You see a theorem that matches what the question on the quiz asks. That might be right...right?",
    choices: [
      {
        text: "Copy it down",
        action: function () {
          updateTime(-1);
          updateProgress(10);
        },
        nextScene: "yourDesk"
      },
      {
        text: "Go back",
        nextScene: "yourDesk"
      }
    ]
  },

  useWallOfShame: {
    title: "The Wall of Shame",
    text: "You already copied the theorem. Doesn't seem like anything else helpful is left",
    choices: [
      {
        text: "Go back",
        nextScene: "yourDesk"
      }
    ]
  },

  corner: {
    title: "The Corner",
    text: "You pretend to blow your nose. There’s some goldfish in the basket.",
    choices: [
      {
        text: "Ask for bathroom pass",
        action: function () {
          updateTime(-1);
        },
        nextScene: "bathroomPass"
      },
      {
        text: "Grab some goldfish like a fatty and then go back",
        action: function () {
          updateTime(-1);
          pickUpItem("goldfish");
        },
        nextScene: "yourDesk"
      },
      {
        text: "Peek into hallway through doorway",
        action: function () {
          updateTime(-1);
        },
        nextScene: "doorway"
      }
    ]
  },

  bathroomPass: {
    title: "Hell to the NAW",
    text: "Ms. Fong says no. You are not allowed to go to the bathroom.",
    choices: [
      {
        text: "Go back to your desk",
        nextScene: "yourDesk"
      }
    ]
  },

  doorway: {
    title: "The Doorway",
    text: "You peek into the hallway and see other students going to lunch in their freedom. You even see Mr. Price skipping down the hall.",
    choices: [
      {
        text: "Try to run into hallway",
        action: function () {
          updateTime(-1);
        },
        nextScene: "hallway"
      },
      {
        text: "go back to desk",
        nextScene: "yourDesk"
      }
    ]
  },

  hallway: {
    title: "The Hallway",
    text: "You try to bolt out into the hall but then run into an invisible wall of Ms. Fong’s pure aura. Ms. Price whistles like you should’ve known. You cannot escape this way.",
    choices: [
      {
        text: "Go back to your desk",
        nextScene: "yourDesk"
      }
    ]
  },

  doneWithQuiz: {
    title: "You finished the quiz!",
    text: "Quickly! Turn it in before Ms. Fong realizes you have 3 missing assignments to make up too!",
    choices: [
      {
        text: "Sneakily put the quiz in the bin",
        nextScene: "escapeEnding"
      }
    ]
  },

  // SOLUTIONS
  timeOutEnding: {
    title: "Your time has run out :(",
    text: "You keep scrambling only to look as your watch ticks further and further past the time you said you’d meet your friends. They’re certainly already gambling without you and won’t let you join now that you’ve stood them up. Your entire week is ruined because now you have irresponsible money that you haven’t gambled away. You will certainly now bribe Mr. D to give you an A on his test later, and while this will get you into Stanford, it will also cause the secret police to track you down when they find out what you did. You will spend the rest of your life in a Siberian prison once Trump trades you to Russia in exchange for Brittney Griner."
  },

  slimedOutEnding: {
    title: "That won't go well...",
    text: "You try to discretely unlock your phone by taking it out of your Yondr pouch that you didn’t lock at the gate. Face ID fails to recognize you because of how much your hands are shaking. You bring it up a little closer to your face before you hear a voice behind you that sends chills down your spine. “I told you to get rid of that wretched device! If you won’t put that phone away, I will put you away!” Ms. Fong locks you away in the basement where you have to solve washer and disk method problems for the rest of your life. She also puts you on the wall of SHAME back upstairs."
  },

  escapeEnding: {
    title: "You escaped!",
    text: "You escape! Congratulations, you will now spend the rest of lunch gambling until an OUSD culture keeper storms into the Burger King to shut everything down."
  }
}

// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");

// Then, we create a function to update the scene,
function updateScene(sceneName) {

  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  // Here, for each html element, you change the textContent to match
  // the appropriate text from the scene object
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  characterName.textContent = scene.character;

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";

  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });
}

// This updates the screen with the current scene
updateScene(currentScene);


// --------------------------------------------------
// HEALTH
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from health to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Create a variable for health
let health = 100;
let timeleft = 20;
let progresspercent = 35;
let timesAskedFriend = 0;
let checkedWallOfShame = false;
let ateGoldfish = false;

// Display current health
const healthDisplay = document.getElementById("health-display");
const timeDisplay = document.getElementById("time-display");
const progressDisplay = document.getElementById("progress-display");

// Create a function to update health 
function updateHealth(amount) {
  health += amount;
  healthDisplay.textContent = health;
}

// Create a function to update time
function updateTime(amount) {
  timeleft += amount;
  timeDisplay.textContent = timeleft;
  if (timeleft <= 0) {
    updateScene("timeOutEnding");
  }
}

// Create a function to update progress
function updateProgress(amount) {
  progresspercent += amount;
  if (progresspercent >= 100) {
    progresspercent = 100;
    updateScene("doneWithQuiz");
  }
  progressDisplay.textContent = progresspercent;
}

// This refreshes the health display
updateHealth(0);
updateTime(0);
updateProgress(0);

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const messageDisplay = document.getElementById("message-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
  // Add itemName to the inventory array
  // Show the updated inventory on the page
  inventory.push(itemName);
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
function unlockDoor() {
  if (inventory.includes("brass key")) {
    updateScene("solution");
  } else {
    messageDisplay.textContent = "The door is locked.";
  }
}

