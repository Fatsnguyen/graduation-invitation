// ==========================================
// 1. HIỆU ỨNG TRANG TRÍ (DECORATION)
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    // Cấu hình Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "out_mode": "out" }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } },
                "modes": { "grab": { "distance": 140 }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }

    // Hiệu ứng Typing
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const textToType = "LỄ TỐT NGHIỆP 2026";
        let charIndex = 0;
        function type() {
            if (charIndex < textToType.length) {
                typingElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 150);
            }
        }
        setTimeout(type, 1000);
    }
});

// --- HIỆU ỨNG PHÁO HOA GIẤY ---
function fireConfetti(role) {
    if (typeof confetti !== 'function') return;

    if (role === 'lover' || role === 'small_family') {
        var count = 200;
        var defaults = { origin: { y: 0.7 } };
        function fire(particleRatio, opts) {
            confetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }
        fire(0.25, { spread: 26, startVelocity: 55, colors: ['#ff0000', '#ff69b4'] });
        fire(0.2, { spread: 60, colors: ['#ff0000', '#ff69b4'] });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#ff0000', '#ff69b4'] });
    } else {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f97316', '#1e3a8a', '#ffffff', '#ffd700']
        });
    }
}

// ==========================================
// 2. LOGIC CHÍNH (CRUD & ROLE)
// ==========================================

function saveGuestInfo() {
    const name = document.getElementById('guestName').value.trim();
    const role = document.getElementById('guestRole').value;

    if (!name || !role) {
        alert("Nhập thiếu là không có thiệp đâu nhé!");
        return;
    }

    if (role === 'lover' && (name.toLowerCase().includes("nyc") || name.toLowerCase().includes("người yêu cũ"))) {
        alert("Hệ thống phát hiện đối tượng lạ. Lễ tốt nghiệp không dành cho quá khứ nhé! 😜");
        return;
    }

    localStorage.setItem('currentGuest', JSON.stringify({ name, role }));

    const container = document.querySelector('.login-container');
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'translateY(-20px)';
        container.style.transition = 'all 0.5s ease';
    }

    setTimeout(() => { window.location.href = 'invitation.html'; }, 500);
}

