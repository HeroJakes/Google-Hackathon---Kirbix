document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const loginError = document.getElementById('login-error');
    const loginWrapper = document.querySelector('.login-wrapper'); // Corrected variable name
    const contentContainer = document.getElementById('content');

    try {
        // Fetch the email data
        const response = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getEmployeeData');
        const data = await response.json();

        // Log the fetched data to inspect it (for debugging)
        console.log('Fetched data:', data);

        const managerEmail = 'howard@gmail.com';
        const loggedInEmployee = data.find(row => row[2].trim().toLowerCase() === email.toLowerCase());

        if (loggedInEmployee) {
            const employeeName = loggedInEmployee[1].trim(); // Get the employee's name

            if (email === managerEmail) {
                // Load manager view
                loginWrapper.style.display = 'none'; // Hide the entire wrapper
                contentContainer.style.display = 'block'; // Show the content
                loadManagerView();
            } else {
                // Load employee view
                window.loggedInEmployeeName = employeeName; // Save the employee name for later use
                loginWrapper.style.display = 'none'; // Hide the entire wrapper
                contentContainer.style.display = 'block'; // Show the content
                switchToEmployeeView();
            }
        } else {
            loginError.textContent = 'Invalid email. Please try again.';
            loginError.style.display = 'block';
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        loginError.textContent = 'There was a problem logging you in. Please try again later.';
        loginError.style.display = 'block';
    }
});

