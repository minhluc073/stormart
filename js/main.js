/*
    * Show Pass 
    * Otp Input
    * Back Page
    * handle time
    * Datepicker 
    * Check Active
    * Change Value
    * Toggle Theme
    * Header Fixed
    * Touch Spin
    * Message
    * Modal Second
    * Counter
    * Input File
    * Cart Quantity Stepper
    * Preloader
    * Splash Preloader
    * Dropdown More
    * Chat Send
 */
(function ($) {
  "use strict";

  /* Show Pass
  ------------------------------------------------------------------------------------- */
  var showPass = function () {
    $(".show-pass").on("click", function () {
        const input = $(this).closest(".password-wrap").find(".password-field");
        const use = $(this).find("use");

        if (input.attr("type") === "password") {
            input.attr("type", "text");
            use.attr("href", "../icon/sprite.svg#eye");
        } else {
            input.attr("type", "password");
            use.attr("href", "../icon/sprite.svg#eyeOff");
        }
    });
  };

  /* Otp Input
  ------------------------------------------------------------------------------------- */
  var otpInput = function () {
    if ($(".digit-group").length > 0) {
      $(".digit-group")
        .find("input")
        .each(function () {
          $(this).attr("maxlength", 1);
          $(this).on("keyup", function (e) {
            var valNum = $(this).val();
            var parent = $($(this).parent());

            if (e.keyCode === 8 || e.keyCode === 37) {
              var prev = parent.find("input#" + $(this).data("previous"));

              if (prev.length) {
                $(prev).select();
              }
            } else if (
              (e.keyCode >= 48 && e.keyCode <= 57) ||
              (e.keyCode >= 65 && e.keyCode <= 90) ||
              (e.keyCode >= 96 && e.keyCode <= 105) ||
              e.keyCode === 39
            ) {
              var next = parent.find("input#" + $(this).data("next"));
              if (!$.isNumeric(valNum)) {
                $(this).val("");
                return false;
              }

              if (next.length) {
                $(next).select();
              } else {
                if (parent.data("autosubmit")) {
                  parent.submit();
                }
              }
            }
          });
        });
    }
  };

  /* Back Page
  ------------------------------------------------------------------------------------- */
  var backPage = function () {
    $(".btn_back").on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      window.history.go(-1);
    });
  };

  /* Datepicker  
  -------------------------------------------------------------------------------------*/
  var datePicker = function () {
    if ($("#datepicker1").length > 0) {
      $("#datepicker1").datepicker({
        firstDay: 1,
        dateFormat: "dd/mm/yy",
      });
    }
    if ($("#datepicker2").length > 0) {
      $("#datepicker2").datepicker({
        firstDay: 1,
        dateFormat: "dd/mm/yy",
      });
    }
  };

  /* Check Active 
  -------------------------------------------------------------------------*/
  var checkClick = function () {
    $(".flat-check-list").on("click", ".check-item", function () {
      $(this)
        .closest(".flat-check-list")
        .find(".check-item")
        .removeClass("active");
      $(this).addClass("active");
    });
    $(".flat-cb-list").on("click", ".cb-item", function () {
      $(this).toggleClass("active");
    });
    $(".check-icon").on("click", function () {
      $(this).toggleClass("active");
    });
    $(".tf-select").on("click", ".option", function () {
      $(this)
        .closest(".tf-select")
        .find(".current")
        .addClass("active");
    });
  };

  if ($(".nice-select").length > 0) {
    $(".select_js").niceSelect();
  }
  /* Change Value
  ------------------------------------------------------------------------------------- */
  var changeValue = function () {
    $(".language-val").click(function () {
      $(".text-val-language").text($(this).text());
    });

    $(".val-drop").click(function (event) {
      $(".text-val-drop").text($(this).find(".title-drop").text());
      $(".desc-val-drop").text($(this).find(".desc-drop").text());
    });

    $(".val-drop-form").click(function (event) {
      $(".text-val-form").text($(this).find(".title-form").text());
    });
  };

  /* Toggle Theme
  ------------------------------------------------------------------------------------- */
  var toggleTheme = function () {
    var toggle = $(".toggle-theme");

    if (localStorage.toggled === "dark-theme") {
      $("html").addClass("dark-theme");
      toggle.prop("checked", true);
      $('.logo-account img').attr('src', 'images/logo/logo-dark.png');
    } else {
      $("html").removeClass("dark-theme");
      toggle.prop("checked", false);
      $('.logo-account img').attr('src', 'images/logo/logo-light.png');
    }

    toggle.on("click", function () {
      if (localStorage.toggled !== "dark-theme") {
        $("html").addClass("dark-theme");
        localStorage.toggled = "dark-theme";
        toggle.prop("checked", true);
        $('.logo-account img').attr('src', 'images/logo/logo-dark.png');
      } else {
        $("html").removeClass("dark-theme");
        localStorage.toggled = "";
        toggle.prop("checked", false);
        $('.logo-account img').attr('src', 'images/logo/logo-light.png');
      }
    });
  };

  /* Toggle RTL
  ------------------------------------------------------------------------------------- */

  var RTL = function () {
    var isRTL = $("body").hasClass("rtl") || localStorage.getItem("dir") === "rtl";

    applyDir(isRTL ? "rtl" : "ltr");

    $(".toggle-rtl")
      .off("click")
      .on("click", function () {
        var nextRTL = !$("body").hasClass("rtl");
        localStorage.setItem("dir", nextRTL ? "rtl" : "ltr");
        applyDir(nextRTL ? "rtl" : "ltr");
      });
  }
  function applyDir(dir) {
    var useRTL = dir === "rtl";
    $("html").attr("dir", dir);
    $("body").toggleClass("rtl", useRTL);
    $("#switchRTLTheme").prop("checked", useRTL);
  }

  /* Header Fixed
 ------------------------------------------------------------------------------------- */
  var headerFixed = function () {
    if ($(".header").hasClass("fixed-top")) {
      var nav = $(".header");
      if (nav.length) {
        var offsetTop = nav.offset().top,
          headerHeight = nav.height(),
          injectSpace = $("<div>", {
            height: headerHeight,
          });
        injectSpace.hide();

        $(window).on("load scroll", function () {
          if ($(window).scrollTop() > 0) {
            nav.addClass("is-fixed");
            injectSpace.show();
          } else {
            nav.removeClass("is-fixed");
            injectSpace.hide();
          }
        });
      }
    }
  };

  /* Touch Spin
  ----------------------------------------------------------------------------------------- */
  var touchSpin = function () {
    if ($(".stepper").length > 0) {
      $(".stepper").TouchSpin();
    }
  };

  /* Message
 ------------------------------------------------------------------------------------- */
  var handleMessage = function () {
    $(".btn-message").on("click", function () {
      var ipMessage = $(".val-message");
      var messValue = ipMessage.val();
      var currentTime = new Date();
      var hours = currentTime.getHours() >= 12 ? "PM" : "AM";
      var realTime =
        (currentTime.getHours() % 12) +
        ":" +
        currentTime.getMinutes() +
        " " +
        hours;

      var domMessage =
        '<div class="bubble bubble-me box-buble-me">' +
        '<div class="content">' +
        '<span class="time">' +
        realTime +
        "</span>" +
        '<p class="text-item start">' +
        messValue +
        "</p>" +
        "</div>" +
        "</div>";

      if (messValue.length > 0) {
        $(".chat-area").append(domMessage);
      }

      window.scrollTo(0, document.body.scrollHeight);
      ipMessage.val("");
    });
  };

  /* Modal Second
  ------------------------------------------------------------------------------------- */
  var clickModalSecond = function () {
    $(".btn-choose-page").click(function () {
      $("#modalPage").modal("show");
    });
    $(".btn-choose-component").click(function () {
      $("#modalComponent").modal("show");
    });
  };

  /* Counter
  -------------------------------------------------------------------------------------*/
  var flatCounter = function () {
    if ($(document.body).hasClass("counter-scroll")) {
      var a = 0;
      $(window).scroll(function () {
        var oTop = $(".tf-counter").offset().top - window.innerHeight;
        if (a === 0 && $(window).scrollTop() > oTop) {
          if ($().countTo) {
            $(".tf-counter")
              .find(".number")
              .each(function () {
                var to = $(this).data("to"),
                  speed = $(this).data("speed"),
                  dec = $(this).data("dec");
                $(this).countTo({
                  to: to,
                  speed: speed,
                  decimals: dec,
                });
              });
          }
          a = 1;
        }
      });
    }
  };

  /* Input File 
  -------------------------------------------------------------------------------------*/
  var inputUpload = function () {
    $("input[type=file]").change(function (e) {
      $(this)
        .parents(".boxuploadfile")
        .find(".file-name")
        .text(e.target.files[0].name);
    });
  };

  /* Copy Input
-------------------------------------------------------------------------------------*/
var inputCopy = function () {
  $(".btn-copy").on("click", function () {
    var input = $(this).siblings("input");

    navigator.clipboard.writeText(input.val()).then(function () {
      alert("Copied successfully!");
    }).catch(function () {
      alert("Failed to copy.");
    });
  });
};

