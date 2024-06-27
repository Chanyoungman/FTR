let dragItem = null;
let offsetX, offsetY;

function showPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    const currentPage = document.getElementById(`page${pageNumber}`);
    currentPage.style.display = 'block';
    if (pageNumber === 2) {
        initializeBranches();
    } else if (pageNumber === 1) {
        animateDate();
    }
}

function initializeBranches() {
    const branches = document.querySelectorAll('.branch');
    const container = document.querySelector('.gitflow-container');
    const containerRect = container.getBoundingClientRect();
    branches.forEach((branch, index) => {
        branch.style.left = `${containerRect.width / 2 - branch.offsetWidth / 2}px`;
        branch.style.top = `${index * 100 + 50}px`; // 세로 간격 100px
        autoResize(branch.querySelector('.branch-input'));

        // 드래그 이벤트 추가
        branch.addEventListener('mousedown', dragStart);
    });
}

function dragStart(event) {
    if (event.target.tagName.toLowerCase() !== 'textarea') {
        dragItem = event.target.closest('.branch');
        offsetX = event.clientX - dragItem.getBoundingClientRect().left;
        offsetY = event.clientY - dragItem.getBoundingClientRect().top;
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
        event.preventDefault(); // 기본 드래그 이벤트 비활성화
    }
}

function drag(event) {
    if (!dragItem) return;
    const x = event.clientX - offsetX;
    const y = event.clientY - offsetY;
    dragItem.style.left = `${x}px`;
    dragItem.style.top = `${y}px`;
}

function dragEnd() {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', dragEnd);
    dragItem = null;
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function animateDate() {
    const dateText = "6.27";
    const dateContainer = document.getElementById('animated-date');
    dateContainer.innerHTML = '';
    const effectSound = document.getElementById('effect-sound');

    dateText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'date-char';
        span.style.animationDelay = `${(index + 3) * 0.5}s`; // 이미지 애니메이션이 끝난 후 시작
        span.textContent = char;
        dateContainer.appendChild(span);
        
        // Play effect sound for each character
        setTimeout(() => {
            effectSound.currentTime = 0;
            effectSound.play();
        }, (index + 3) * 500); // 애니메이션 시작 시간에 맞춰 효과음 재생
    });

    // 3초 후 새로운 이미지 애니메이션 시작
    setTimeout(() => {
        const heartContainer = document.getElementById('heart-container');
        heartContainer.style.display = 'flex';
        heartContainer.addEventListener('animationend', () => {
            heartContainer.style.pointerEvents = 'auto'; // 애니메이션이 끝난 후 클릭 가능하게 설정
        });
    }, (dateText.length + 3) * 500 + 3000); // 날짜 애니메이션이 끝난 후 3초 지연
}

window.onload = () => {
    showPage(1);
}