function showLogoLinkPage() {
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
        </section>  
        <section class="courses">
            <div class="column">
                <div class="course-banner" id="course-dashboard">
                    <div class="cbanner-image">
                        <img src="images/dashboard.png" alt="Dashboard Icon">
                    </div>
                    <div class="cbanner-content">
                        <h2>Dashboard</h2>
                        <p>View your dashboard and get an overview of your tasks.</p>
                    </div>
                    <div class="arrow-icon">
                        <i class="fa fa-chevron-right"></i>
                    </div>
                </div>
                <div class="course-banner" id="course-task">
                    <div class="cbanner-image">
                        <img src="images/task.png" alt="Task Icon">
                    </div>
                    <div class="cbanner-content">
                        <h2>My Task</h2>
                        <p>Manage your tasks efficiently.</p>
                    </div>
                    <div class="arrow-icon">
                        <i class="fa fa-chevron-right"></i>
                    </div>
                </div>
                <div class="course-banner" id="course-resources">
                    <div class="cbanner-image">
                        <img src="images/resources.png" alt="Resources Icon">
                    </div>
                    <div class="cbanner-content">
                        <h2>Resources</h2>
                        <p>Access various resources for your projects.</p>
                    </div>
                    <div class="arrow-icon">
                        <i class="fa fa-chevron-right"></i>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="course-banner" id="course-meet">
                    <div class="cbanner-image">
                        <img src="images/meet.png" alt="Meet Icon">
                    </div>
                    <div class="cbanner-content">
                        <h2>Meet</h2>
                        <p>Organize and join meetings.</p>
                    </div>
                    <div class="arrow-icon">
                        <i class="fa fa-chevron-right"></i>
                    </div>
                </div>
                <div class="course-banner" id="course-project">
                    <div class="cbanner-image">
                        <img src="images/project.png" alt="Project Icon">
                    </div>
                    <div class="cbanner-content">
                        <h2>Project</h2>
                        <p>Manage your projects and track progress.</p>
                    </div>
                    <div class="arrow-icon">
                        <i class="fa fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        </section>
    `;
    // Add event listeners for navigation to respective pages
    document.getElementById('employee-logo-link').addEventListener('click', function() {
        showLogoLinkPage()
    });

    document.getElementById('course-dashboard').addEventListener('click', function() {
        loadSprintBoard(); // Load the sprint board when Dashboard is clicked
    });

    document.getElementById('course-task').addEventListener('click', function() {
        document.getElementById('employee-tasks-link').click(); // Trigger click event to navigate to My Task
    });

    document.getElementById('course-resources').addEventListener('click', function() {
        document.getElementById('employee-resources-link').click();
    });

    document.getElementById('course-meet').addEventListener('click', function() {
        document.getElementById('employee-meet-link').click();
    });

    document.getElementById('course-project').addEventListener('click', function() {
        document.getElementById('employee-project-link').click();
    });
}

function switchToEmployeeView() {
    // Create a new header element
    const newHeader = document.createElement('header');
    newHeader.className = 'employee-navbar';

    // Set the new inner HTML for the employee view
    newHeader.innerHTML = `
        <div id="employee-logo-link" class="logo">
            <a href="#"><img src="images/logo.png" alt="Logo"></a>
        </div>
        <nav class="employee-nav">
            <ul>
                <li><a href="#" id="employee-dashboard-link">Dashboard</a></li>
                <li><a href="#" id="employee-tasks-link">My Tasks</a></li>
                <li><a href="#" id="employee-resources-link">Resource</a></li>
                <li><a href="#" id="employee-meet-link">Meetings</a></li>
                <li><a href="#" id="employee-project-link">Project</a></li>
                <li><a href="#" id="employee-policy-link">Policy</a></li>
            </ul>
        </nav>
        <div class="employee-right-side">
            <div id="employee-notification-button" class="employee-noti">
                <img class="noti-cursor" src="images/noti.png" alt="Notification">
            </div>
        </div>
    `;
    
    // Replace the old header with the new one
    const oldHeader = document.querySelector('header');
    oldHeader.parentNode.replaceChild(newHeader, oldHeader);

    const contentContainer = document.getElementById('content');
    const notificationContainer = document.createElement('div');
    notificationContainer.id = 'emp-notification-container';
    notificationContainer.classList.add('emp-notification-container', 'hidden');
    notificationContainer.innerHTML = `
        <div class="emp-tab-buttons">
            <button id="emp-task-tab" class="emp-tab-button emp-active-tab">New Task</button>
            <button id="emp-appointment-tab" class="emp-tab-button">Appointment</button>
        </div>
        <div id="emp-task-content" class="emp-tab-content">
            <div id="emp-task-container"></div>
        </div>
        <div id="emp-appointment-content" class="emp-tab-content hidden">
            <div id="emp-appointment-container"></div>
        </div>
    `;
    contentContainer.appendChild(notificationContainer);

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

    // Initialize the notification functionality
    initializeNotificationFeature();

    // Load the sprint board content
    showLogoLinkPage();
    
    function initializeNotificationFeature() {
        const empNotificationButton = document.getElementById('employee-notification-button');
        const empNotificationContainer = document.getElementById('emp-notification-container');
        const empTaskTab = document.getElementById('emp-task-tab');
        const empAppointmentTab = document.getElementById('emp-appointment-tab');
        const empTaskContent = document.getElementById('emp-task-content');
        const empAppointmentContent = document.getElementById('emp-appointment-content');
        const empTabButtons = document.querySelector('.emp-tab-buttons');
    
        // Create the tab indicator element
        const empTabIndicator = document.createElement('div');
        empTabIndicator.classList.add('emp-tab-indicator');
        empTabButtons.appendChild(empTabIndicator);
    
        // Function to switch tabs
        function empSwitchTab(tab) {
            if (tab === 'new-task') {
                empTaskTab.classList.add('emp-active-tab');
                empAppointmentTab.classList.remove('emp-active-tab');
                empTaskContent.classList.remove('hidden');
                empAppointmentContent.classList.add('hidden');
                empMoveIndicator(empTaskTab);
            } else if (tab === 'appointment') {
                empTaskTab.classList.remove('emp-active-tab');
                empAppointmentTab.classList.add('emp-active-tab');
                empTaskContent.classList.add('hidden');
                empAppointmentContent.classList.remove('hidden');
                empMoveIndicator(empAppointmentTab);
            }
        }
    
        // Function to move the tab indicator
        function empMoveIndicator(tab) {
            const tabRect = tab.getBoundingClientRect();
            const tabButtonsRect = empTabButtons.getBoundingClientRect();
            const offset = tabRect.left - tabButtonsRect.left;
            empTabIndicator.style.transform = `translateX(${offset}px)`;
            empTabIndicator.style.width = `${tabRect.width}px`;
        }
    
        // Event listeners for tab clicks
        empTaskTab.addEventListener('click', function () {
            empSwitchTab('new-task');
        });
    
        empAppointmentTab.addEventListener('click', function () {
            empSwitchTab('appointment');
        });
    
        empNotificationButton.addEventListener('click', function () {
            if (empNotificationContainer.classList.contains('hidden')) {
                empFetchAndDisplayTasks();
                empFetchAndDisplayAppointments();
                empNotificationContainer.classList.remove('hidden');
                empNotificationContainer.style.display = 'block';
                // Set the initial position of the tab indicator
                empMoveIndicator(document.querySelector('.emp-tab-button.emp-active-tab'));
            } else {
                empNotificationContainer.classList.add('hidden');
                empNotificationContainer.style.display = 'none';
            }
        });
    
        // Fetch and display employee tasks
        async function empFetchAndDisplayTasks() {
            const empTaskContainer = document.getElementById('emp-task-container');
            empTaskContainer.innerHTML = '<p>Loading tasks...</p>';
            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getTaskData'); 
                const taskData = await response.json();
                const employeeName = window.loggedInEmployeeName; // Set this variable appropriately
                const employeeTasks = taskData.filter(task => task[2].trim() === employeeName);
                empTaskContainer.innerHTML = ''; // Clear the loading text
    
                if (employeeTasks.length > 0) {
                    employeeTasks.sort((a, b) => new Date(b[4]) - new Date(a[4]));
    
                    employeeTasks.forEach(task => {
                        const taskBox = document.createElement('div');
                        taskBox.className = 'emp-task-box';
    
                        const dueDate = new Date(task[4]);
                        const currentDate = new Date();
                        const dayDiff = Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24));
                        let headerColor = '#00aaff';
    
                        if (dayDiff < 0) {
                            headerColor = '#ff4d4d';
                        } else if (dayDiff <= 3) {
                            headerColor = '#ffa500';
                        }
    
                        taskBox.innerHTML = `
                            <div class="emp-task-header" style="background-color: ${headerColor};">
                                <span class="emp-task-name"><strong>${task[1]}</strong></span>
                            </div>
                            <div class="emp-task-details" style="border-left: 6px solid ${headerColor};">
                                <p><strong>Due Date:</strong> ${dueDate.toLocaleDateString()}</p>
                                <p><strong>Assigned To:</strong> ${task[2]}</p>
                                <p><strong>Priority:</strong> ${task[5]}</p>
                                <p><strong>Progress:</strong> ${(task[7] * 100).toFixed(2)}%</p>
                                <p><strong>Details:</strong> ${task[8]}</p>
                            </div>
                        `;
    
                        empTaskContainer.appendChild(taskBox);
                    });
                } else {
                    empTaskContainer.innerHTML = '<p>No tasks assigned to you at the moment.</p>';
                }
    
            } catch (error) {
                console.error('Error fetching tasks:', error);
                empTaskContainer.innerHTML = '<p>There was an error loading your tasks. Please try again later.</p>';
            }
        }
    
        // Fetch and display appointments
        async function empFetchAndDisplayAppointments() {
            const empAppointmentContainer = document.getElementById('emp-appointment-container');
            empAppointmentContainer.innerHTML = '<p>Loading appointments...</p>';
            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getMeetRequests'); 
                const appointmentData = await response.json();
                const employeeName = window.loggedInEmployeeName; // Set this variable appropriately
                const employeeAppointments = appointmentData.filter(app => app[2].trim() === employeeName);
                empAppointmentContainer.innerHTML = ''; // Clear the loading text
    
                if (employeeAppointments.length > 0) {
                    employeeAppointments.forEach(app => {
                        const appointmentBox = document.createElement('div');
                        appointmentBox.className = 'emp-appointment-box';
                        appointmentBox.innerHTML = `
                            <div class="emp-appointment-header" style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">
                            <span><strong>Your appointment request is booked:</strong></span>
                            </div>
                            <div class="emp-appointment-details">
                                <p><strong>Date:</strong> ${app[3]}</p>
                                <p><strong>Time:</strong> ${app[4]}</p>
                                <p><strong>Purpose:</strong> ${app[5]}</p>
                            </div>
                        `;
    
                        empAppointmentContainer.appendChild(appointmentBox);
                    });
                } else {
                    empAppointmentContainer.innerHTML = '<p>No appointments booked for you at the moment.</p>';
                }
    
            } catch (error) {
                console.error('Error fetching appointments:', error);
                empAppointmentContainer.innerHTML = '<p>There was an error loading your appointments. Please try again later.</p>';
            }
        }
    }
    

    // Add event listener for the logo link to reload the sprint board
    document.getElementById('employee-dashboard-link').addEventListener('click', function() {
        loadSprintBoard();
    });

    document.getElementById('employee-tasks-link').addEventListener('click', async function() {
        document.getElementById('main-content').innerHTML = `
            <div class="banner">
                <div class="text-content">
                    <h1>My Tasks</h1>
                    <p>Here you can view and manage all the tasks assigned to you. Stay on top of your workload and ensure timely completion of your tasks.</p>
                    <button id="updateTaskBtn">Update Task</button>
                </div>
                <img src="images/taskbanner.png" alt="Banner Image" class="banner-image">
            </div>
            <div id="updateTaskModal" class="modal hidden">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Update Task Progress</h2>

                <!-- Task Selection Dropdown -->
                <div id="task-selection">
                    <label for="task-dropdown">Select Task:</label>
                    <select id="task-dropdown">
                        <option value="" disabled selected>Select a task</option>
                        <!-- Tasks will be dynamically added here -->
                    </select>
                </div>

                <!-- Progress Update Controls (Initially Hidden) -->
                <div id="progress-update-controls" class="hidden">
                    <!-- Input Field -->
                    <div class="input-field">
                        <label for="slider">Progress: <span id="slider-value">0%</span></label>
                        <label for="percentage-input"></label>
                        <input type="number" id="percentage-input" min="0" max="100" placeholder="Enter percentage">
                    </div>
                    
                    <!-- Slider Input -->
                    <div class="slider-input">
                        <input type="range" id="slider" min="0" max="100" value="0">
                    </div>

                    <!-- Radio Buttons with Percentage Options -->
                    <div class="radio-buttons">
                        <div>
                            <label><input type="radio" name="progress-radio" value="0" id="radio0"> 0%</label>
                            <label><input type="radio" name="progress-radio" value="25" id="radio25"> 25%</label>
                            <label><input type="radio" name="progress-radio" value="50" id="radio50"> 50%</label>
                            <label><input type="radio" name="progress-radio" value="75" id="radio75"> 75%</label>
                            <label><input type="radio" name="progress-radio" value="100" id="radio100"> 100%</label>
                        </div>
                    </div>

                    <!-- Incremental Update Buttons -->
                    <div class="incremental-buttons">
                        <button id="decrement-btn">-</button>
                        <span id="current-progress">0%</span>
                        <button id="increment-btn">+</button>
                    </div>

                    <button id="submit-progress-btn">Submit Progress</button>
                </div>
            </div>
        </div>
            <!-- Explanation Box -->
            <div class="color-legend">
                <ul>
                    <li><span class="legend-color" style="background-color: #ff4d4d;"></span> <strong>Overdue:</strong> Task is past the due date.</li>
                    <li><span class="legend-color" style="background-color: #ffa500;"></span> <strong>Due Soon:</strong> Task is due within the next 3 days.</li>
                    <li><span class="legend-color" style="background-color: #00aaff;"></span> <strong>On Track:</strong> Task is on schedule.</li>
                </ul>
            </div>
    
            <div id="my-task-container" class="my-task-container">
                <div id="loading-indicator">Loading...</div>
            </div>
        `;

        // After the content is added, now add the event listeners
        initializeTaskUpdateModal();

        fetchAndDisplayEmployeeTasks(); // Function to fetch and display tasks assigned to the logged-in employee
        });

        function initializeTaskUpdateModal() {
        const modal = document.getElementById('updateTaskModal');
        const updateTaskBtn = document.getElementById('updateTaskBtn');
        const closeBtn = document.querySelector('.close');
        const taskDropdown = document.getElementById('task-dropdown');
        const progressUpdateControls = document.getElementById('progress-update-controls');

        // Show the modal when the Update Task button is clicked
        updateTaskBtn.addEventListener('click', async () => {
            modal.style.display = 'block';
            modal.classList.remove('hidden');

            // Fetch and display tasks in the dropdown
            await populateTaskDropdown();
        });

        // Close the modal when the close button is clicked
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            modal.classList.add('hidden');
        });

        // Close the modal if the user clicks outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
                modal.classList.add('hidden');
            }
        });

        // Task dropdown selection event
        taskDropdown.addEventListener('change', () => {
            if (taskDropdown.value) {
                progressUpdateControls.classList.remove('hidden');
                // Set the slider and input field to the current task's progress here
            }
        });

        // Function to fetch and populate the task dropdown
        async function populateTaskDropdown() {
            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getTaskData');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const taskData = await response.json();
        
                const employeeName = window.loggedInEmployeeName;
                const employeeTasks = taskData.filter(task => task[2].trim() === employeeName);
        
                const taskDropdown = document.getElementById('task-dropdown');
                taskDropdown.innerHTML = '<option value="" disabled selected>Select a task</option>';
        
                employeeTasks.forEach(task => {
                    const option = document.createElement('option');
                    option.value = task[0];
                    option.textContent = `${task[1]} (Due: ${new Date(task[4]).toLocaleDateString()})`;
                    taskDropdown.appendChild(option);
                });
            } catch (error) {
                console.error('Error fetching tasks:', error);
                taskDropdown.innerHTML = '<option value="" disabled>Error loading tasks</option>';
            }
        }
        // Now, the slider, input, radio buttons, and increment/decrement buttons logic remains the same
        const slider = document.getElementById('slider');
        const sliderValue = document.getElementById('slider-value');
        const percentageInput = document.getElementById('percentage-input');
        const currentProgress = document.getElementById('current-progress');
        
        function updateAllValues(value) {
            slider.value = value;
            percentageInput.value = value;
            currentProgress.textContent = `${value}%`;
            sliderValue.textContent = `${value}%`;
        }
        
        slider.addEventListener('input', () => {
            updateAllValues(slider.value);
        });
        
        percentageInput.addEventListener('input', () => {
            const value = parseInt(percentageInput.value);
            if (value >= 0 && value <= 100) {
                updateAllValues(value);
            } else {
                percentageInput.setCustomValidity('Please enter a value between 0 and 100');
            }
        });
        
        const radioButtons = document.querySelectorAll('input[name="progress-radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                updateAllValues(radio.value);
            });
        });
        
        const incrementBtn = document.getElementById('increment-btn');
        const decrementBtn = document.getElementById('decrement-btn');
        
        incrementBtn.addEventListener('click', () => {
            let current = parseInt(currentProgress.textContent);
            if (current < 100) {
                updateAllValues(current + 1);
            }
        });
        
        decrementBtn.addEventListener('click', () => {
            let current = parseInt(currentProgress.textContent);
            if (current > 0) {
                updateAllValues(current - 1);
            }
        });
        
        document.getElementById('submit-progress-btn').addEventListener('click', () => {
            const progress = percentageInput.value || slider.value;
            const taskId = document.getElementById('task-dropdown').value;
            updateTaskProgress(taskId, progress);
        
            alert(`Task progress updated to ${progress}%`);
        
            // Close the modal after submission
            document.getElementById('modal').style.display = 'none';
            document.getElementById('modal').classList.add('hidden');
        });
        
        function updateTaskProgress(taskId, progress) {
            const url = 'https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=updateProgress';
            
            const progressWithSymbol = `${progress}%`;
        
            fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `taskId=${taskId}&progress=${progressWithSymbol}`,
            })
            .then(response => {
                console.log('Request sent.');
            })
            .catch(error => console.error('Error:', error));
        }
    }

    async function fetchAndDisplayEmployeeTasks() {
        const taskContainer = document.getElementById('my-task-container');
    
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getTaskData');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const taskData = await response.json();
    
            const employeeName = window.loggedInEmployeeName;
            const employeeTasks = taskData.filter(task => task[2].trim() === employeeName);
    
            const loadingIndicator = document.getElementById('loading-indicator');
            if (loadingIndicator) {
                loadingIndicator.remove();
            }
    
            if (employeeTasks.length > 0) {
                employeeTasks.sort((a, b) => new Date(b[4]) - new Date(a[4]));
    
                employeeTasks.forEach(task => {
                    const taskBox = document.createElement('div');
                    taskBox.className = 'my-task-box';
    
                    const dueDate = new Date(task[4]);
                    const currentDate = new Date();
                    const timeDiff = dueDate - currentDate;
                    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
                    let headerColor = '#00aaff';
    
                    if (dayDiff < 0) {
                        headerColor = '#ff4d4d';
                    } else if (dayDiff <= 3) {
                        headerColor = '#ffa500';
                    }
    
                    taskBox.innerHTML = `
                        <div class="my-task-header" style="background-color: ${headerColor};">
                            <span class="task-name"><strong>${task[1]}</strong></span>
                        </div>
                        <div class="my-task-details" style="border-left: 6px solid ${headerColor};">
                            <p><strong>Due Date:</strong> ${dueDate.toLocaleDateString()}</p>
                            <p><strong>Assigned To:</strong> ${task[2]}</p>
                            <p><strong>Priority:</strong> ${task[5]}</p>
                            <p><strong>Progress:</strong> ${(task[7] * 100).toFixed(2)}%</p>
                            <p><strong>Details:</strong> ${task[8]}</p>
                        </div>
                    `;
    
                    taskContainer.appendChild(taskBox);
                });
            } else {
                taskContainer.innerHTML = '<p>No tasks assigned to you at the moment.</p>';
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
            taskContainer.innerHTML = '<p>There was an error loading your tasks. Please try again later.</p>';
        }
    }

      
    document.getElementById('employee-project-link').addEventListener('click', function() {
        document.getElementById('main-content').innerHTML = `
        <div class="banner">
            <div class="text-content">
                <h1>Project Reporting</h1>
                <p>Efficiently manage and track your project reports. Submit new projects, review submissions, and keep your work organized and on track.</p>
            </div>
            <img src="images/taskbanner.png" alt="Banner Image" class="banner-image">
        </div>
        <div class="project-buttons">
            <button id="projectReportingForm" class="employee-project-button">
                <img src="images/taskimg.png" class="employee-project-img" alt="Project Report Image">
                <h2>Project Reporting Form<h2>
                <p>Click here to submit your project report.</p>
            </button>
        </div>
    `;

        // Add event listeners for the buttons
        document.getElementById('projectReportingForm').addEventListener('click', function() {
            const formUrltask = 'https://forms.gle/eJsX1Fhq8gmJuuXV7';
            window.open(formUrltask, '_blank'); // Opens the URL in a new tab
        });
    });

    // Add event listener for the policy page
    document.getElementById('employee-policy-link').addEventListener('click', function() {
        document.getElementById('main-content').innerHTML = `
            <div class="banner">
                <div class="text-content">
                    <h1>Compliance and Policy Standards</h1>
                    <p>Stay informed with our policies. Access all guidelines, terms, and conditions in one place to ensure a clear understanding of our practices and regulations.</p>
                </div>
                <img src="images/policybanner.png" alt="Banner Image" class="banner-image">
            </div>
            <div class="employee-policy-buttons">
                <button id="accessCompanyPolicies" class="employee-policy-button">
                    <img src="images/access.png" class="employee-policy-img" alt="Policy Image">
                    <h2>Access Company Policies<h2>
                    <p>View and download company policies from our Google Drive.</p>
                </button>
            </div>
        `;

        document.getElementById('accessCompanyPolicies').addEventListener('click', function() {
            const googleDrive = 'https://drive.google.com/drive/folders/11Ofxc1R8gqtMLdwoCh1ZwqdTyJp79aR3?usp=sharing';
            window.open(googleDrive, '_blank'); // Opens the URL in a new tab
        });
    });
        document.getElementById('employee-meet-link').addEventListener('click', function() {
            document.getElementById('main-content').innerHTML = `
                <div class="banner">
                    <div class="text-content">
                        <h1>Meeting Management</h1>
                        <p>Seamless Meeting Scheduling - Book appointments with the project manager, get approvals, and generate Google Meet links effortlessly.</p>
                    </div>
                    <img src="images/meetbanner.png" alt="Banner Image" class="banner-image">
                </div>
                <div class="meet-boxes">
                    <button id="appointment" class="meet-box">
                        <img src="images/calendar.png" alt="Meet Image" class="meet-image">
                        <h2>Appointment Booking Form</h2>
                        <p>Click here to book an appointment.</p>
                    </button>
                </div>
            `;

        document.getElementById('appointment').addEventListener('click', () => {
            const formUrl = 'https://forms.gle/rj4N5i1hoDf4CZDo9';
            window.open(formUrl, '_blank'); // Opens the URL in a new tab
        });
    });

    document.getElementById('employee-resources-link').addEventListener('click', function() {
        document.getElementById('main-content').innerHTML = `
            <div class="banner">
                <div class="text-content">
                    <h1>Resource Management</h1>
                    <p>Access and manage all your project resources in one place. Check availability, allocate resources, and ensure optimal utilization to keep your projects running smoothly.</p>
                </div>
                <img src="images/resourcebanner.png" alt="Banner Image" class="banner-image">
            </div>
            <div class="employee-resources-boxes">
                <div id="checkAvailability" class="employee-resource-box">
                    <img src="images/check.png" alt="Resource Image" class="resources-image">
                    <h2>Check Resources Availability</h2>
                    <p>Click here to check the availability of resources.</p>
                </div>
                <div id="requestForm" class="employee-resource-box">
                    <img src="images/form.png" alt="Resource Image" class="resources-image">
                    <h2>Resources Google Form</h2>
                    <p>Click here to request resources.</p>
                </div>
            </div>
        `;
        
        document.getElementById('checkAvailability').addEventListener('click', async () => {
            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getResourceAvailability'); // Replace with your web app URL
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
                console.error();
                alert('');
            }
        });        

        document.getElementById('requestForm').addEventListener('click', async () => {
            const formUrl = 'https://forms.gle/ujGfcZLQwbFhHeSj8';
            window.open(formUrl, '_blank'); // Opens the URL in a new tab
        })
    });

}

function loadSprintBoard() {
    document.getElementById('main-content').innerHTML = `
            <div class="banner">
                <div class="text-content">
                    <h1>Sprint Board</h1>
                    <p>Track and oversee the progress of tasks here.</p>
                </div>
                <img src="images/sprint.png" alt="Banner Image" class="banner-image">
            </div>
        <div class="sprint-board">
            <div class="sprint-column" id="to-do-column">
                <h2 class="to-do-header">To Do</h2> <!-- Apply CSS class -->
                <div class="employee-task-list" id="to-do-list"></div>
            </div>
            <div class="sprint-column" id="in-progress-column">
                <h2 class="in-progress-header">In Progress</h2> <!-- Apply CSS class -->
                <div class="employee-task-list" id="in-progress-list"></div>
            </div>
            <div class="sprint-column" id="done-column">
                <h2 class="done-header">Done</h2> <!-- Apply CSS class -->
                <div class="employee-task-list" id="done-list"></div>
            </div>
        </div>
    `;

    // Fetch and display the tasks assigned to the employee
    fetchEmployeeTasks();
}

async function fetchEmployeeTasks() {
    const loadingIndicator = document.getElementById('employee-loading-indicator');
    const toDoList = document.getElementById('to-do-list');
    const inProgressList = document.getElementById('in-progress-list');
    const doneList = document.getElementById('done-list');

    // Show the loading indicator
    loadingIndicator.style.display = 'block';

    try {
        // Fetch the first dataset from the first App Script URL
        const response1 = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getTaskData');
        const data1 = await response1.json();

        // Fetch the second dataset from the second App Script URL
        const response2 = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getProjectReporting');
        const data2 = await response2.json();

        // Iterate over the first dataset and place tasks in the "To Do" or "In Progress" column
        data1.slice(1).forEach(task => {
            const taskStatus = task[6]; // Assuming "Status" is at index 6
            const taskProgress = task[7]; // Assuming "Progress" is at index 7 (a number between 0 and 1)

            const taskBox = document.createElement('div');
            taskBox.className = 'employee-task-box';
            taskBox.innerHTML = `
                <div class="employee-task-header">
                    <span class="employee-task-name"><strong>${task[1]}</strong></span> <!-- Task Name -->
                </div>
                <div class="employee-task-subheader"><strong>Due Date:</strong> ${new Date(task[4]).toLocaleDateString()}</div> <!-- Due Date -->
                <div class="separator"></div> <!-- Thin line separator -->
                <div class="employee-task-details">
                    <strong>Assigned To:</strong> ${task[2]}<br> <!-- Assigned To -->
                    <strong>Priority:</strong> ${task[5]}<br> <!-- Priority -->
                    <strong>Progress:</strong> ${(taskProgress * 100).toFixed(2)}%<br> <!-- Progress -->
                    <strong>Details:</strong> ${task[8]} <!-- Task Details -->
                </div>`;

            if (taskStatus === 'In Progress') {
                if (taskProgress === 0) {
                    toDoList.appendChild(taskBox); // Place task in "To Do" if progress is 0%
                } else {
                    inProgressList.appendChild(taskBox); // Otherwise, place it in "In Progress"
                }
            }
        });

        // Iterate over the second dataset and place tasks in the "Done" column
        data2.forEach(task => {
            if (task.status === 'In Review') {
                const taskBox = document.createElement('div');
                taskBox.className = 'employee-task-box';
                taskBox.innerHTML = `
                    <div class="employee-task-header">
                        <span class="employee-task-name"><strong>${task.taskName}</strong></span> <!-- Task Name -->
                    </div>
                    <div class="employee-task-subheader"><strong>Submission Date:</strong> ${new Date(task.submissionDate).toLocaleDateString()}</div> <!-- Submission Date -->
                    <div class="separator"></div> <!-- Thin line separator -->
                    <div class="employee-task-details">
                        <strong>Submitted By:</strong> ${task.submittedBy}<br> <!-- Submitted By -->
                        <strong>Status:</strong> ${task.status}<br> <!-- Status -->
                        <strong>File:</strong> <a href="${task.fileSubmission}" target="_blank">View Submission</a> <!-- File Submission Link -->
                    </div>`;
                
                doneList.appendChild(taskBox);
            }
        });

    } catch (error) {
        console.error('Error fetching tasks:', error);
    } finally {
        // Hide the loading indicator
        loadingIndicator.style.display = 'none';
    }
}

let taskProgressChart;

async function fetchAndCreateTaskProgressChart() {
    // Create and append loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'loading-indicator';
    loadingIndicator.style.position = 'fixed';
    loadingIndicator.style.top = '70%';
    loadingIndicator.style.left = '90%';
    loadingIndicator.style.transform = 'translate(-50%, -50%)';
    loadingIndicator.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    loadingIndicator.style.border = '1px solid #ddd';
    loadingIndicator.style.padding = '20px';
    loadingIndicator.style.borderRadius = '10px';
    loadingIndicator.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    loadingIndicator.style.zIndex = '9999';
    loadingIndicator.innerHTML = '<p>Loading...</p>';
    document.body.appendChild(loadingIndicator);

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getTaskData');
        if (response.ok) {
            const data = await response.json();

            const taskNames = data.slice(1).map(row => row[1]);
            const taskProgress = data.slice(1).map(row => row[7]);

            const ctx = document.getElementById('taskProgressChart').getContext('2d');

            // Generate an array of shades of blue for the bars
            const colors = [
                '#3366CC', '#3399FF', '#7EC9FF', '#ac97ff','#decaff',
                '#f5eef8', '#6699FF', '#6633CC', '#6633FF', '#6666FF'
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
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    } finally {
        // Remove loading indicator
        if (loadingIndicator) {
            document.body.removeChild(loadingIndicator);
        }
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
        const response = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getResourceAvailability'); // Replace with your web app URL
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
        const response = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getResourceRequests'); // Replace with your web app URL
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
        fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getResourceRequests') // Replace with your Web App URL
            .then(response => response.json())
            .then(data => {
                displayResourcesData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function fetchAppointmentsData() {
        fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getMeetRequests')
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

function approve(button) {
    const td = button.parentElement;
    const approvedText = td.querySelector('.approved-text');
    td.querySelectorAll('button').forEach(btn => btn.style.display = 'none');
    approvedText.style.display = 'inline';
}

function cancel(button) {
    const td = button.parentElement;
    const cancelledText = td.querySelector('.cancelled-text');
    td.querySelectorAll('button').forEach(btn => btn.style.display = 'none');
    cancelledText.style.display = 'inline';
}

function loadManagerView() {
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

    document.getElementById('course-employee').addEventListener('click', function() {
        document.getElementById('employee-link').click();
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
                <div class="column">
                        <div class="course-banner" id="course-dashboard">
                            <div class="cbanner-image">
                                <img src="images/dashboard.png" alt="Dashboard Icon">
                            </div>
                            <div class="cbanner-content">
                                <h2>Dashboard</h2>
                                <p>View your dashboard and get an overview of your tasks.</p>
                            </div>
                            <div class="arrow-icon">
                                <i class="fa fa-chevron-right"></i>
                            </div>
                        </div>
                        <div class="course-banner" id="course-task">
                            <div class="cbanner-image">
                                <img src="images/task.png" alt="Task Icon">
                            </div>
                            <div class="cbanner-content">
                                <h2>Task Management</h2>
                                <p>Manage and allocate your tasks efficiently.</p>
                            </div>
                            <div class="arrow-icon">
                                <i class="fa fa-chevron-right"></i>
                            </div>
                        </div>
                        <div class="course-banner" id="course-resources">
                            <div class="cbanner-image">
                                <img src="images/resources.png" alt="Resources Icon">
                            </div>
                            <div class="cbanner-content">
                                <h2>Resources</h2>
                                <p>Access various resources for your projects.</p>
                            </div>
                            <div class="arrow-icon">
                                <i class="fa fa-chevron-right"></i>
                            </div>
                        </div>
                    </div>
                
                    <div class="column">
                        <div class="course-banner" id="course-meet">
                            <div class="cbanner-image">
                                <img src="images/meet.png" alt="Meet Icon">
                            </div>
                            <div class="cbanner-content">
                                <h2>Meet</h2>
                                <p>Organize and join meetings.</p>
                            </div>
                            <div class="arrow-icon">
                                <i class="fa fa-chevron-right"></i>
                            </div>
                        </div>
                        <div class="course-banner" id="course-project">
                            <div class="cbanner-image">
                                <img src="images/project.png" alt="Project Icon">
                            </div>
                            <div class="cbanner-content">
                                <h2>Project</h2>
                                <p>Manage your projects and track progress.</p>
                            </div>
                            <div class="arrow-icon">
                                <i class="fa fa-chevron-right"></i>
                            </div>
                        </div>
                        <div class="course-banner" id="course-employee">
                            <div class="cbanner-image">
                                <img src="images/employee.png" alt="Directory Icon">
                            </div>
                            <div class="cbanner-content">
                                <h2>Employee Directory</h2>
                                <p>Access the complete list of our employees here.</p>
                            </div>
                            <div class="arrow-icon">
                                <i class="fa fa-chevron-right"></i>
                            </div>
                        </div>
                    </div>
                </section> `;
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

        document.getElementById('course-employee').addEventListener('click', function() {
            document.getElementById('employee-link').click();
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
            <div class="dashboard-charts">
                <div class="chart-card">
                    <h2>Resources Availability Chart</h2>
                    <hr class="chart-divider">
                    <div class="chart-container">
                        <div class="loading-indicator" id="resourcesLoading">Loading...</div>
                        <canvas id="resourcesChart" style="display: none;"></canvas>
                    </div>
                </div>
                <div class="chart-card">
                    <h2>Requested Resources Pie Chart</h2>
                    <hr class="chart-divider">
                    <div class="chart-container">
                        <div class="loading-indicator" id="requestedResourcesLoading">Loading...</div>
                        <canvas id="requestedResourcesChart" style="display: none;"></canvas>
                    </div>
                </div>
            </div>
        `;
        
        // Simulate loading for Resources Availability Chart
        setTimeout(() => {
            document.getElementById('resourcesLoading').style.display = 'none';
            document.getElementById('resourcesChart').style.display = 'block';
            fetchAndCreateChart();
        }, 1000); // Adjust the timeout as needed

        // Simulate loading for Requested Resources Pie Chart
        setTimeout(() => {
            document.getElementById('requestedResourcesLoading').style.display = 'none';
            document.getElementById('requestedResourcesChart').style.display = 'block';
            fetchAndCreateRequestedResourcesChart();
        }, 1000); // Adjust the timeout as needed
    });

    // Function to populate the dropdown list with names
    async function populateAssignToDropdown() {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getEmployeeData'); // AppScript link
            const data = await response.json();

            // Extract names from the data (assuming the format is consistent)
            const employeeNames = data.slice(1).map(row => row[1]); // Adjust indices based on the data format

            const prioritySelect = document.getElementById('assignedTo');

            // Clear existing options
            prioritySelect.innerHTML = '<option value="" disabled selected>Select an employee</option>';

            // Populate the dropdown with employee names
            employeeNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                prioritySelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    }

    // Task Management Page setup
    document.getElementById('task-link').addEventListener('click', function() {
        document.getElementById('main-content').innerHTML = `
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
            <div id="taskFormContainer" class="task-form-container hidden">
                <div class="task-form">
                    <h2>Add Task</h2>
                    <form id="taskForm">
                        <label for="taskName">Task Name</label>
                        <input type="text" id="taskName" name="taskName" required>
                        
                        <label for="taskDetails">Task Details</label>
                        <textarea id="taskDetails" name="taskDetails" required></textarea>
                        
                        <label for="assignedTo">Assign To</label>
                        <select id="assignedTo" name="assignedTo" required>
                            <!-- Options will be populated dynamically -->
                        </select>
                        
                        <label for="dueDate">Due Date</label>
                        <input type="date" id="dueDate" name="dueDate" required>
                        
                        <label for="priority">Priority</label>
                        <select id="priority" name="priority" required>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        
                        <button type="submit" id="sub">Add Task</button>
                        <button type="button" id="cancelBtn" class="cancel-btn">Cancel</button>
                    </form>
                </div>
            </div>
        `;
    
        fetchTaskData();
    
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskFormContainer = document.getElementById('taskFormContainer');
        const cancelBtn = document.getElementById('cancelBtn');
        const taskForm = document.getElementById('taskForm');
    
        addTaskBtn.addEventListener('click', () => {
            taskFormContainer.classList.remove('hidden');
            populateAssignToDropdown(); // Populate dropdown when form is shown
        });
    
        cancelBtn.addEventListener('click', () => {
            taskFormContainer.classList.add('hidden');
        });
    
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            document.querySelector("#sub").value = "Submitting...";
            let data = new FormData(taskForm);
            fetch('https://script.google.com/macros/s/AKfycbwlV0HpkQajP5FG8YpH2L-in2xA5q0hIoWXPrY64UKMloNv-bycSNcgvMdAXlh9YdfK/exec', {
                method: "POST",
                body: data
            })
            .then(res => res.text())
            .then(data => {
                document.querySelector("#msg").innerHTML = data;
                document.querySelector("#sub").value = "Submit";
            })
            .catch(error => {
                console.error('Error:', error);
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
                const response = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getResourceAvailability'); // Replace with your web app URL
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
                console.error();
                alert('');
            }
        });        
        
        // Event listener for Check Request box
        document.getElementById('checkRequest').addEventListener('click', async () => {
            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getResourceRequests'); // Replace with your form responses web app URL
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
            <div class="meet-boxes">
                <button id="appointment" class="meet-box">
                    <img src="images/calendar.png" alt="Meet Image" class="meet-image">
                    <h2>Appointment Booking Form</h2>
                    <p>Click here to book an appointment.</p>
                </button>
                <button id="checkAppointment" class="meet-box">
                    <img src="images/request.png" alt="Meet Image" class="meet-image">
                    <h2>Check Appointment Request</h2>
                    <p>Click here to check appointment request.</p>
                </button>
            </div>
        `;

        document.getElementById('appointment').addEventListener('click', () => {
            const formUrl = 'https://forms.gle/rj4N5i1hoDf4CZDo9';
            window.open(formUrl, '_blank'); // Opens the URL in a new tab
        });

        document.getElementById('checkAppointment').addEventListener('click', async () => {
            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getMeetRequests'); // Replace with your appointment data web app URL
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
                const response = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getProjectReporting'); // Replace with your web app URL
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
                        <td>${new Date(row.submissionDate).toLocaleDateString()}</td>
                        <td><a href="${row.fileSubmission}" target="_blank">View Submission</a></td> <!-- Make file submission a clickable link -->
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
                <p>Click here to view a detailed policy template.</p>
            </button>
            <button id="accessCompanyPolicies" class="policy-button">
                <img src="images/access.png" class="policy-img" alt="Policy Image">
                <h2>Access Company Policies<h2>
                <p>View and download company policies from our Google Drive.</p>
            </button>
            <button id="createPolicyTemplate" class="policy-button">
                <img src="images/create.png" class="policy-img" alt="Policy Image">
                <h2>Create Policy Template<h2>
                <p>Click here to create your own policy.</p>
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

        document.getElementById('createPolicyTemplate').addEventListener('click', async () => {
            const googleDocs = 'https://docs.google.com/document/d/1fZEMRJU5bimu8Gapy154-laR9TgATTAd_lUwZKsCJ54/edit?usp=sharing';
            window.open(googleDocs, '_blank'); 
        });
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
                const response = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getEmployeeData'); // Replace with your web app URL
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
    

    async function fetchTaskData() {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyEg8gMMUz-jbK1FLvyxOGyAwkjG2QBgfqh_gZakMmCG6LI8sLecM1FTUAEjAZsjVwR/exec?path=getTaskData'); // Replace with your web app URL
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
}