// GỘP CHUNG LOGIC HIỂN THỊ VÀO ĐÂY
function displayInvitation() {
    const data = JSON.parse(localStorage.getItem('currentGuest'));
    if (!data) {
        window.location.href = 'index.html';
        return;
    }

    const welcome = document.getElementById('welcomeText');
    const message = document.getElementById('personalMessage');
    const gallery = document.getElementById('imageGallery');
    const personal_greeting = document.getElementById('personalGreeting');
    const card = document.querySelector('.invitation-card');

    if (card) {
        if (data.role === 'small_family') {
            card.classList.add('small-family');
        }
    }

    let greeting = "";
    let content = "";
    let imgSrc = "";
    let personal = "";
    switch (data.role) {
        case 'family':
            personal = "Trân trọng kính mời cô chú đến dự lễ tốt nghiệp của con ạ!"
            break;
        case 'lover':
            personal = "Trân trọng kính mời embe iu đến dự lễ tốt nghiệp của anh <3"
            break;
        default:
            personal = "Trân trọng kính mời bạn iu đến dự lễ tốt nghiệp của tui!!!"
            break;
        case 'small_family':
            personal = "Trân trọng mời mẹ iu với em gái đến dự ngày trọng đại này 💖";
            break;
    }

    switch (data.role) {
        case 'family':
            greeting = `Con chào ${data.name}!`;
            content = "Cảm ơn gia đình đã luôn là điểm tựa vững chắc để con hoàn thành chặng đường tại FPT Poly.";
            
            break;
        case 'lover':
            greeting = `Iu Embe ${data.name} nhất trên đời! 💖`;
            content = "Tốt nghiệp rồi, anh chính thức có thêm thời gian dành cho 'nóc nhà'. Cảm ơn embe đã kiên nhẫn đợi anh!";
            imgSrc = "images/couple.jpg";
            break;
        case 'friend':
            greeting = `Chúc mừng ${data.name} đã là người được chọn! 🎓`;
            content = "Deadline đã qua, bằng đã cầm! Hẹn chiến hữu tại buổi lễ, không đi là bao lẩu nhé. 🍻";
            imgSrc = "images/friend-meme.jpg";
            break;
        case 'small_family':
            greeting = `Gia đình nhỏ của anh ${data.name} 💕`;
            content = "Hành trình này có mẹ và SoRi là điều tuyệt vời nhất của con. Cảm ơn mẹ và Ri vì đã luôn bên con!";
            imgSrc = "images/small-family.jpg";
            break;
        default:
            greeting = `Chào mừng ${data.name}!`;
            content = "Rất mong được đón tiếp bạn.";
            imgSrc = "images/default.jpg";
    }

    if (welcome) welcome.innerText = greeting;
    if (message) message.innerText = content;
    if (personal_greeting) personal_greeting.innerText = personal;
    if (gallery) {
        let images = [];

        switch (data.role) {
            case 'family':
                images = [
                    "images/family.jpg",
                    "images/family2.jpg",
                    "images/family3.jpg"
                ];
                break;
            case 'lover':
                images = [
                    "image/love/z7764019832006_53838fc6c3f954a66c8d4f85e2ac5659.jpg",
                    "image/love/z7764019835034_90556535bfc67cd3111ecfc9d3cfed08.jpg",
                    "image/love/z7764019835501_ed0bcd9c244970f7a6868b3472954693.jpg",
                    "image/love/z7764019837418_2c0201b316f39215e813f35337d733aa.jpg",
                    "image/love/z7764019838074_f46679f7fe38a8e1d5de3c8cc0c6d941.jpg",
                    "image/love/z7764019840685_5cd4a9a345e95e834f48f23d80951c52.jpg",
                    "image/love/z7764019842822_9a9c2db49000f90281cd6d722ef23c0f.jpg",
                    "image/love/z7764019847123_8b3a2b77514ce1817f70a77e92c9f8d5.jpg",
                    "image/love/z7764019849605_9ae67f280581f220ea7af1319ece47df.jpg"
                ];
                break;
            case 'friend':
                images = [
                    "image/friends/z7764018921737_37f1b0dc03a62693f979cf3d3bfd90a0.jpg",
                    "image/friends/z7764018921894_d45f3f95de7de5e8e89562e8707c3f77.jpg",
                    "image/friends/z7764018922482_f5eb0a2f787fb9e340bff88f5bbd0e57.jpg",
                    "image/friends/z7764018923254_88e40e1a7765cb8d3d8f1f45cde4b171.jpg",
                    "image/friends/z7764018925499_1284e6ee3d25c73c5b52d2fe5c2e7707.jpg",
                    "image/friends/z7764018925568_3aad7652f60790e172db244c3c300988.jpg",
                    "image/friends/z7764018926228_0944aa951177da73d6fafecf91364fea.jpg",
                    "image/friends/z7764018926294_a09095c03393c631a8141cab534a21d9.jpg",
                    "image/friends/z7764018926572_741f909929752977aa8c93286a3de754.jpg",
                    "image/friends/z7764018927125_2ba1ec6f0251119f3c9284f3b5d58f7c.jpg",
                    "image/friends/z7764018927595_8d1fdd59ce089ceed0b03c95244b07b4.jpg",
                    "image/friends/z7764018928236_ef7182a8ed14a23aba902d05773ea38c.jpg",
                    "image/friends/z7764018928972_eae5cb4f57e547698c3e6ba8907be591.jpg"
                ];
                break;
            case 'small_family':
                images = [
                    "image/s_family/z7764018062953_ed152bf785d1c9c8b51755d37226b36e.jpg",
                    "image/s_family/z7764018063241_98c6a28c007f9dc9603c8b3205ec15ea.jpg",
                    "image/s_family/z7764018063603_6a4d52e536f18a7ce9fec90e40358f9a.jpg",
                    "image/s_family/z7764018064303_c58ebdca744fb6eccd96f7a3a8e6ff99.jpg",
                    "image/s_family/z7764018064450_65bf28f15caf17742cae8267b7a2174d.jpg",
                    "image/s_family/z7764018068626_73822343e61f0af8388f4db1592f773e.jpg",
                    "image/s_family/z7764018069273_fdcfa56706532b6718eff6e6246e874b.jpg",
                    "image/s_family/z7764018072702_a621acb07e583a7890c4cc2d2c338f75.jpg",
                    "image/s_family/z7764018074552_3cffa4e5b970856d56b7ad4cb86a1cdf.jpg"
                ];
                break;
            default:
                images = [
                    "images/default.jpg"
                ];
        }

        gallery.innerHTML = `
        <img id="sliderImage" src="${images[0]}" 
        style="width:100%; border-radius:15px; box-shadow: 0 10px 20px rgba(0,0,0,0.1); transition: 0.5s;">
    `;

        let index = 0;

        setInterval(() => {
            index = (index + 1) % images.length;
            const img = document.getElementById("sliderImage");

            if (img) {
                img.style.opacity = 0;

                setTimeout(() => {
                    img.src = images[index];
                    img.style.opacity = 1;
                }, 300);
            }
        }, 3000); // đổi ảnh mỗi 3 giây
    }

    // Khởi chạy đồng hồ và pháo hoa
    startCountdown();
    setTimeout(() => { fireConfetti(data.role); }, 300);
}

// --- LOGIC ĐỒNG HỒ ĐẾM NGƯỢC ---
function startCountdown() {
    const graduationDate = new Date("May 14, 2026 10:00:00").getTime();

    const timer = setInterval(function () {
        const now = new Date().getTime();
        const distance = graduationDate - now;

        if (distance < 0) {
            clearInterval(timer);
            const container = document.querySelector(".countdown-container");
            if (container) container.innerHTML = "<h3 style='color: #f97316;'>🎉 BUỔI LỄ ĐANG DIỄN RA! 🎉</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.getElementById("days")) {
            document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    }, 1000);
}

function editInfo() { window.location.href = 'index.html'; }
function deleteSession() {
    if (confirm("Bạn muốn đăng xuất?")) {
        localStorage.removeItem('currentGuest');
        window.location.href = 'index.html';
    }
}