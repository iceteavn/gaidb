jQuery(function ($) {
    $(".page-toc-shrinked").on("mouseenter", () => {
        const $pageTocExpanded = $(".page-toc-expanded");
        const adjustedHeight = $('body').height() - $('.header').height() - 20; // 見た目のバランスのため上下に10pxずつの隙間を入れる
        $pageTocExpanded.css('max-height', adjustedHeight).show(100);
    });
    $(".page-toc-expanded").on("mouseleave", () => {
        $(".page-toc-expanded").hide(100);
    });
    $(".page-toc-expanded a").on("click", () => {
        $(".page-toc-expanded").hide();
    });
});

