document.addEventListener("DOMContentLoaded", () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const mealPlanInputs = document.getElementById("mealPlanInputs");
  
    // Dynamically generate input fields for meals
    days.forEach(day => {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("day-section");
      dayDiv.innerHTML = `
        <h4>${day}</h4>
        <label>Breakfast:</label>
        <input type="text" id="${day}_Breakfast" placeholder="Enter breakfast" required>
        <label>Snack:</label>
        <input type="text" id="${day}_Snack1" placeholder="Enter snack" required>
        <label>Lunch:</label>
        <input type="text" id="${day}_Lunch" placeholder="Enter lunch" required>
        <label>Snack:</label>
        <input type="text" id="${day}_Snack2" placeholder="Enter snack" required>
        <label>Dinner:</label>
        <input type="text" id="${day}_Dinner" placeholder="Enter dinner" required>
      `;
      mealPlanInputs.appendChild(dayDiv);
    });
  });
  
  // Function to generate meal plan
  function generatePlan() {
    const email = document.getElementById("email").value;
  
    // Validate email
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    const name = document.getElementById("name").value;
    const goal = document.getElementById("goal").value;
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let mealPlan = `
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
        h1, h2 { text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
      </style>
      <h1>${name}'s Weekly Meal Plan</h1>
      <p><strong>Goal:</strong> ${goal}</p>
      <table>
        <tr><th>Day</th><th>Breakfast</th><th>Snack</th><th>Lunch</th><th>Snack</th><th>Dinner</th></tr>
    `;
  
    // Add rows for each day
    days.forEach(day => {
      mealPlan += `
        <tr>
          <td>${day}</td>
          <td>${document.getElementById(`${day}_Breakfast`).value}</td>
          <td>${document.getElementById(`${day}_Snack1`).value}</td>
          <td>${document.getElementById(`${day}_Lunch`).value}</td>
          <td>${document.getElementById(`${day}_Snack2`).value}</td>
          <td>${document.getElementById(`${day}_Dinner`).value}</td>
        </tr>
      `;
    });
  
    mealPlan += "</table>";
  
    // Open new window and write the meal plan
    const newWindow = window.open();
    newWindow.document.write(mealPlan);
    newWindow.document.close();
  }
  
  // Email validation
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Clear form
  function clearForm() {
    document.getElementById("mealPlanForm").reset();
  }
  
  // Print plan
  function printPlan() {
    window.print();
  }
  
  // Download plan
  function downloadPlan() {
    const mealPlanHtml = document.documentElement.outerHTML;
    const blob = new Blob([mealPlanHtml], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "MealPlan.html";
    link.click();
  }