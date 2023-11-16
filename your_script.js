// User data storage
const users = {};

// Function to hash a password using a basic hash function (for educational purposes)
function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return hash.toString();
}

// Function to register a new user
function register() {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  // Check if the username is already taken
  if (users[username]) {
    console.error("Username already taken. Please choose another one.");
    return;
  }

  // Use a basic hash function for password (for educational purposes)
  const hashedPassword = hashPassword(password);

  // Store the user information in local storage
  localStorage.setItem(username, JSON.stringify({ username, password: hashedPassword }));

  console.log("Registration successful!");

  // Redirect to the login page
  window.location.href = "./login.html";
}

function login() {
    const usernameInput = document.getElementById("loginUsername");
    const passwordInput = document.getElementById("loginPassword");
  
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
  
    // Retrieve user information from local storage
    const storedUserData = localStorage.getItem(username);
  
    // Check if the user exists
    if (!storedUserData) {
      console.error("User not found. Please register first.");
      return;
    }
  
    const user = JSON.parse(storedUserData);
  
    // Verify the password using a basic hash function
    if (user.password === hashPassword(password)) {
      console.log("Login successful! Welcome, " + username + "!");
  
      // Redirect to a new page after successful login
      window.location.href = "./welcome.html"; // Replace with the desired page URL
    } else {
      console.error("Incorrect password. Please try again.");
  
      // Show popup for incorrect credentials
      showPopup("Bad Credentials");
    }
  }

// Function to show a popup message
function showPopup(message) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.textContent = message;

  // Append the popup to the body
  document.body.appendChild(popup);

  // Remove the popup after a short delay (e.g., 2 seconds)
  setTimeout(() => {
    document.body.removeChild(popup);
  }, 2000);
}
