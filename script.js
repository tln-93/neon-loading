// NeonRoleplay Loading Screen Script

const progressBar = document.getElementById('progress-bar');
const percentageText = document.getElementById('loading-percentage');
const statusText = document.getElementById('loading-status');
const playerName = document.getElementById('player-name');
const playerSteamID = document.getElementById('player-steamid');
const mapName = document.getElementById('map-name');

let totalFiles = 0;
let neededFiles = 0;

// GMod API Functions
window.GameDetails = function(serverName, serverURL, mapname, maxplayers, steamid, gamemode) {
    if (mapName) mapName.innerHTML = mapname || "Chargement...";
    if (playerSteamID) playerSteamID.innerHTML = steamid || "SteamID";
    
    // GMod often doesn't give us the name here directly, but we can try to get it via Steam if needed
    // For now, we wait for GameDetails or use a placeholder.
};

window.SetFilesNeeded = function(needed) {
    neededFiles = needed;
    totalFiles = needed;
};

window.SetFilesRemaining = function(remaining) {
    if (totalFiles > 0) {
        const progress = Math.floor(((totalFiles - remaining) / totalFiles) * 100);
        updateProgress(progress);
    }
};

window.SetStatusChanged = function(status) {
    if (statusText) statusText.innerHTML = status;
};

function updateProgress(percent) {
    if (progressBar) progressBar.style.width = percent + '%';
    if (percentageText) percentageText.innerHTML = percent + '%';
}

// Fallback for browser testing
if (!window.gmod) {
    console.log("Not in GMod - Running demo mode");
    setTimeout(() => {
        window.GameDetails("NeonRoleplay", "", "rp_neon_city", 64, "76561198000000000", "darkrp");
        
        let p = 0;
        const interval = setInterval(() => {
            p += 1;
            updateProgress(p);
            window.SetStatusChanged("Téléchargement des ressources... (" + p + "%)");
            if (p >= 100) clearInterval(interval);
        }, 50);
    }, 1000);
}
