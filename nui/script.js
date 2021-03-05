$(document).ready(function() {
    $(".sub-btn").click(function() {
        $(this).next(".sub-menu").slideToggle();
        $(this).find(".dropdown").toggleClass("rotate");
    });
    $(".menu-btn").click(function() {
        $(".slide-bar").addClass("active");
        $(".menu-btn").css("visibility", "hidden");
    });
})

window.addEventListener("message", (event) => {
    let data = event.data.data;
    switch(event.data.action) {
        case "show":
            $("body").fadeIn(500);
            $(".window" + "#deposit").css({"display":"none"});
            $(".window" + "#withdraw").css({"display":"none"});
            $(".window" + "#home").css({"display":"none"});
            break;
        case "update":
            $("#player-name").html(data.character.firstname + " " + data.character.lastname);
            $("#player-cid").html(data.cid);
            $("#cash-amount").html("€" + data.accounts.cash);
            $("#bank-balance").html("€" + data.accounts.bank);
            break;
    }
})

$(document).on('click', "[data-action=deposit]", function(e) {
    var amount = $(this).attr("data-amount");
    if (amount > 0) {
        $.post("https://fxbanking/doDeposit", JSON.stringify({
            amount: parseInt(amount)
        }));
    }
})

$(document).on('click', "[data-action=withdraw]", function(e) {
    var amount = $(this).attr("data-amount");
    if (amount > 0) {
        $.post("https://fxbanking/doWithdraw", JSON.stringify({
            amount: parseInt(amount)
        }));
    }
})

$(document).on('click', "#initiateDeposit", function(e) {
    var amount = $("#depositAmount").val();

    if (amount !== undefined && amount > 0) {
        $("#depositError").css({"display":"none"});
        $("#depositErrorMsg").html('');
        $.post("https://fxbanking/doDeposit", JSON.stringify({
            amount: parseInt(amount)
        }));
        $("#depositAmount").val('')
    } else {
        $("#depositError").css({"display":"block"});
        $("#depositErrorMsg").html("You must type valid numbers to proccess a withdrawal payment!");
    }
})

$(document).on('click', "#initiateWithdraw", function(e) {
    var amount = $("#withdrawAmount").val();

    if (amount !== undefined && amount > 0) {
        $("#withdrawError").css({"display":"none"});
        $("#withdrawErrorMsg").html('');
        $.post("https://fxbanking/doWithdraw", JSON.stringify({
            amount: parseInt(amount)
        }));
        $("#withdrawAmount").val('')
    } else {
        $("#withdrawError").css({"display":"block"});
        $("#withdrawErrorMsg").html("You must type valid numbers to proccess a withdrawal payment!");
    }
})

$(document).on("click", "#log-out", function(e) {
    $("body").fadeOut(200);
    $(".sub-menu").css({"display":"none"});
    $.post("https://fxbanking/closeNUI", JSON.stringify({}));
})

$(document).on('click', '.sub-item', function(e) {
    var window = $(this).attr('id');

    $('.window').fadeOut(50);
    $('.sub-item').removeClass('active');
    $('.window#' + window).fadeIn(300);
    $('.sub-item#' + window).addClass('active');
})
