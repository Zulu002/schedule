// Расписание на 4 недели
const schedule = {
    1: {
        "Пятница": [
            { time: "13:25 - 14:25", subject: "Информационные системы и технологии", type: "лекция", room: "4.6" },
            { time: "14:30 - 15:30", subject: "Информационные системы и технологии", type: "практика", room: "4.6" },
            { time: "15:35 - 16:35", subject: "Русский язык и культура речи ", type: "практика", room: "2.5" },
            { time: "16:40 - 17:40", subject: "Физическая культура и спорт ", type: "практика", room: "Спортзал на Джамалутдина Атаева 5" }
        ],
        "Суббота": [
            { time: "13:25 - 14:25", subject: "Программирование", type: "лекция", room: "3.10" },
            { time: "14:30 - 15:30", subject: "Программирование", type: "практика", room: "3.10" },
            { time: "15:35 - 16:35", subject: "Линейная алгебра", type: "лекция", room: "3.10" },
            { time: "16:40 - 17:40", subject: "Операционные системы", type: "лабораторная", room: "3.10" }
        ]
    },
    2: {
        "Пятница": [
            { time: "13:25 - 14:25", subject: "Линейная алгебра", type: "практика", room: "2.8" },
            { time: "14:30 - 15:30", subject: "Иностранный язык", type: "практика", room: "4.6" },
            { time: "15:35 - 16:35", subject: "Иностранный язык", type: "практика", room: "4.6" },
            { time: "16:40 - 17:40", subject: "Операционные системы", type: "практика", room: "?" }
        ],
        "Суббота": [
            { time: "13:25 - 14:25", subject: "Основы российской государственности", type: "лекция", room: "3.4" },
            { time: "14:30 - 15:30", subject: "Основы российской государственности", type: "практика", room: "3.4" },
            { time: "15:35 - 16:35", subject: "Противодействие экстремизму и терроризму", type: "лекция", room: "3.4" },
            { time: "16:40 - 17:40", subject: "Операционные системы", type: "лекция", room: "3.10" }
        ]
    },
    3: {
        "Пятница": [
            { time: "13:25 - 14:25", subject: "Программирование", type: "лабораторная", room: "3.8" },
            { time: "14:30 - 15:30", subject: "Право и антикоррупционное поведение", type: "практика", room: "4.6" },
            { time: "15:35 - 16:35", subject: "История России", type: "лекция", room: "2.4" },
            { time: "16:40 - 17:40", subject: "История России", type: "практика", room: "2.4" }
        ],
        "Суббота": [
            { time: "13:25 - 14:25", subject: "Право и антикоррупционное поведение", type: "лекция", room: "3.11" },
            { time: "14:30 - 15:30", subject: "Основы экономики и финансовой грамотности", type: "лекция", room: "3.11" },
            { time: "15:35 - 16:35", subject: "Графические пакеты и WEB-дизайн", type: "практика", room: "3.10" },
            { time: "16:40 - 17:40", subject: "Графические пакеты и WEB-дизайн", type: "лабораторная", room: "3.10" }
        ]
    },
    4: {
        "Пятница": [
            { time: "14:30 - 15:30", subject: "Информационные системы и технологии", type: "лабораторная", room: "4.6" },
            { time: "15:35 - 16:35", subject: "История России", type: "лекция", room: "2.4" },
            { time: "16:40 - 17:40", subject: "История России", type: "практика", room: "2.4" }
        ],
        "Суббота": [
            { time: "13:25 - 14:25", subject: "Право и антикоррупционное поведение", type: "лекция", room: "3.11" },
            { time: "14:30 - 15:30", subject: "Графические пакеты и WEB-дизайн", type: "практика", room: "3.10" },
            { time: "15:35 - 16:35", subject: "Основы экономики и финансовой грамотности", type: "лекция", room: "3.11" },
            { time: "16:40 - 17:40", subject: "Основы экономики и финансовой грамотности", type: "практика", room: "3.11" }
        ]
    }
};

// Настройте дату начала семестра (измените на вашу реальную дату)
const START_DATE = new Date('2025-09-01'); // Пример даты начала семестра

// Функция для вычисления текущей недели
function getCurrentWeek() {
    const now = new Date();
    const diffTime = now - START_DATE;
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7)) + 1;
    return ((diffWeeks - 1) % 4) + 1; // Цикл 1-2-3-4
}

// Функция для обновления даты и информации о неделе
function updateDateAndWeek() {
    const now = new Date();
    const dateString = now.toLocaleDateString('ru-RU', {
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        weekday: 'long'
    });
    document.getElementById('currentDate').textContent = dateString;
    
    const currentWeek = getCurrentWeek();
    const nextWeek = currentWeek === 4 ? 1 : currentWeek + 1;
    
    document.getElementById('weekLabel').textContent = `Неделя ${currentWeek}`;
    document.getElementById('nextWeekInfo').textContent = `Следующая неделя: ${nextWeek}`;
    
    return currentWeek;
}

// Функция для отображения расписания
function renderSchedule(weekNumber) {
    const daysContainer = document.getElementById('daysContainer');
    daysContainer.innerHTML = '';
    
    const weekSchedule = schedule[weekNumber];
    
    for (const [dayName, lessons] of Object.entries(weekSchedule)) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day-card';
        
        let lessonsHTML = '';
        lessons.forEach((lesson, index) => {
            lessonsHTML += `
                <div class="lesson ${lesson.type.toLowerCase()}">
                    <div class="lesson-time">${lesson.time}</div>
                    <div class="lesson-subject">${lesson.subject}</div>
                    <div class="lesson-details">
                        <span class="lesson-type">${lesson.type}</span>
                        <span class="lesson-room">ауд. ${lesson.room}</span>
                    </div>
                </div>
            `;
        });
        
        dayElement.innerHTML = `
            <div class="day-header">${dayName}</div>
            <div class="lessons-container">
                ${lessonsHTML}
            </div>
        `;
        
        daysContainer.appendChild(dayElement);
    }
}

// Функция для проверки, сегодняшний ли это день
function highlightToday() {
    const now = new Date();
    const todayName = now.toLocaleDateString('ru-RU', { weekday: 'long' });
    const dayCards = document.querySelectorAll('.day-card');
    
    dayCards.forEach(card => {
        const dayHeader = card.querySelector('.day-header');
        if (dayHeader && dayHeader.textContent === todayName) {
            card.classList.add('today');
        }
    });
}

// Основная функция инициализации
document.addEventListener('DOMContentLoaded', function() {
    const currentWeek = updateDateAndWeek();
    renderSchedule(currentWeek);
    highlightToday();
    
    // Обновляем каждые 24 часа
    setInterval(() => {
        const newWeek = updateDateAndWeek();
        renderSchedule(newWeek);
        highlightToday();
    }, 24 * 60 * 60 * 1000);
});

// Функция для ручного переключения недель (на будущее)
function switchWeek(weekNumber) {
    if (schedule[weekNumber]) {
        renderSchedule(weekNumber);
        document.getElementById('weekLabel').textContent = `Неделя ${weekNumber}`;
    }
}