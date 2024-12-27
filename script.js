// Function to render schedule dynamically with fallback for missing image
function renderSchedule() {
  const scheduleList = document.getElementById('schedule-list');
  sessions.forEach(session => {
    const listItem = document.createElement('div');
    listItem.classList.add('schedule-item');
    listItem.innerHTML = `
      <img src="${session.image || 'https://via.placeholder.com/150'}" alt="${session.title}" class="session-image">
      <h3>${session.title}</h3>
      <p><strong>Speaker:</strong> ${session.speaker}</p>
      <p><strong>Time:</strong> ${new Date(session.time).toLocaleString()}</p>
      <p><strong>Venue:</strong> ${session.venue}</p>
    `;
    scheduleList.appendChild(listItem);
  });
}

// Function to fetch and display sessions dynamically
function fetchSessions() {
  const scheduleList = document.getElementById('schedule-list');

  // Update the URL to use the new port 3004
  fetch('http://localhost:3004/api/sessions')
    .then((response) => response.json())
    .then((sessions) => {
      scheduleList.innerHTML = ''; // Clear existing content

      // Add each session to the schedule list
      sessions.forEach((session) => {
        const sessionItem = document.createElement('div');
        sessionItem.classList.add('schedule-item');

        sessionItem.innerHTML = `
          <img src="${session.image || 'https://via.placeholder.com/150'}" alt="${session.title}" class="session-image">
          <h3>${session.title}</h3>
          <p><strong>Speaker:</strong> ${session.speaker}</p>
          <p><strong>Time:</strong> ${new Date(session.time).toLocaleString()}</p>
          <p><strong>Venue:</strong> ${session.venue}</p>
        `;

        scheduleList.appendChild(sessionItem);
      });
    })
    .catch((error) => {
      console.error('Error fetching sessions:', error);
      scheduleList.innerHTML = '<p>Error loading schedule. Please try again later.</p>';
    });
}

// Function to handle registration
document.getElementById('registration-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        organization: document.getElementById('organization').value,
        sessions: Array.from(document.getElementById('sessions').selectedOptions).map(option => option.value),
    };

    try {
        // Update the URL to use the new port 3004
        const response = await fetch('http://localhost:3004/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message); // Success message
        } else {
            alert(result.error || 'Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});

// Call fetchSessions when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchSessions();
});