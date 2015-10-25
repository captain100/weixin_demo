/**
 * Created by qiushi on 15/10/25.
 */
$(function() {
    $('.sub_btn').click(function(){
        var paperId = $('#paperId').val();
        var userAccount = '12345';
        var taskNo = 'xyz123';
        var answers =[];
        for(var i = 0;i<$('.radio_wrap').length;i++){
            var id = $('.radio_wrap')[i].getAttribute('data-questionid');
            var value = $('input:radio[name='+id+']:checked').val();
            var location = $('input:radio[name='+id+']:checked').attr('data-location');
            var answer ={
                "questionId": id,
                "value": value,
                "location": location

            }
            answers.push(answer);
        }
        var data = {
            'userAccount':userAccount,
            'taskNo':taskNo,
            'paperId':paperId,
            'answers':answers
        }
        $.get('/subPaper',{data:data},function(e){
            console.log(e);
        })

    });
});