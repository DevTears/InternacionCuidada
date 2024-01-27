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
    const buttons = document.querySelectorAll(".btn-mostrar-mas");
    const secciones = document.querySelectorAll(".seccion-adicional");
    
    // Ocultar todas las secciones adicionales
    secciones.forEach(seccion => {
        seccion.style.display = "none";
    });

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const targetId = this.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);
            const images = document.querySelectorAll(".foto-con-filtro-azul");
            const activeSection = document.querySelector(".seccion-adicional.mostrando");

            // Restaurar el filtro azul en la imagen de la sección activa anteriormente
            if (activeSection && activeSection !== targetSection) {
                const activeImageId = activeSection.id.replace("seccion-", "img-");
                const activeImage = document.getElementById(activeImageId);
                activeImage.classList.add("foto-con-filtro-azul");
                activeSection.classList.remove("mostrando");
                activeSection.style.display = "none"; // Ocultar la sección activa anteriormente
            }

            // Mostrar u ocultar la sección correspondiente
            targetSection.classList.toggle("mostrando");
            targetSection.style.display = targetSection.classList.contains("mostrando") ? "block" : "none";

            // Cambiar el texto del botón
            if (targetSection.classList.contains("mostrando")) {
                button.textContent = "MOSTRAR MENOS";
            } else {
                button.textContent = "MOSTRAR MÁS";
            }
            
            // Quitar el filtro azul de la imagen correspondiente
            const targetImage = document.getElementById("img-" + targetId.replace("seccion-", ""));
            targetImage.classList.toggle("foto-con-filtro-azul");
        });
    });
});