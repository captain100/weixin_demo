/**
 * Created by qiushi on 15/11/1.
 */
$(function(){
    $(".shijian").click(function(){
        var collpase = $(this).attr('data-href');
        //alert(collpase);
        $(collpase).collapse('toggle');
    })
});