$(function() {

//------------------------------гамбургер-----------------------------
// $('.hamburger').click(function() {
//   $(this).toggleClass('hamburger-active');
//   $('nav').toggleClass('nav-active');
//   $('header').toggleClass('header-menu');
// });

//-------------------------------попандер---------------------------------------
  $('.page-modal').popup({transition: 'all 0.3s'});

//------------------------------------form-------------------------------------------
	$('input[type="tel"]').mask('+0 (000) 000-00-00');

	jQuery.validator.addMethod("phoneno", function(phone_number, element) {
	   return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
	}, "Введите Ваш телефон");


  $(".form").each(function(index, el) {
    $(el).addClass('form-' + index);

    $('.form-' + index).validate({
      rules: {
        phone: {
          required: true,
          phoneno: true
        },
        name: 'required',
      },
      messages: {
        name: "Введите Ваше имя",
        phone: "Введите Ваш телефон",
      },
      submitHandler: function(form) {
        var t = {
          name: jQuery('.form-' + index).find("input[name=name]").val(),
          phone: jQuery('.form-' + index).find("input[name=phone]").val(),
          subject: jQuery('.form-' + index).find("input[name=subject]").val()
        };
        ajaxSend('.form-' + index, t);
      }
    });
  });

  $("button").on("click", function(){
    setTimeout(function() {
      $('label.error').hide();
    }, 3000);
  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".page-modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

//----------------------------------------fixed----------------------------------
  $(window).scroll(function(){
      if($(this).scrollTop()>20){
          $('.header').addClass('header-active');
      }
      else if ($(this).scrollTop()<20){
          $('.header').removeClass('header-active');
      }
  });

});

//----------------------------------------preloader----------------------------------

$(window).on('load', function(){
  $('.preloader').delay(1000).fadeOut('slow');
});

//-------------------------------------------------------------------------
$(document).ready(function() {
    var coopLink = $('body').find('.coop').find('a'),
        coop = $('body').find('.coop');
    $(coop).css({
        color: '#4C4C4C',
    });
    $(coopLink).css({
        color: '#4C4C4C',
    });
    $(coopLink).html('Сайт разработан студией Romi');
    $(".phone").addClass("hidden-lg");
    $(".phone").addClass("hidden-md");
    $("footer a[href='price.html']").before("<a href='tel:+74992701299' class = 'footer_phone'>+7 (499) 270-12-99</a><br><a href='tel:+88001003254' class = 'footer_phone'>8 (800) 100-32-54</a><p class = 'footer_phone'> (Звонок по России БЕСПЛАТНЫЙ)</p>  <p class = 'footer_phone'><b>Почта:</b> info@ok-mnenie.ru </p>");
    $("a[href='about.html'], a[href='/about.html']").html('<i class="i6"></i><strong>Контакты</strong>');
    $('.main-nav menu, .mobile-menu').append('<a class="menu-item" href="/blog2/"><i class="i8"></i><strong>Блог</strong></a>');
    
    pageTitle = document.title;
    $("#promo .tel").mask("+7 (999) 999-99-99");
});

var emptyPhone = true;
var emptyTel = true;
$('#phone').keydown(function(e) {
    
    if (emptyPhone && (e.which == 56 || e.which == 104)) {
        e.preventDefault();
        return false;
    }
    emptyPhone = false;
    
});

$('#promo .tel').keydown(function(e) {
    
    if (emptyTel && (e.which == 56 || e.which == 104)) {
        e.preventDefault();
        return false;
    }
    emptyTel = false;
    
});


var pageTitle = '';

function titleAlert() {
    if (document.title == pageTitle) {
        document.title = 'Внимание акция';
    } else {
        document.title = pageTitle;
    }
}

var timeout = 65;
var activityTimeout = setTimeout(inActive, timeout * 1000);
var titleInterval;
var stop = false;

function resetActive(){
    $('#promo').removeClass('uptocall-blur');
    if (stop) {
        return false;
    }
    document.title = pageTitle;
    clearTimeout(activityTimeout);
    //clearInterval(titleInterval);
    activityTimeout = setTimeout(inActive, timeout * 1000);
}

function inActive(){
    titleInterval = setInterval(titleAlert, 1000);
    $('#promo').dialog({width: 500,height:250}); 
    $('#promo .tel').blur();
    stop = true;
}

$(document).bind('mousemove', function(){resetActive()});

$('#promo .send').click(function(){
    $tel = $('#promo .tel').val();
    if ($tel == '') {
        $('#promo .tel').focus();
        return false;
    }
    $.post("promo.php", {phone: $tel}, function() {
        stop = true;
        $('#promo').dialog('close');
    });
});

