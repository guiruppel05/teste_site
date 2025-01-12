document.addEventListener("DOMContentLoaded", () => {
    loadAcademias();
    updateAccessCount();
    getUserLocation();
});

// Carregar academias e preencher o dropdown
function loadAcademias() {
    const academias = [
        { id: 1, name: "Parque Barigui", lat: -25.4264, lng: -49.3044 },
        { id: 2, name: "Parque Jardim Botânico", lat: -25.4425, lng: -49.2539 },
        // Outras academias com coordenadas...
    ];

    const select = document.getElementById("academiaSelect");
    select.innerHTML = '<option value="">Selecione aqui a sua academia...</option>';
    academias.forEach(academia => {
        const option = document.createElement("option");
        option.value = academia.id;
        option.textContent = academia.name;
        select.appendChild(option);
    });
}

// Validar e enviar feedback
function sendFeedback(event) {
    event.preventDefault();
    const feedback = document.getElementById("feedback").value.trim();

    if (!feedback) {
        displayNotification("Por favor, insira seu feedback.", true);
        return;
    }

    // Suponha que o feedback foi enviado
    displayNotification("Feedback enviado com sucesso!", false);
}

// Exibir notificações
function displayNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.className = `notification ${isError ? 'error' : 'success'}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Contador de acessos
function updateAccessCount() {
    const count = localStorage.getItem("accessCount") || 0;
    const newCount = parseInt(count) + 1;
    localStorage.setItem("accessCount", newCount);
    document.getElementById("contadorAcessos").textContent = `Acessos: ${newCount}`;
}

// Geolocalização do usuário
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            selectClosestAcademia(userLat, userLng);
        }, () => {
            console.log("Geolocalização não permitida pelo usuário.");
        });
    }
}

// Selecionar academia mais próxima
function selectClosestAcademia(userLat, userLng) {
    const academias = [
        { id: 1, name: "Parque Barigui", lat: -25.4264, lng: -49.3044 },
        { id: 2, name: "Parque Jardim Botânico", lat: -25.4425, lng: -49.2539 },
        // Outras academias...
    ];

    let closestAcademia = null;
    let minDistance = Infinity;

    academias.forEach(academia => {
        const distance = getDistance(userLat, userLng, academia.lat, academia.lng);
        if (distance < minDistance) {
            minDistance = distance;
            closestAcademia = academia;
        }
    });

    if (closestAcademia) {
        const select = document.getElementById("academiaSelect");
        select.value = closestAcademia.id;
    }
}

// Função para calcular distância entre coordenadas
function getDistance(lat1, lng1, lat2, lng2) {
    const toRad = x => (x * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
