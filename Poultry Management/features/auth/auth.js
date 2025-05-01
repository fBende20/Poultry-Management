

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }
  
  function isValidPassword(password) {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  }
  
  async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (!isValidPassword(password)) {
      alert("Password must be at least 8 characters long and include a number and a special character.");
      return;
    }
  
    const hashedPassword = await hashPassword(password);
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    if (users.find(u => u.username === username)) {
      alert("Username already exists!");
      return;
    }
  
    users.push({ username, password: hashedPassword });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! You can now login.");
    window.location.href = "./login.html";
  }
  
  async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const hashedPassword = await hashPassword(password);
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === hashedPassword);
  
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Login successful!");
      window.location.href = "/features/dashboard/dashboard.html";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  }
  
  function protectDashboard() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      window.location.href = "/index.html";
    }
  }
  
  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/index.html";
  }
  