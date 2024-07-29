let taskProgressChart;


async function fetchAndCreateTaskProgressChart() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzT1Jlu8CnbitVKtMu-owOJ8K6rFHsd7mRAu5ckt5pTOt-7ACy7OiTxrZYnBqpEZPWr/exec'); // Replace with your web app URL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const taskNames = data.slice(1).map(row => row[1]);
        const taskProgress = data.slice(1).map(row => row[7]);

        const ctx = document.getElementById('taskProgressChart').getContext('2d');

        // Generate an array of shades of blue for the bars
        const colors = [
            '#3366CC', '#3399FF', '#7EC9FF', '#ac97ff', '#33FFCC',
            '#66CCFF', '#6699FF', '#6633CC', '#6633FF', '#6666FF'
        ];

        if (taskProgressChart) {
            taskProgressChart.destroy();
        }
        taskProgressChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: taskNames,
                datasets: [{
                    label: 'Task Progress',
                    data: taskProgress,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1 // Since progress is between 0 and 1
                    },
                    x: {
                        display: false // Hide the x-axis labels
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            generateLabels: function(chart) {
                                return taskNames.map((task, index) => {
                                    return {
                                        text: task,
                                        fillStyle: colors[index % colors.length],
                                        hidden: false,
                                        lineCap: "butt",
                                        lineDash: [],
                                        lineDashOffset: 0,
                                        lineJoin: "miter",
                                        strokeStyle: colors[index % colors.length],
                                        pointStyle: "circle",
                                        rotation: 0,
                                    };
                                });
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${taskNames[tooltipItem.dataIndex]}: ${(tooltipItem.raw * 100).toFixed(2)}%`;
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Fetch error:', error);
        alert('There was a problem fetching the task progress data.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // Create canvas element for the chart
    const canvas = document.createElement('canvas');
    canvas.id = 'taskProgressChart';
    chartContainer.appendChild(canvas);

    fetchAndCreateTaskProgressChart().then(() => {
        loadingElement.style.display = 'none';
        chartContainer.style.display = 'block';
    });
});

//RESOURCES AVAILABILITY CHART (DASHBOARD)
let resourcesChart;
let requestedResourcesChart;

async function fetchAndCreateChart() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwk9ungutaZ3jyOYDV0B12dI73zK0_DpFUe_qJhd6CEmeb4KuOvNykWoT3LVAdrLWWT/exec'); // Replace with your web app URL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const labels = data.slice(1).map(row => row[0]);
        const values = data.slice(1).map(row => row[1]);

        const ctx = document.getElementById('resourcesChart').getContext('2d');
        if (resourcesChart) {
            resourcesChart.destroy(); 
        }
       resourcesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Available Quantity',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    barThickness: 80, // Adjusted bar thickness
                    maxBarThickness: 80, // Adjusted max bar thickness

                }]
            },
            options: {
                maintainAspectRatio: false,
                aspectRatio: 1.5, // Adjusted aspect ratio
                layout: {
                    padding: {
                        left: 20,
                        right: 20,
                        top: 20,
                        bottom: 20
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 20, // Set the step size to 20
                            max: 100 // Set the maximum value if necessary
                        }
                    },
                    x: {
                        ticks: {
                            autoSkip: false
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Fetch error:', error);
        alert('There was a problem fetching the resource data.');
    }
}

//RESOURCES REQUEST CHART (DASHBOARD)
async function fetchAndCreateRequestedResourcesChart() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzeQaqmFvV0ha5KliZtjyHh_18IaefzsZebBXiiGgYX9D5RhCsltgFJF6mg8SER_NUg/exec'); // Replace with your web app URL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const labels = data.map(row => row.resourceName);
        const values = data.map(row => row.quantityRequest);

        const ctx = document.getElementById('requestedResourcesChart').getContext('2d');
        if (requestedResourcesChart) {
            requestedResourcesChart.destroy();
        }
        requestedResourcesChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Requested Quantity',
                    data: values,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 20,
                        right: 20,
                        top: 20,
                        bottom: 20
                    }
                }
            }
        });
    } catch (error) {
        console.error('Fetch error:', error);
        alert('There was a problem fetching the requested resources data.');
    }
}

//NOTIFICATION (RESOURCES)(APPOINTMENT)

document.addEventListener('DOMContentLoaded', function () {
    const notificationButton = document.getElementById('notification-button');
    const notificationContent = document.getElementById('notification-content');
    const resourcesTab = document.getElementById('resources-tab');
    const appointmentsTab = document.getElementById('appointments-tab');
    const resourcesContent = document.getElementById('resources-content');
    const appointmentsContent = document.getElementById('appointments-content');
    const tabButtons = document.querySelector('.tab-buttons');

    // Create the tab indicator element
    const tabIndicator = document.createElement('div');
    tabIndicator.classList.add('tab-indicator');
    tabButtons.appendChild(tabIndicator);

    // Function to switch tabs
    function switchTab(tab) {
        if (tab === 'resources') {
            resourcesTab.classList.add('active-tab');
            appointmentsTab.classList.remove('active-tab');
            resourcesContent.classList.remove('hidden');
            appointmentsContent.classList.add('hidden');
            moveIndicator(resourcesTab);
        } else if (tab === 'appointments') {
            resourcesTab.classList.remove('active-tab');
            appointmentsTab.classList.add('active-tab');
            resourcesContent.classList.add('hidden');
            appointmentsContent.classList.remove('hidden');
            moveIndicator(appointmentsTab);
        }
    }

    // Function to move the tab indicator
    function moveIndicator(tab) {
        const tabRect = tab.getBoundingClientRect();
        const tabButtonsRect = tabButtons.getBoundingClientRect();
        const offset = tabRect.left - tabButtonsRect.left;
        tabIndicator.style.transform = `translateX(${offset}px)`;
        tabIndicator.style.width = `${tabRect.width}px`;
    }

    // Event listeners for tab clicks
    resourcesTab.addEventListener('click', function () {
        switchTab('resources');
    });

    appointmentsTab.addEventListener('click', function () {
        switchTab('appointments');
    });

    notificationButton.addEventListener('click', function () {
        if (notificationContent.classList.contains('hidden')) {
            fetchData();
            notificationContent.classList.remove('hidden');
            notificationContent.style.display = 'block';
            // Set the initial position of the tab indicator
            moveIndicator(document.querySelector('.tab-button.active-tab'));
        } else {
            notificationContent.classList.add('hidden');
            notificationContent.style.display = 'none';
        }
    });

    // Function to fetch data
    function fetchData() {
        resourcesContent.innerHTML = '<p>Loading...</p>';
        appointmentsContent.innerHTML = '<p>Loading...</p>';
        fetchResourcesData();
        fetchAppointmentsData();
    }

    function fetchResourcesData() {
        fetch('https://script.google.com/macros/s/AKfycbzeQaqmFvV0ha5KliZtjyHh_18IaefzsZebBXiiGgYX9D5RhCsltgFJF6mg8SER_NUg/exec') // Replace with your Web App URL
            .then(response => response.json())
            .then(data => {
                displayResourcesData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function fetchAppointmentsData() {
        fetch('https://script.google.com/macros/s/AKfycbwvYPrIm1zGmzkP16UljxkM6gtUjuH7Rk9wk-ojTb7H9WhiY5nJ9PMBURSmFAiBbMW7/exec')
            .then(response => response.json())
            .then(data => {
                displayAppointmentsData(data);
            })
            .catch(error => console.error('Error fetching appointments data:', error));
    }

    function displayResourcesData(data) {
        resourcesContent.innerHTML = ''; // Clear previous content
        data.forEach(item => {
            const box = document.createElement('div');
            box.className = 'resource-box'; // Use your existing CSS class
            box.innerHTML = `
                <h2>${item.resourceName}</h2>
                <p>Quantity Requested: ${item.quantityRequest}</p>
            `;
            resourcesContent.appendChild(box);
        });
    }

    function displayAppointmentsData(data) {
        appointmentsContent.innerHTML = ''; // Clear previous content
        data.slice(1).forEach(item => {
            const box = document.createElement('div');
            box.className = 'resource-box'; // Use your existing CSS class
            box.innerHTML = `
                <h2>${item[5]}</h2>
                <p>Date: ${item[3]}</p>
                <p>Time: ${item[4]}</p>
            `;
            appointmentsContent.appendChild(box);
        });
    }
});

//COURSE CARD (MAIN PAGE)

document.getElementById('course-dashboard').addEventListener('click', function() {
    document.getElementById('dashboard-link').click();
});

document.getElementById('course-task').addEventListener('click', function() {
    document.getElementById('task-link').click();
});

document.getElementById('course-resources').addEventListener('click', function() {
    document.getElementById('resources-link').click();
});

document.getElementById('course-meet').addEventListener('click', function() {
    document.getElementById('meet-link').click();
});

document.getElementById('course-project').addEventListener('click', function() {
    document.getElementById('project-link').click();
});

document.getElementById('logo-link').addEventListener('click', function() {
    document.getElementById('main-content').innerHTML = `
        <section class="welcome">
             <section class="welcome-banner">
                <div class="banner-image left">
                    <img src="images/mascot.png" alt="Left Image">
                </div>
                <div class="banner-content center">
                    <h1>Hi, Welcome to Kirbix.</h1>
                    <p>Effortlessly Manage Your Small Business, All-in-One Automation on a Single Website!</p>
                </div>
                <div class="banner-image right">
                    <img src="images/operate.png" alt="Right Image">
                </div>
        </section>
        <section class="courses">
            <div class="course-banner" id="course-dashboard">
                <div class="cbanner-image">
                    <img src="images/dashboard-icon.png" alt="Dashboard Icon">
                </div>
                <div class="cbanner-content">
                    <h2>Dashboard</h2>
                    <p>View your dashboard of resources.</p>
                </div>
            </div>
            <div class="course-banner" id="course-task">
                <div class="cbanner-image">
                    <img src="images/task-icon.png" alt="Task Icon">
                </div>
                <div class="cbanner-content">
                    <h2>Task Management</h2>
                    <p>Manage and allocate your tasks efficiently.</p>
                </div>
            </div>
            <div class="course-banner" id="course-resources">
                <div class="cbanner-image">
                    <img src="images/resources-icon.png" alt="Resources Icon">
                </div>
                <div class="cbanner-content">
                    <h2>Resources</h2>
                    <p>Access various resources for your projects.</p>
                </div>
            </div>
            <div class="course-banner" id="course-meet">
                <div class="cbanner-image">
                    <img src="images/meet-icon.png" alt="Meet Icon">
                </div>
                <div class="cbanner-content">
                    <h2>Meet</h2>
                    <p>Organize and join meetings.</p>
                </div>
            </div>
            <div class="course-banner" id="course-project">
                <div class="cbanner-image">
                    <img src="images/project-icon.png" alt="Project Icon">
                </div>
                <div class="cbanner-content">
                    <h2>Project</h2>
                    <p>Manage your projects and track progress.</p>
                </div>
            </div>
        </section>`;
    addCourseBannerListeners();
});

//CALENDER

const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prev8tn = document.getElementById('prev8tn');
const next8tn = document.getElementById('next8tn');

let currentDate = new Date();

const updateCalendar = (dueDates = []) => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    monthYearElement.textContent = monthYearString;

    let datesHTML = '';

    for (let i = firstDayIndex; i > 0; i--) {
        const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
        datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
    }

    for (let i = 1; i <= totalDays; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const dateString = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        const isDueDate = dueDates.includes(dateString);
        const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
        const dueDateClass = isDueDate ? 'due-date' : '';
        datesHTML += `<div class="date ${activeClass} ${dueDateClass}">${i}</div>`;
    }

    for (let i = 1; i <= 7 - lastDayIndex; i++) {
        const nextDate = new Date(currentYear, currentMonth + 1, i);
        datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
    }

    datesElement.innerHTML = datesHTML;
};

prev8tn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

next8tn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

updateCalendar();
fetchAndCreateTaskProgressChart();


function addCourseBannerListeners() {
    document.getElementById('course-dashboard').addEventListener('click', function() {
        document.getElementById('dashboard-link').click();
    });

    document.getElementById('course-task').addEventListener('click', function() {
        document.getElementById('task-link').click();
    });

    document.getElementById('course-resources').addEventListener('click', function() {
        document.getElementById('resources-link').click();
    });

    document.getElementById('course-meet').addEventListener('click', function() {
        document.getElementById('meet-link').click();
    });

    document.getElementById('course-project').addEventListener('click', function() {
        document.getElementById('project-link').click();
    });
}

addCourseBannerListeners();

//DASHBOARD PAGE
document.getElementById('dashboard-link').addEventListener('click', function() {
    document.getElementById('main-content').innerHTML = `
        <div class="banner">
            <div class="text-content">
                <h1>Dashboard</h1>
                <p>View your dashboard and get an overview of your tasks.</p>
            </div>
            <img src="images/dashboardbanner.png" alt="Banner Image" class="banner-image">
        </div>
        <div class="dashboard-buttons">
            <button id="viewResourcesChart" class="dashboard-button">
                <img src="images/chart.png" class="resource-img" alt="Resources Availability Image">
                <h2>View Resources Availability Chart</h2>
                <p>Click here to view or manage resource requests.</p>
            <button id="viewRequestedResourcesChart" class="dashboard-button">
                <img src="images/piechart.png" class="resource-img" alt="Resources Request Image">
                <h2>View Requested Resources Pie Chart</h2>
                <p>Click here to view or manage resource requests.</p></button>
        </div>
        <section class="resources-chart" style="display: none;">
            <canvas id="resourcesChart"></canvas>
        </section>
        <section class="requested-resources-chart" style="display: none;">
            <canvas id="requestedResourcesChart"></canvas>
        </section>
    `;
    
    document.getElementById('viewResourcesChart').addEventListener('click', function() {
        document.querySelector('.resources-chart').style.display = 'block';
        document.querySelector('.requested-resources-chart').style.display = 'none';
        fetchAndCreateChart();
    });

    document.getElementById('viewRequestedResourcesChart').addEventListener('click', function() {
        document.querySelector('.resources-chart').style.display = 'none';
        document.querySelector('.requested-resources-chart').style.display = 'block';
        fetchAndCreateRequestedResourcesChart();
    });
});

//TASK MANAGEMENT PAGE
document.getElementById('task-link').addEventListener('click', function() {
    document.getElementById('main-content').innerHTML = `
        <h1>Task Management</h1>
        <div class="banner">
            <div class="text-content">
                <h1>Task Allocation</h1>
                <p>Allocate tasks, set priorities, track progress, and ensure timely completion. Keep your team aligned and productive with our intuitive task management tools.</p>
                <button id="addTaskBtn">Add Task</button>
            </div>
            <img src="images/taskbanner.png" alt="Banner Image" class="banner-image">
        </div>
        <div id="task-data-container" class="scrollable-task-data">
            <div id="loading-indicator">Loading...</div>
        </div>
    `;
    
    fetchTaskData();

    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskFormContainer = document.getElementById('taskFormContainer');
    const cancelBtn = document.getElementById('cancelBtn');
    const taskForm = document.getElementById('taskForm');

    addTaskBtn.addEventListener('click', () => {
        taskFormContainer.classList.remove('hidden');
    });

    cancelBtn.addEventListener('click', () => {
        taskFormContainer.classList.add('hidden');
    });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        document.querySelector("#sub").value = "Submitting...";
        let data = new FormData(taskForm);
        fetch('https://script.google.com/macros/s/AKfycbwU7XTthSbXuZFbDJR6HRoWV9e9ae54uoOYe5EA9GWWQpT0WzJvUvdYEvhRQel_E7NY/exec', {
            method: "POST",
            body: data
        })
        .then(res => res.text())
        .then(data => {
            document.querySelector("#msg").innerHTML = data;
            document.querySelector("#sub").value = "Submit";
        });
        taskForm.reset();
        taskFormContainer.classList.add('hidden');
    });
});

//RESOURCES PAGE
document.getElementById('resources-link').addEventListener('click', function() {
    document.getElementById('main-content').innerHTML = `
        <div class="banner">
            <div class="text-content">
                <h1>Resource Management</h1>
                <p>Access and manage all your project resources in one place. Check availability, allocate resources, and ensure optimal utilization to keep your projects running smoothly.</p>
            </div>
            <img src="images/resourcebanner.png" alt="Banner Image" class="banner-image">
        </div>
        <div class="resources-boxes">
            <div id="checkAvailability" class="resource-box">
                <img src="images/check.png" alt="Resource Image" class="resources-image">
                <h2>Check Resources Availability</h2>
                <p>Click here to check the availability of resources.</p>
            </div>
            <div id="checkRequest" class="resource-box">
                <img src="images/rrequest.png" alt="Resource Image" class="resources-image">
                <h2>Check Request</h2>
                <p>Click here to view or manage resource requests.</p>
            </div>
            <div id="requestForm" class="resource-box">
                <img src="images/form.png" alt="Resource Image" class="resources-image">
                <h2>Resources Google Form</h2>
                <p>Click here to request resources.</p>
            </div>
        </div>
    `;
    
    document.getElementById('checkAvailability').addEventListener('click', async () => {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbwk9ungutaZ3jyOYDV0B12dI73zK0_DpFUe_qJhd6CEmeb4KuOvNykWoT3LVAdrLWWT/exec'); // Replace with your web app URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
    
            const container = document.getElementById('main-content');
            container.innerHTML = '<h1>Resources Availability</h1><table id="resourceTable"><thead><tr><th>Resource Name</th><th>Available Quantity</th><th>Total Quantity</th><th>Allocated Quantity</th><th>Status</th></tr></thead><tbody></tbody></table>';
    
            const tbody = container.querySelector('tbody');
    
            // Slice the data to get only the first 6 rows (excluding the header row)
            const limitedData = data.slice(1, 6);
    
            limitedData.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row[0]}</td>
                    <td>${row[1]}</td>
                    <td>${row[2]}</td>
                    <td>${row[3]}</td>
                    <td>${row[4]}</td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error('Fetch error:', error);
            alert('There was a problem fetching the resource data.');
        }
    });        
    
    // Event listener for Check Request box
    document.getElementById('checkRequest').addEventListener('click', async () => {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbzeQaqmFvV0ha5KliZtjyHh_18IaefzsZebBXiiGgYX9D5RhCsltgFJF6mg8SER_NUg/exec'); // Replace with your form responses web app URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            console.log('Fetched data:', data); // Log the data to inspect its structure
    
            const container = document.getElementById('main-content');
            container.innerHTML = '<h1>Request Form Responses</h1><table id="requestTable"><thead><tr><th>Resource Name</th><th>Quantity Requested</th><th>Purpose</th></tr></thead><tbody></tbody></table>';
    
            const tbody = container.querySelector('tbody');
    
            if (Array.isArray(data)) {
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row.resourceName}</td>
                        <td>${row.quantityRequest}</td>
                        <td>${row.purpose}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } else {
                console.error('Data is not in expected format:', data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('There was a problem fetching the request data.');
        }
    });

    document.getElementById('requestForm').addEventListener('click', async () => {
        const formUrl = 'https://forms.gle/ujGfcZLQwbFhHeSj8';
        window.open(formUrl, '_blank'); // Opens the URL in a new tab
    })
});


//MEET PAGE
document.getElementById('meet-link').addEventListener('click', function() {
    document.getElementById('main-content').innerHTML = `
        <div class="banner">
            <div class="text-content">
                <h1>Meeting Management</h1>
                <p>Seamless Meeting Scheduling - Book appointments with the project manager, get approvals, and generate Google Meet links effortlessly.</p>
            </div>
            <img src="images/meetbanner.png" alt="Banner Image" class="banner-image">
        </div>
        <div id="bookappointment" class="meet-boxes">
            <div id="appointment" class="meet-box">
                <img src="images/calendar.png" alt="Meet Image" class="meet-image">
                <h2>Appointment Booking Form</h2>
                <p>Click here to book an appointment.</p>
            </div>
            <div id="checkAppointment" class="meet-box">
                <img src="images/request.png" alt="Meet Image" class="meet-image">
                <h2>Check Appointment Request</h2>
                <p>Click here to check appointment request.</p>
            </div>
        </div>
    `;

    document.getElementById('appointment').addEventListener('click', () => {
        const formUrl = 'https://forms.gle/rj4N5i1hoDf4CZDo9';
        window.open(formUrl, '_blank'); // Opens the URL in a new tab
    });

    document.getElementById('checkAppointment').addEventListener('click', async () => {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbwvYPrIm1zGmzkP16UljxkM6gtUjuH7Rk9wk-ojTb7H9WhiY5nJ9PMBURSmFAiBbMW7/exec'); // Replace with your appointment data web app URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            console.log('Fetched data:', data); // Log the data to inspect its structure

            const container = document.getElementById('main-content');
            container.innerHTML = `
                <h1>Appointment List</h1>
                <table id="appointmentTable">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Purpose of the Meeting</th>
                            <th>Files</th>
                            <th>Additional Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `;

            const tbody = container.querySelector('tbody');

            if (Array.isArray(data)) {
                data.slice(1).forEach((row, index) => {
                    const requestId = row[1]; // Assuming requestId is at index 1
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row[2]}</td> 
                        <td>${row[3]}</td> 
                        <td>${row[4]}</td> 
                        <td>${row[5]}</td> 
                        <td>${row[6]}</td> 
                        <td>${row[7]}</td>
                        <td>
                            <button class="approve-btn" onclick="approve(this)">Approve</button>
                            <button class="approve-btn" onclick="cancel(this)">Cancel</button>
                            <span class="fixed-text approved-text">Approved</span>
                            <span class="fixed-text cancelled-text">Cancelled</span>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            } else {
                console.error('Data is not in expected format:', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });
});

function approve(button) {
    var td = button.parentElement;
    var approvedText = td.querySelector('.approved-text');
    td.querySelectorAll('button').forEach(btn => btn.style.display = 'none');
    approvedText.style.display = 'inline';
}

function cancel(button) {
    var td = button.parentElement;
    var cancelledText = td.querySelector('.cancelled-text');
    td.querySelectorAll('button').forEach(btn => btn.style.display = 'none');
    cancelledText.style.display = 'inline';
}

//PROJECT PAGE
document.getElementById('project-link').addEventListener('click', function() {
    document.getElementById('main-content').innerHTML = `
    <div class="banner">
        <div class="text-content">
            <h1>Project Reporting</h1>
            <p>Efficiently manage and track your project reports. Submit new projects, review submissions, and keep your work organized and on track.</p>
        </div>
        <img src="images/taskbanner.png" alt="Banner Image" class="banner-image">
    </div>
    <div class="project-buttons">
        <button id="projectReportingForm" class="project-button">
            <img src="images/taskimg.png" class="project-img" alt="Project Report Image">
            <h2>Project Reporting Form<h2>
            <p>Click here to submit your project report.</p>
        </button>
        <button id="taskReview" class="project-button">
         <img src="images/review.png" class="project-img" alt="Task Review Image">
            <h2>Task Review<h2>
            <p>Click here to review submitted project reports.</p>
        </button>
    </div>
`;

    // Add event listeners for the buttons
    document.getElementById('projectReportingForm').addEventListener('click', function() {
        const formUrltask = 'https://forms.gle/eJsX1Fhq8gmJuuXV7';
        window.open(formUrltask, '_blank'); // Opens the URL in a new tab
    });

    document.getElementById('taskReview').addEventListener('click', async function() {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbyOEMot6iMz-aZb8qrhY_wpLxwl-6nB_nghvZKjzlo6KNEcxUBTTZhnv_4IrkBAs3A/exec'); // Replace with your web app URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
    
            const container = document.getElementById('main-content');
            container.innerHTML = '<h1>Project Reporting</h1><table id="requestTable"><thead><tr><th>Task Id</th><th>Task Name</th><th>Submitted By</th><th>Submission Date</th><th>File Submission</th><th>Status</th></tr></thead><tbody></tbody></table>';
    
            const tbody = container.querySelector('tbody');
    
            const limitedData = data.slice(0, 6);
    
            limitedData.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.taskId}</td>
                    <td>${row.taskName}</td>
                    <td>${row.submittedBy}</td>
                    <td>${row.submissionDate}</td>
                    <td>${row.fileSubmission}</td>
                    <td>
                        <button class="approve-btn" onclick="approve(this)">Approve</button>
                        <button class="approve-btn" onclick="cancel(this)">Cancel</button>
                        <span class="fixed-text approved-text">Approved</span>
                        <span class="fixed-text cancelled-text">Cancelled</span>
                    </td>
                `;
                tbody.appendChild(tr);
            });
    
            // Add event listener for status change
            tbody.addEventListener('change', async function(event) {
                if (event.target.tagName === 'SELECT') {
                    const taskId = event.target.getAttribute('data-task-id');
                    const newStatus = event.target.value;
                    
                    try {
                        const updateResponse = await fetch('https://script.google.com/macros/s/AKfycbwne8tve4NLqzyMYnRtN_zEBVVA2LQ0TMlLOWwBrb28VW3dKxz6noqdou55qMObOJcf/exec', { // Replace with your web app URL
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                taskId: taskId,
                                status: newStatus
                            })
                        });
    
                        if (!updateResponse.ok) {
                            throw new Error('Failed to update status');
                        }
                    } catch (error) {
                        console.error('Error updating status:', error);
                    }
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    });

    function approve(button) {
        var td = button.parentElement;
        var approvedText = td.querySelector('.approved-text');
        td.querySelectorAll('button').forEach(btn => btn.style.display = 'none');
        approvedText.style.display = 'inline';
    }
    
    function cancel(button) {
        var td = button.parentElement;
        var cancelledText = td.querySelector('.cancelled-text');
        td.querySelectorAll('button').forEach(btn => btn.style.display = 'none');
        cancelledText.style.display = 'inline';
    }
    
});


