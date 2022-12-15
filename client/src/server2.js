import globals from "./globals"; // Import global variables from another file
const ip = "http://localhost:1337"; // Define server address
//const ip = "http://213.188.154.113:1337"; // Alternate server address

// Function for sending HTTP requests to the server
const request = (method, url, headers, callback) => {
  // Create a new XMLHttpRequest object
  const req = new XMLHttpRequest();
  
  // Register event listeners for successful and failed requests
  req.addEventListener("load", ({ target }) => {
    // Parse response to JSON and pass it to the callback function
    callback(null, JSON.parse(target.responseText));
  });

  // Open the request and set the request method and headers
  req.open(method, url);
  if (headers) {
    Object.entries(headers).forEach(([key, value]) => {
      req.setRequestHeader(key, value);
    });
  }

  // Send the request
  req.send();
};

// Object for sending different types of requests to the server
const Server = {
  // Send a GET request for a prompt
  prompt: (type, prompt, index, callback) =>
    request("GET", `${ip}/prompt/${type}/${prompt}/${index}`, null, callback),

  // Send a GET request for a random value
  random: (type, size = 1, callback) =>
    request(
      "GET",
      `${ip}/random/${type}?size=${size}`,
      null,
      callback
    ),

  // Send a GET request to log in to the server
  login: (username, password, callback) =>
    request(
      "GET",
      `${ip}/login`,
      {
        Username: username,
        Password: password,
      },
      callback
    ),

  // Send a GET request to add a favorite
  addFavorite: (type, id, callback) =>
    request(
      "GET",
      `${ip}/addfavorite/${type}/${globals.userId}/${id}`,
      null,
      callback
    ),
};

// Export Server object as a module
export default Server;