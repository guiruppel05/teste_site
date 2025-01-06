document.addEventListener('DOMContentLoaded', () => {
    // Adiciona vídeos do YouTube
    const videos = [
        { url: 'https://www.youtube.com/embed/VIDEO_ID_1', descricao: 'Descrição do vídeo 1' },
        { url: 'https://www.youtube.com/embed/VIDEO_ID_2', descricao: 'Descrição do vídeo 2' }
    ];

    const videosContainer = document.getElementById('videos');
    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
            <iframe width="560" height="315" src="${video.url}" frameborder="0" allowfullscreen></iframe>
            <p>${video.descricao}</p>
        `;
        videosContainer.appendChild(videoElement);
    });

    // Identificador GPS
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            document.getElementById('location').innerText = `Latitude: ${latitude}, Longitude: ${longitude}`;
        });
    } else {
        document.getElementById('location').innerText = 'Geolocalização não suportada pelo navegador.';
    }

    // Contador de acessos
    fetch('contador.txt')
        .then(response => response.text())
        .then(data => {
            let contador = parseInt(data) || 0;
            contador++;
            document.getElementById('contador').innerText = `Contador de acessos: ${contador}`;
            fetch('contador.txt', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: contador.toString()
            });
        });
});