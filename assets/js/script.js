const exercises = [
    { id: 1, name: "Press de Banca", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop" },
    { id: 2, name: "Sentadilla", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&h=300&fit=crop" },
    { id: 3, name: "Peso Muerto", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&h=300&fit=crop" }
  
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('exercise-list');
    
    // Renderizar ejercicios
    exercises.forEach(ex => {
        const div = document.createElement('div');
        div.className = 'ex-card';
        div.innerHTML = `
            <img src="${ex.img}" alt="${ex.name}">
            <p>${ex.name}</p>
        `;
        div.onclick = () => selectExercise(ex, div);
        grid.appendChild(div);
    });

    document.getElementById('btn-calculate').onclick = calculateRM;
});

function selectExercise(ex, element) {
    document.querySelectorAll('.ex-card').forEach(c => c.classList.remove('selected'));
    element.classList.add('selected');
    
    document.getElementById('calc-form').classList.remove('hidden');
    document.getElementById('selected-exercise-name').innerText = ex.name;
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function calculateRM() {
    const weight = parseFloat(document.getElementById('weight').value);
    const reps = parseInt(document.getElementById('reps').value);

    if (!weight || !reps) return alert("Completa los datos");

    // Fórmula de Brzycki: Peso / (1.0278 - (0.0278 * Reps))
    const rm = weight / (1.0278 - (0.0278 * reps));
    
    showResults(rm);
}

function showResults(rm) {
    document.getElementById('calc-form').classList.add('hidden');
    document.getElementById('exercise-list').classList.add('hidden');
    document.getElementById('result-view').classList.remove('hidden');
    document.getElementById('rm-val').innerText = Math.round(rm);

    const table = document.getElementById('perc-table');
    table.innerHTML = '';
    
    [95, 90, 85, 80, 75, 70].forEach(p => {
        const pVal = Math.round(rm * (p / 100));
        table.innerHTML += `
            <div class="perc-item">
                <span style="color:#94a3b8">${p}%</span>
                <span>${pVal} kg</span>
            </div>
        `;
    });
}