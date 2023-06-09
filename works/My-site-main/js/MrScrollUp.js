﻿var video_player = [];

function pageInit() {
    menuSelected = 3;
    if (video_player[0]) {
        loadPlayer(video_player[0][0], video_player[0][1], video_player[0][
            2
        ], video_player[0][3])
    }
}

var upAnimate = false;
var anim_time = 500;
var anim_time_short = (anim_time == 0) ? 0 : 350;
var scroll_animate = false;
var menuSelected = false;
var domStart = new Date();

function culculateDomRedy(a) {
    domStop = new Date();
    loadTime = (domStop.getTime() - domStart.getTime());
    if (console) {
        logStr = (a) ? a + " " : "";
        logStr += (loadTime < 1000) ? "cache =>" : "full refresh =>";
        console.log((logStr + loadTime))
    }
}
var rocketFireTimer = false;
var rocketFireState = [0, 0, 0, 1];
var rocketFireFrameLength = 149;
var rocketFireFrameStart = 298;
var rocketFireAnimateTime = 100;
var toLeftFireAnimation = false;

function rocketFireAnimate() {
    for (i = 0; i < rocketFireState.length; i++) {
        if (rocketFireState[i] == 1) {
            rocketFireState[i] = 0;
            if (!toLeftFireAnimation) {
                if ((i + 2) < rocketFireState.length) {
                    rocketFireState[i + 1] = 1
                } else {
                    rocketFireState[0] = 1;
                    toLeftFireAnimation = true
                }
            } else {
                if ((i - 1) < 0) {
                    rocketFireState[1] = 1
                } else {
                    rocketFireState[i - 1] = 1;
                    toLeftFireAnimation = false
                }
            }
            break
        }
    }
    $("#MrScrollUp .MrScrollUp1").css({
        "background-position": "-" + (rocketFireFrameStart + (i *
            rocketFireFrameLength)) + "px 0px",
        display: "block"
    });
    rocketFireTimer = setTimeout("rocketFireAnimate()",
        rocketFireAnimateTime)
}

function initScrollTop() {
        $("#MrScrollUp div.MrScrollUp2").hover(function() {
            $(this.parentNode.children[0]).stop().fadeTo(500, 1);
        }, function() {
            if (upAnimate || scroll_animate) {
                return;
            };
            $(this.parentNode.children[0]).stop().fadeTo(500, 0);
        });
        $("#MrScrollUp div.MrScrollUp2").click(function() {
            scroll_animate = true;
            $("#MrScrollUp .MrScrollUp1").css({
                "background-position": "-298px 0",
                display: "block"
            });
            op = $("html, body");
            rocketFireTimer = setTimeout("rocketFireAnimate()",
                rocketFireAnimateTime);
            op.animate({
                scrollTop: 0
            }, "slow", function() {
                scroll_animate = false;
                if (!upAnimate) {
                    upAnimate = true;
                    thisTop = $("#MrScrollUp")[0].offsetTop +
                        250;
                    $("#MrScrollUp").animate({
                        "margin-top": "-=" +
                            thisTop + "px"
                    }, 300, function() {
                        resetScrollUpBtn()
                    })
                }
            })
        });
        window.onscroll = function() {
            if ((!scroll_animate) && (!upAnimate)) {
                body_elem = $("body")[0];
                window_elem = $("html")[0];
                if (window.innerHeight) {
                    wind_height = window.innerHeight;
                    wind_scroll = window.scrollY
                } else {
                    wind_height = document.documentElement.clientHeight;
                    wind_scroll = getScrollY()
                }
                elem = $("#MrScrollUp")[0];
                scrollBtn = $("#MrScrollUp")[0];
                if ((elem) && (scrollBtn)) {
                    if ((scrollBtn.style.display == "none") && ((
                        wind_height * 0.5) < wind_scroll)) {
                        scroll_animate = true;
                        $("#MrScrollUp").fadeIn(anim_time, function() {
                            scroll_animate = false;
                            this.style.display = "block"
                        })
                    }
                    if ((scrollBtn.style.display == "block") && ((
                        wind_height * 0.5) > wind_scroll)) {
                        scroll_animate = true;
                        $("#MrScrollUp").fadeOut(anim_time, function() {
                            scroll_animate = false;
                            this.style.display = "none"
                        })
                    }
                }
            }
        }
}

function resetScrollUpBtn() {
    $("#MrScrollUp .MrScrollUp1").css({
        "background-position": "-149px 0px",
        display: "none"
    });
    $("#MrScrollUp").css({
        "margin-top": "-125px",
        display: "none"
    });
    upAnimate = false;
    clearTimeout(rocketFireTimer)
}

function load_on_load() {
    pageInit();
    menuSelected = (menuSelected) ? menuSelected : 0;
    initScrollTop()
}
$(document).ready(function() {
    load_on_load()
});