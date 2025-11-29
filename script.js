

if (document.getElementById("loginBtn")) {
    document.getElementById("loginBtn").addEventListener("click", () => {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (email === "admin@gmail.com" && password === "admin1234") {
            alert("Login success");
            window.location.href = "admin.html";
        } else {
            alert("Wrong email or password");
        }
    });
}



let fleetData = [];

const imageURL =
"https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png";

function renderFleet(data) {
    let container = document.getElementById("fleetContainer");
    container.innerHTML = "";

    data.forEach((item, index) => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${imageURL}">
            <h3>${item.regNo}</h3>
            <p>Category: ${item.category}</p>
            <p>Driver: ${item.driver}</p>
            <p>Status: ${item.available}</p>

            <div class="btn-group">
                <button onclick="updateDriver(${index})">Update Driver</button>
                <button onclick="changeAvailability(${index})">Change Availability</button>
                <button onclick="deleteVehicle(${index})">Delete</button>
            </div>
        `;

        container.appendChild(card);
    });
}

if (document.getElementById("addFleet")) {
    document.getElementById("addFleet").addEventListener("click", () => {

        let regNo = document.getElementById("regNo").value;
        let category = document.getElementById("category").value;
        let driver = document.getElementById("driver").value;
        let available = document.getElementById("available").value;

        if (!regNo || !category || !driver) {
            alert("All fields are required");
            return;
        }

        fleetData.push({ regNo, category, driver, available });

        renderFleet(fleetData);

        
        document.getElementById("regNo").value = "";
        document.getElementById("category").value = "";
        document.getElementById("driver").value = "";
        document.getElementById("available").value = "Available";
    });
}


function updateDriver(index) {
    let newName = prompt("Enter new driver name:");

    if (newName && newName.trim() !== "") {
        fleetData[index].driver = newName.trim();
        renderFleet(fleetData);
    } else {
        alert("Driver name cannot be empty.");
    }
}


function changeAvailability(index) {
    fleetData[index].available =
        fleetData[index].available === "Available"
            ? "Unavailable"
            : "Available";

    renderFleet(fleetData);
}

function deleteVehicle(index) {
    if (confirm("Are you sure you want to delete this vehicle?")) {
        fleetData.splice(index, 1);
        renderFleet(fleetData);
    }
}


document.getElementById("filterCategory").addEventListener("change", applyFilters);
document.getElementById("filterAvailability").addEventListener("change", applyFilters);

document.getElementById("clearFilter").addEventListener("click", () => {
    document.getElementById("filterCategory").value = "All";
    document.getElementById("filterAvailability").value = "All";
    renderFleet(fleetData);
});

function applyFilters() {
    let cat = document.getElementById("filterCategory").value;
    let avail = document.getElementById("filterAvailability").value;

    let filtered = fleetData.filter(item => {
        return (cat === "All" || item.category === cat) &&
               (avail === "All" || item.available === avail);
    });

    renderFleet(filtered);
}