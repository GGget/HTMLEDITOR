
export default (function(){
	/* app hide bottom sticky dock */   
    if (flash_fe_core_tool.$util.$coreMethods.isApp()) {
        $("body").find(".bottomStickyDock .compareDockContainer").hide();
        $("body").find(".commonFooter, .checkout_footer").css("padding-bottom","0");

    }
    /* back2top position override */
    flash_fe_core_tool.setBack2TopPosition = function () {
        let array = [{
                wrapper: ".cartBody",
                selector: ".cartBody .summaryTotal footer:visible"
            },
            {
                wrapper: ".pb_container",
                selector: ".pb_container .pb_footer.stickyBottom"
            },
            {
                wrapper: ".checkout_wrapper",
                selector: ".checkout_order_price_summary .placeOrder:visible"
            },
            {
                wrapper: ".CTO_Configurator",
                selector: ".CTO_Configurator .stickyBottom"
            },
        ];
        for (let index = 0; index < array.length; index++) {
            let item = array[index];
            if ($(item.wrapper).length != 0 && document.body.className.indexOf("pc_httl") == -1) {
                let currentSelector = $("body").find(item.selector);
                if( currentSelector.length != 0){
                    let stickHeight =  currentSelector[0].offsetHeight;
                    if (flash_fe_core_tool.$util.$coreMethods.isApp()) {
                        currentSelector.css("bottom","0");
                    }
                    $("body").find(".bottomStickyDock .back2top").css("top", "-" + (42 + stickHeight) + "px")
                }
            }
        }
    };
    flash_fe_core_tool.setBack2TopPosition();

    $(".bottomStickyDock").on("click", ".back2top", function () {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    })

    $(window).scroll(flash_fe_core_tool.$util.$func.throttle(()=>{
        var scrollTop = $(window).scrollTop();
        console.log(scrollTop)
        if (scrollTop > 500) {
            // if (scrollTop + windowHeight > scrollHeight - 200) {
            if ($(".back2top").css("display") == "none") {
                $(".back2top").show();
            }
        } else {
            if ($(".back2top").css("display") == "block") {
                $(".back2top").hide();
            }
        }
    },500)
    );
    // main function
    if (!flash_fe_core_tool.$util.$coreMethods.isApp()) {
        flash_fe_core_tool.$Api.getStoreInfo().then(x => {
            $(".compareDockContainer_phoneno").text(x.data.Store.SalesNumber || "");
            $(".compareDockContainer_cookie").attr("href",x.data.CMS.CookiesLink || "");
            $(".contactButton").attr("href","tel:"+x.data.Store.SalesNumber || "");
            if(x.data.CMS.StickyNavBarCookies == "1"){
                $("#compareDockContainer_cookie").css("display","flex");
                $(".compare").addClass("hasCookies");
            }
        })

        var sticky_dock_compare_tool = {
            checkShowCompare: function () {
                return flash_fe_core_tool.$CONSTANT.ON_OFF.COMPARE && !this.checkBlackList()
            },
            init: function () {
                $("main.main_content:last").after($(".bottomStickyDock"));
                //check compare
                if (this.checkShowCompare()) {
                    $(".compareDockContainer_compare_count").css({
                        display: "flex"
                    });
                    this.showOrHideVerticalLine(true);
                } else {
                    $(".compareDockContainer_compare_count").hide();
                    this.showOrHideVerticalLine(false);
                }
                //check sticky bar
                if (this.checkBlackList()) {
                    if (__TERMINAL__ == 2 || __TERMINAL__ == 3) {
                        $("#compareDockContainer_chatNow_telium").css("background-color", "#EFEFEF");
                    }
                }
            },
            showOrHideVerticalLine: function (isDisplay) {
                var border = isDisplay ? 1 : 0;
                $(".compareDockContainer_feedback_telium").css({
                    "border-right-width": border + "px"
                });
            },
            checkBlackList: function (name) {
                var array = [
                    flash_fe_core_tool.$CONSTANT.URL.BUY.CART.MAIN.substring(0, flash_fe_core_tool.$CONSTANT
                        .URL
                        .BUY.CART.MAIN.indexOf('.')),
                    flash_fe_core_tool.$CONSTANT.URL.BUY.CHECKOUT.MAIN.substring(0, flash_fe_core_tool
                        .$CONSTANT
                        .URL.BUY.CHECKOUT.MAIN.indexOf('.')),
                    flash_fe_core_tool.$CONSTANT.URL.BUY.THANKYOU.MAIN.substring(0, flash_fe_core_tool
                        .$CONSTANT
                        .URL.BUY.THANKYOU.MAIN.indexOf('.')),
                    flash_fe_core_tool.$CONSTANT.URL.CONFIGURATOR.DCG.MAIN.substring(0, flash_fe_core_tool
                        .$CONSTANT.URL.CONFIGURATOR.DCG.MAIN.indexOf('index.html')),
                    flash_fe_core_tool.$CONSTANT.URL.CONFIGURATOR.DCG.REDIRECT.substring(0,
                        flash_fe_core_tool
                        .$CONSTANT.URL.CONFIGURATOR.DCG.REDIRECT.indexOf('index.html')),
                    flash_fe_core_tool.$CONSTANT.URL.CONFIGURATOR.CTO.MAIN.substring(0, flash_fe_core_tool
                        .$CONSTANT.URL.CONFIGURATOR.CTO.MAIN.indexOf('index.html')),
                    flash_fe_core_tool.$CONSTANT.URL.CONFIGURATOR.PB.MAIN.substring(0, flash_fe_core_tool
                        .$CONSTANT.URL.CONFIGURATOR.PB.MAIN.indexOf('index.html'))
                ]
                var pathName = name ? name : window.location.pathname;
                var result = false;
                for (var index = 0; index < array.length; index++) {
                    var item = array[index];
                    if (pathName.indexOf(item) != -1) {
                        result = true;
                        break;
                    }
                }
                return result;
            },
            registerEvent: function () {
                $(".compareDockContainer_compare_count").on("click", function () {
                    if (flash_fe_core_tool.$adobe.comparePage) {
                        flash_fe_core_tool.$adobe.comparePage.stickyDock();
                    }
                    var url = flash_fe_core_tool.$CONSTANT.URL.COMPARE.MAIN;
                    flash_fe_core_tool.$util.$redirect.do(url);

                });
                $(".compareDockContainer_compare_count").keyup(function (event) {
                    if (event.keyCode == 13) {
                        $(this).click();
                    }
                });

            },
            setCompareCount: function (val) {
                if (this.checkShowCompare()) {
                    if (val == 0) {
                        $(".compareDockContainer_compare_count").hide();
                        this.showOrHideVerticalLine(false);
                    } else {
                        $(".compareDockContainer_compare_count").css({
                            display: "flex"
                        });
                        var countTxt = val > 9 ? ("9+") : (val + "");
                        $(".sticky_dock_compare_count").text(countTxt);
                        this.showOrHideVerticalLine(true);
                    }
                }
            }
        }

        flash_fe_core_tool.$customer_events.register(flash_fe_core_tool.$CONSTANT.CUSTOMER_EVENT_KEY.COMPARE,
            sticky_dock_compare_tool);

        sticky_dock_compare_tool.init();
        sticky_dock_compare_tool.registerEvent();
    }else{
        
    }
    flash_fe_core_tool.$lazyEvent.redirect("body");
    //check tele icon
    flash_fe_core_tool.$telePassport.checkTeleIcon();

})()