//POLICY PAGE
document.getElementById('policy-link').addEventListener('click', function() {
    document.getElementById('main-content').innerHTML = `
    <div class="banner">
        <div class="text-content">
            <h1>Compliance and Policy Standards</h1>
            <p>Stay informed with our policies. Access all guidelines, terms, and conditions in one place to ensure a clear understanding of our practices and regulations.</p>
        </div>
        <img src="images/policybanner.png" alt="Banner Image" class="banner-image">
    </div>
    <div class="policy-buttons">
        <button id="viewPolicyTemplate" class="policy-button">
            <img src="images/policyimg.png" class="policy-img" alt="Policy Image">
            <h2>View Policy Template<h2>
            <p>Click here to view a detailed policy template</p>
        </button>
        <button id="accessCompanyPolicies" class="policy-button">
            <img src="images/access.png" class="policy-img" alt="Policy Image">
            <h2>Access Company Policies<h2>
            <p>View and download company policies from our Google Drive.</p>
        </button>
    </div>
    `;
    document.getElementById('viewPolicyTemplate').addEventListener('click', async () => {
        const googleDocs = 'https://docs.google.com/document/d/1k4BSUc6LTDZQQ9pNkx5vx6BDBm0lAyIywg0hrIXyLUk/edit?usp=sharing';
        window.open(googleDocs, '_blank'); // Opens the URL in a new tab
    })

    document.getElementById('accessCompanyPolicies').addEventListener('click', async () => {
        const googleDrive = 'https://drive.google.com/drive/folders/11Ofxc1R8gqtMLdwoCh1ZwqdTyJp79aR3?usp=sharing';
        window.open(googleDrive, '_blank'); // Opens the URL in a new tab
    })
});

