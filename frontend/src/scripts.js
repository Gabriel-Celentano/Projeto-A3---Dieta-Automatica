document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dietForm');
    const resultsDiv = document.getElementById('results');
    const historyList = document.getElementById('historyList');
    const dietHistory = JSON.parse(localStorage.getItem('dietHistory')) || [];

    function calculateCalories(age, gender, activityLevel, goal) {
        let bmr;
        const height = 175; 
        const weight = 70;  

        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else if (gender === 'female') {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }

        const activityFactors = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            very_active: 1.9
        };

        const activityFactor = activityFactors[activityLevel] || 1.2;
        const calorieNeeds = bmr * activityFactor;

        if (goal === 'lose_weight') {
            return calorieNeeds - 500; 
        } else if (goal === 'gain_weight') {
            return calorieNeeds + 500; 
        }
        return calorieNeeds; 
    }

    function displayDietResults(data) {
        resultsDiv.innerHTML = `<h2>Dieta Personalizada</h2><p>${data}</p>`;
    }

    function updateDietHistory(diet) {
        dietHistory.push(diet);
        localStorage.setItem('dietHistory', JSON.stringify(dietHistory));
        renderDietHistory();
    }

    function renderDietHistory() {
        historyList.innerHTML = dietHistory.map(diet => `<li>${diet}</li>`).join('');
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const activityLevel = document.getElementById('activityLevel').value;
        const goal = document.getElementById('goal').value;
        const ingredients = document.getElementById('ingredients').value;

        const calorieNeeds = calculateCalories(age, gender, activityLevel, goal);
        const dietSummary = `Baseado nas suas informações, sua necessidade calórica diária é de aproximadamente ${Math.round(calorieNeeds)} calorias. Ingredientes desejados: ${ingredients}.`;
        
        displayDietResults(dietSummary);
        updateDietHistory(dietSummary);
    });

    renderDietHistory();

    const galleryImages = document.querySelectorAll('.gallery-image');
    let currentImageIndex = 0;

    function showNextImage() {
        galleryImages[currentImageIndex].style.display = 'none';
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        galleryImages[currentImageIndex].style.display = 'block';
    }

    setInterval(showNextImage, 15000);
});
