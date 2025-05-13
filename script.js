document.getElementById('weightForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const genderInput = document.getElementById('gender');
    const mediaContainer = document.getElementById('mediaContainer');
    const weightAudio = document.getElementById('weightAudio');

    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    if (isNaN(weight) || weight < 1 || weight > 300) {
        displayResult('Por favor, ingresa un peso válido entre 1 y 300 kg.');
        mediaContainer.style.display = 'none';
        return;
    }

    if (isNaN(height) || height < 0.5 || height > 2.5) {
        displayResult('Por favor, ingresa una altura válida entre 0.5 y 2.5 metros.');
        mediaContainer.style.display = 'none';
        return;
    }

    // Calcular IMC
    const bmi = weight / (height * height);
    let message = '';
    if (bmi < 18.5) {
        message = 'Bajo peso';
    } else if (bmi >= 18.5 && bmi < 25) {
        message = 'Peso normal';
    } else if (bmi >= 25 && bmi < 30) {
        message = 'Sobrepeso';
    } else {
        message = 'Obesidad';
    }

    displayResult(`Tu IMC es ${bmi.toFixed(2)}. ${message}.`);
    mediaContainer.style.display = 'block';

    // Reproducir audio automáticamente
    weightAudio.play().catch(error => {
        // Manejar error si la reproducción automática es bloqueada por el navegador
        console.log('No se pudo reproducir el audio automáticamente:', error);
    });
});

function displayResult(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = message;
}
