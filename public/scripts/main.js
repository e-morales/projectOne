// Preloader

$(window).on("load", function () {
    $(".loader .inner").fadeOut(500, function () {
        $(".loader").fadeOut(750);
    });
});

$(document).ready(function () {


    // Gets current copyright year
    $('#year').text(new Date().getFullYear());

    // Init Scrollspy
    $('body').scrollspy({
        target: '#main-nav'
    });

    // Smooth Scrolling
    $('#main-nav a').on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            const hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                window.location.hash = hash;
            });
        }
    });







    $("#vmap").vectorMap({
        map: "usa_en",
        backgroundColor: "#a5bfdd",
        borderColor: "#818181",
        borderOpacity: 0.25,
        borderWidth: 1,
        color: "#f4f3f0",
        enableZoom: true,
        hoverColor: "#c9dfaf",
        hoverOpacity: null,
        normalizeFunction: "linear",
        scaleColors: ["#b6d6ff", "#005ace"],
        selectedColor: "#c9dfaf",
        selectedRegions: null,
        showTooltip: true,
        onRegionClick: function (element, code, state) {
            $.ajax({
                type: "GET",
                url: `/api/songs/${state}`,
                data: "json",
                success: songs => {
                    songs.forEach(song => {
                        $(".songholder").html(
                            `<div>Now Playing: ${song.artist} - ${song.title}</div>`
                        );
                        $("iframe").attr("src", `${song.songUrl}`);
                    });
                }
            });
        }
    });
});