//EMPLOYEE PAGE
document.getElementById('employee-link').addEventListener('click', function() {
    document.getElementById('main-content').innerHTML = `
    <div class="banner">
        <div class="text-content">
            <h1>Employee Directory</h1>
            <p>Access the complete list of our employees in the Employee Directory. Find contact information, department details, and roles for easy communication and collaboration within the company.</p>
        </div>
        <img src="images/employeebanner.png" alt="Banner Image" class="banner-image">
    </div>
    <div class="employee-buttons">
        <button id="addNewEmployee" class="employee-button">
            <img src="images/employeeimg.png" alt="Employee Image" class="employee-image">
            <h2>Add New Employee</h2>
            <p>Fill out the form to add a new employee to the directory.</p>
        </button>
        <button id="viewEmployeeList" class="employee-button">
            <img src="images/list.png" alt="Employee Image" class="employee-image">
            <h2>View Employee List</h2>
            <p>See the complete list of current employees and their details.</p>
        </button>
    </div>
    <div id="employeeListContainer"></div>
    `;

    document.getElementById('addNewEmployee').addEventListener('click', function() {
        const formUrl = 'https://forms.gle/BvLG3z7nSJw5aSeh6';
        window.open(formUrl, '_blank'); // Opens the URL in a new tab
    });

    
    document.getElementById('viewEmployeeList').addEventListener('click', async () => {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbwOLxi0CpQeM_6-Nk_gqIl3u14alOnkhU9x4797gPah9_h7Qiu3Od-96oJQNX3ego-m/exec'); // Replace with your web app URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            console.log('Fetched data:', data); // Log the data to inspect its structure
    
            const container = document.getElementById('main-content');
            container.innerHTML = '<h1>Employee List</h1><table id="employeeTable"><thead><tr><th>Employee ID</th><th>Employee Name</th><th>Email</th></tr></thead><tbody></tbody></table>';
    
            const tbody = container.querySelector('tbody');
    
            if (Array.isArray(data)) {
                data.slice(1).forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row[0]}</td>
                        <td>${row[1]}</td>
                        <td>${row[2]}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } else {
                console.error('Data is not in expected format:', data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('There was a problem fetching the employee data.');
        }
    });
});

