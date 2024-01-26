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

// Función para cargar noticias
function cargarNoticias() {
    var apiKey = '660e9501be1c4e2cb35b2897fbb50e54';
    var apiUrl = 'https://newsapi.org/v2/top-headlines';
    var country = 'ar';
    var category = 'health';

    $.ajax({
        url: apiUrl,
        method: 'GET',
        data: {
            country: country,
            category: category,
            apiKey: apiKey
        },
        success: function (data) {
            // Manejar la respuesta de la API y mostrar las noticias
            var noticiasContainer = $('#noticiasContainer');

            data.articles.slice(0, 4).forEach(function (article) {
                // Verificar si hay una URL de imagen disponible
                var imageUrl = article.urlToImage ? article.urlToImage : '/src/LogoIC.png';

                // Crear la tarjeta de noticia
                var tarjeta = `
                    <div class="col-md-3">
                        <div class="card d-flex flex-column h-100">
                            <img src="${imageUrl}" class="card-img-top" alt="${article.title}">
                            <div class="card-body flex-fill">
                                <h5 class="card-title">${article.title}</h5>
                            </div>
                            <div class="card-footer">
                                <a href="${article.url}" target="_blank" class="btn btn-primary btn-block">Leer más</a>
                            </div>
                        </div>
                    </div>
                `;

                noticiasContainer.append(tarjeta);
            });
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener noticias:', error);
            console.log('Detalles del error:', xhr);
        }
    });
}

// Cargar noticias al cargar el documento
$(document).ready(function () {
    cargarNoticias();
});


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