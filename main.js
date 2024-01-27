// Inicializar Swiper
var swiper = new Swiper(".swiper-container", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
    effect: "fade",
    autoplay: {
        delay: 6000, // 6 segundos
        disableOnInteraction: false,
    },
});

// Inicializar AOS después de la carga de la página
AOS.init();

var activeButton = null;

function toggleButton(button) {
    if (activeButton !== button) {
        if (activeButton !== null) {
            activeButton.classList.remove('active');
            activeButton.setAttribute('aria-expanded', 'false');
            hideContent(activeButton);
        }

        button.classList.add('active');
        activeButton = button;
        activeButton.setAttribute('aria-expanded', 'true');
        showContent(activeButton);
    } else {
        activeButton.classList.remove('active');
        activeButton.setAttribute('aria-expanded', 'false');
        hideContent(activeButton);
        activeButton = null;
    }
}

function hideContent(button) {
    var targetId = button.getAttribute('data-bs-target');
    var targetCollapse = document.querySelector(targetId);
    if (targetCollapse) {
        targetCollapse.classList.remove('show');
    }
}

function showContent(button) {
    var targetId = button.getAttribute('data-bs-target');
    var targetCollapse = document.querySelector(targetId);
    if (targetCollapse) {
        targetCollapse.classList.add('show');
    }
}


// Función para abrir WhatsApp al hacer clic en el botón
function openWhatsApp() {
    window.open('https://wa.me/123456789', '_blank');
}

function copiarAlPortapapeles(event) {
    event.preventDefault();
    var textoACopiar = "info@internacioncuidada.com";
    var elementoTemporal = document.createElement("textarea");
    elementoTemporal.value = textoACopiar;
    document.body.appendChild(elementoTemporal);
    elementoTemporal.select();
    document.execCommand("copy");
    document.body.removeChild(elementoTemporal);
    mostrarMensajeCopiado();
}

function mostrarMensajeCopiado() {
    var mensaje = document.getElementById("copiadoMensaje");
    mensaje.style.display = "block";
    setTimeout(function() {
        mensaje.style.display = "none";
    }, 2000);
}

document.addEventListener("DOMContentLoaded", function() {
    var watermarkElement = document.querySelector('a[href="https://elfsight.com/instagram-feed-instashow/?utm_source=websites&utm_medium=clients&utm_content=instashow&utm_term=127.0.0.1&utm_campaign=free-widget"]');
    if (watermarkElement) {
        watermarkElement.style.display = "none";
    }
});