async function fetchEmployeeList() {
    try {
        const response = await fetch('https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_URL/exec'); // Replace with your web app URL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const employeeListContainer = document.getElementById('employeeListContainer');
        employeeListContainer.innerHTML = '';

        data.forEach(employee => {
            const employeeCard = document.createElement('div');
            employeeCard.className = 'employee-card';
            employeeCard.innerHTML = `
                <h2>${employee.name}</h2>
                <p><strong>Department:</strong> ${employee.department}</p>
                <p><strong>Role:</strong> ${employee.role}</p>
                <p><strong>Email:</strong> ${employee.email}</p>
            `;
            employeeListContainer.appendChild(employeeCard);
        });
    } catch (error) {
        console.error('Fetch error:', error);
        alert('There was a problem fetching the employee list.');
    }
}

//SIDE BAR MENU BUTTON
document.getElementById('menu-button').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const container = document.querySelector('.container');

    sidebar.classList.toggle('hidden');
    container.classList.toggle('sidebar-hidden');
})


async function fetchTaskData() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzT1Jlu8CnbitVKtMu-owOJ8K6rFHsd7mRAu5ckt5pTOt-7ACy7OiTxrZYnBqpEZPWr/exec'); // Replace with your web app URL
    const data = await response.json();
    
    const container = document.getElementById('task-data-container');

    // Remove the loading indicator
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }

    // Define the indices for the columns
    const taskNameIndex = 1; // Second column (index starts from 0)
    const assignedToIndex = 2; // Adjust this to the correct index for "Assigned To"
    const dueDateIndex = 3; // Adjust this to the correct index for "Due Date"

    // Extract headers for field names
    const headers = data[0];
    
    // If the required indices are out of bounds, show an error message
    if (taskNameIndex >= headers.length || assignedToIndex >= headers.length || dueDateIndex >= headers.length) {
        container.innerHTML = 'Error: Could not find required columns.';
        return;
    }

    const dueDates = [];

    data.slice(1).forEach(row => {
        const taskName = row[taskNameIndex];
        const assignedTo = row[assignedToIndex];
        const dueDate = row[dueDateIndex];
        const details = headers.map((header, index) => `<strong>${header}:</strong> ${row[index]}`).join('<br>');

        if (dueDate) {
            dueDates.push(dueDate);
        }

        const taskBox = document.createElement('div');
        taskBox.className = 'task-box';
        taskBox.innerHTML = `
            <div class="task-header">
                <span class="task-name"><strong>Task Name:</strong> ${taskName}</span>
                <span class="view-details"><i class="fas fa-chevron-down"></i></span>
            </div>
            <div class="task-subheader"><strong>Assigned To:</strong> ${assignedTo}</div>
            <div class="task-details">${details}</div>`;
        
        taskBox.addEventListener('click', () => {
            const detailsDiv = taskBox.querySelector('.task-details');
            const chevronIcon = taskBox.querySelector('.view-details i');
            const isVisible = detailsDiv.style.display === 'block';
            detailsDiv.style.display = isVisible ? 'none' : 'block';
            chevronIcon.className = isVisible ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
        });

        container.appendChild(taskBox);
    });

    updateCalendar(dueDates);
}

