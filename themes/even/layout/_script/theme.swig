<script type="text/javascript" src="{{ url_for('js/src') }}/even.js?v={{ theme.version }}"></script>
<script type="text/javascript" src="{{ url_for('js/src') }}/bootstrap.js?v={{ theme.version }}"></script>
<script type="text/javascript">
$(function(){
    const imgs = $("img").filter(function() {
        return this.src.match(/.*\.sinaimg\.cn\/.*/);
    });
    for (let i = 0; i < imgs.length; i++) {
        let img = imgs[i];
        $(img).attr('referrerpolicy', 'no-referrer');
    }
    console.log(`Removed referrer header for ${imgs.length} sina weibo images.`);
});
</script>