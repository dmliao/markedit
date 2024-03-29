function initLayout() {
    $(document).ready(function(){
        $("body").layout({applyDemoStyles: true,
            center__onresize:       "middleLayout.resizeAll",
            north: {
                closable: false
            },
            south: {
                closable: false
            }
        }
        );
        middleLayout = $('.ui-layout-center').layout({
            applyDemoStyles: true,
            center__paneSelector:   ".middle-center",
            north__paneSelector:   ".middle-north"
        });
    });
}