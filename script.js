// Load current status on homepage
function loadStatus() {
    db.collection("projector").doc("main").onSnapshot(doc => {
        const data = doc.data();
        document.getElementById("statusBox").innerHTML = `
            <strong>Status:</strong> ${data.status}<br>
            <strong>Location:</strong> ${data.location}<br>
            <small>Updated: ${data.time}</small>
        `;
    });
}

if(location.pathname.includes("index.html")) {
    loadStatus();
}

// USER ACTIONS
function openUpdate(type) {
    window.location = "update.html?type=" + type;
}

function markReturned() {
    updateProjector("Returned", "HOD's Cabin");
}

function setOccupied(batch) {
    updateProjector("Occupied", batch);
}

function setIssue(issue) {
    updateProjector(issue, "Reported");
}

function updateProjector(status, location) {
    const time = new Date().toLocaleString();

    db.collection("projector").doc("main").set({
        status: status,
        location: location,
        time: time
    });

    db.collection("logs").add({
        status: status,
        location: location,
        time: time
    });

    alert("Status updated!");
    window.location = "index.html";
}

// ADMIN LOGS
function loadLogs() {
    db.collection("logs").orderBy("time", "desc").onSnapshot(snap => {
        let rows = "";
        snap.forEach(doc => {
            const d = doc.data();
            rows += `
                <tr>
                    <td>${d.status}</td>
                    <td>${d.location}</td>
                    <td>${d.time}</td>
                </tr>
            `;
        });
        document.getElementById("logBody").innerHTML = rows;
    });
}

// CSV DOWNLOAD
function downloadCSV() {
    db.collection("logs").get().then(snap => {
        let csv = "Status,Location,Time\n";
        snap.forEach(doc =>{
            const d = doc.data();
            csv += `${d.status},${d.location},${d.time}\n`;
        });

        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "projector_logs.csv";
        a.click();
    });
}
