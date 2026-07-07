
if ($(".tf-swiper").length > 0) {
    $(".tf-swiper").each(function () {
        const config = $(this).data("swiper");
        if (this.swiper) {
            this.swiper.destroy(true, true);
        }
        new Swiper(this, config);
    });
}



if ($(".product-thumbs-slider").length > 0) {
    var main = new Swiper(".tf-product-media-main", {
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        speed: 800,
        navigation: {
            nextEl: ".thumbs-next",
            prevEl: ".thumbs-prev",
        },
        pagination: { el: ".pagination-thumbs", clickable: true },

        on: {
        init: function () {
            updateFraction(this);
        },
        slideChange: function () {
            updateFraction(this);
        }
    }
    });

  function updateFraction(swiper) {
      $(".pagination-fraction").text(
          `${swiper.realIndex + 1}/${swiper.slides.length}`
      );
  }    

    function updateActiveButtonThumbs(type, activeIndex) {
        var btnClass = `.${type}-btn`;
        var dataAttr = `data-${type}`;
        var currentClass = `.tf-product-info-list .value-current${capitalizeFirstLetter(type)}`;
        var selectClass = `.tf-product-info-list .select-current${capitalizeFirstLetter(type)}`;
        $(btnClass).removeClass("active");

        var currentSlide = $(".tf-product-media-main .swiper-slide").eq(activeIndex);
        var currentValue = currentSlide.attr(dataAttr);

        if (currentValue) {
            $(`${btnClass}[${dataAttr}='${currentValue}']`).addClass("active");
            $(currentClass).text(currentValue);
            $(selectClass).text(currentValue);
        }
    }

    function scrollToThumbs(type, value, color) {
        if (!value || !color) return;

        var matchingSlides = $(".tf-product-media-main .swiper-slide").filter(function () {
            return (
                $(this).attr(`data-${type}`) === value &&
                $(this).attr('data-color') === color
            );
        });

        if (matchingSlides.length > 0) {
            var firstIndex = matchingSlides.first().index();
            main.slideTo(firstIndex, 1000, false);
        } else {
            var fallbackSlides = $(".tf-product-media-main .swiper-slide").filter(function () {
                return $(this).attr(`data-${type}`) === value;
            });

            if (fallbackSlides.length > 0) {
                var fallbackIndex = fallbackSlides.first().index();
                main.slideTo(fallbackIndex, 1000, false);
            }
        }
    }

    function setupVariantButtonsThumbs(type) {
        $(`.${type}-btn`).on("click", function () {
            if ($(this).closest(".modal-quick-view").length) return;
            var value = $(this).data(type);
            var color = $(".tf-product-info-list .value-currentColor").text();

            $(`.${type}-btn`).removeClass("active");
            $(this).addClass("active");

            scrollToThumbs(type, value, color);
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    ["color", "size"].forEach((type) => {
        main.on("slideChange", function () {
            updateActiveButtonThumbs(type, this.activeIndex);
        });
        setupVariantButtonsThumbs(type);
        updateActiveButtonThumbs(type, main.activeIndex);
    });
}