var selectFlags = function () {

    $(".select-current").click(function (e) {
        e.stopPropagation();

        $(".select-flag").not($(this).closest(".select-flag")).removeClass("active");

        $(this).closest(".select-flag").toggleClass("active");
    });

$(".select-list li").click(function () {

    const select = $(this).closest(".select-flag");

    select.find(".select-list li").removeClass("active");
    $(this).addClass("active");

    // Thay ảnh
    select.find(".select-current img").attr(
        "src",
        $(this).find("img").attr("src")
    );

    // Thay text
    select.find(".select-current .text-value").text(
        $(this).find("span").text()
    );

    // Cập nhật value
    select.find("input").val($(this).data("value"));

    // Đóng dropdown
    select.removeClass("active");
});

    $(document).click(function () {
        $(".select-flag").removeClass("active");
    });

};

 
  /* Cart Quantity Stepper
------------------------------------------------------------------------------------- */
  var cartQtyStepper = function () {
    var updateCartTotal = function ($page) {
      var $footer = $page.find(".menubar-button.style-cart");
      if ($footer.length === 0) return;

      var total = 0;
      var count = 0;

      $page.find(".cart-item").each(function () {
        var $item = $(this);
        var $check = $item.find(".check");
        if ($check.length && !$check.is(":checked")) return;

        var qty = parseInt($item.find(".qty-stepper .value").text(), 10) || 0;
        var price = parseFloat($item.find(".price-new").first().text().replace(/[^0-9.]/g, "")) || 0;

        total += price * qty;
        count += 1;
      });

      $footer.find(".total-price .price-new").text("$" + total.toFixed(2));
      $footer.find(".btn-dark").text("Checkout (" + count + ")");
    };

    $(".cart-item .btn-plus").on("click", function (e) {
      e.preventDefault();
      var $value = $(this).closest(".qty-stepper").find(".value");
      $value.text((parseInt($value.text(), 10) || 0) + 1);
      updateCartTotal($(this).closest(".cart-page"));
    });

    $(".cart-item .btn-remove").on("click", function (e) {
      e.preventDefault();
      var $page = $(this).closest(".cart-page");
      $(this).closest(".cart-item").remove();
      updateCartTotal($page);
    });

    $(".cart-item .check").on("change", function () {
      updateCartTotal($(this).closest(".cart-page"));
    });
  };

  /* Dropdown More
------------------------------------------------------------------------------------- */
  var dropdownMore = function () {
    $(".btn-more").on("click", function (e) {
      e.stopPropagation();
      $(".dropdown-more").not($(this).closest(".dropdown-more")).removeClass("active");
      $(this).closest(".dropdown-more").toggleClass("active");
    });

    $(document).on("click", function () {
      $(".dropdown-more").removeClass("active");
    });
  };

  /* Chat Send
------------------------------------------------------------------------------------- */
  var chatSend = function () {
    var $bar = $(".chat-input-bar");
    if ($bar.length === 0) return;

    var $input = $bar.find(".ip-message");
    var $chatBody = $(".chat-body");

    var sendMessage = function () {
      var text = $input.val().trim();
      if (!text) return;

      var now = new Date();
      var hours = String(now.getHours()).padStart(2, "0");
      var minutes = String(now.getMinutes()).padStart(2, "0");

      var $group = $('<div class="chat-group right"></div>');
      $('<span class="chat-time"></span>').text(hours + ":" + minutes).appendTo($group);
      $('<div class="chat-bubble"></div>').text(text).appendTo($group);

      $chatBody.append($group);
      $input.val("");
      window.scrollTo(0, document.body.scrollHeight);
    };

    $bar.find(".btn-send").on("click", function (e) {
      e.preventDefault();
      sendMessage();
    });

    $input.on("keydown", function (e) {
      if (e.key === "Enter" || e.keyCode === 13) {
        e.preventDefault();
        sendMessage();
      }
    });
  };

  /* Preloader
------------------------------------------------------------------------------------- */
  var preloader = function () {
    setTimeout(function () {
      $(".preload").fadeOut("slow", function () {
        $(this).remove();
      });
    }, 200);
  };

  /* Splash Preloader
------------------------------------------------------------------------------------- */
  var splashPreloader = function () {
    var $splash = $(".splash-overlay");
    if ($splash.length === 0) return;

    setTimeout(function () {
      $splash.fadeOut(400, function () {
        $(this).remove();
      });
    }, 1800);
  };

  $(function () {
    showPass();
    otpInput();
    backPage();
    datePicker();
    checkClick();
    changeValue();
    toggleTheme();
    headerFixed();
    touchSpin();
    handleMessage();
    clickModalSecond();
    flatCounter();
    inputUpload();
    inputCopy();
    selectFlags();
    cartQtyStepper();
    RTL();
    dropdownMore();
    chatSend();
    preloader();
    splashPreloader();
  });
})(jQuery);
