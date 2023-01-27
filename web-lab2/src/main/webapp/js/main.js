$(function (){
    window.history.pushState({}, document.title, "/web-lab2-2.0/");

    let point_canvas = document.getElementById("point");
    let canvas = document.getElementById("myGraph");
    let savedCanvas = document.getElementById("savedPoint");
    let ctx = canvas.getContext("2d");
    let point_ctx = point_canvas.getContext("2d");
    let saved_ctx = savedCanvas.getContext("2d");
    point_ctx.fillStyle = "#fff";
    ctx.font = "bold 14px Roboto";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px Roboto";
    saved_ctx.fillStyle = "#ffffff";
    saved_ctx.font = "bold 14px Roboto";
    ctx.fillText("R", 155, 15);
    ctx.fillText("-R", 155, 295);
    ctx.fillText("-R",  10, 140);
    ctx.fillText("R", 285, 140);
    ctx.fillText("R/2", 155, 85);
    ctx.fillText("-R/2", 155, 225);
    ctx.fillText("-R/2",  75, 140);
    ctx.fillText("R/2", 215, 140);

    let x_value_validate = false;
    let y_value_validate = false;
    let r_value_validate = false;
    let x_value = null;
    let y_value = null;
    let r_value = null;
    let adr = null;
    let x = null;
    let y = null;
    let rect;

    function checkNum(n){
        return !isNaN( parseFloat(n) && isFinite(n))
    }
    function checkRange(min,max,num){
        if(checkNum(num)){
            return num > min && max > num
        }
        else{
            return false;
        }
    }
    function validateForm(){
        return x_value_validate && y_value_validate && r_value_validate
    }


    $('.x-value').click("input[type='radio'][name='xVal']",function(){

        const input = $(this);
        const is_Num = checkRange(-4,6,input.val().replace(',','.'));
        if(is_Num){
            x_value = $(this).val();
            x_value_validate = true;
            if(r_value && y_value){
                draw(x_value,y_value,r_value);
                $('#submit').removeAttr('disabled');

            }
        }
        else{
            $('#submit').attr('disabled','disabled');
            x_value_validate = false;
            x_value = null;
        }

    })

    $("#y-value").on('input',function(){
        const input = $(this);
        const is_Num = checkRange(-5, 5, input.val().replace(',','.'));
        if(is_Num){
            input.removeClass("invalid-input").addClass('valid-input')
            y_value = $(this).val();
            y_value_validate = true;
            if(r_value && x_value){
                draw(x_value,y_value,r_value);
                $('#submit').removeAttr('disabled');
            }
        }
        else{
            input.removeClass('valid-input').addClass('invalid-input')
            $('#submit').attr('disabled','disabled');
            y_value_validate = false;
            y_value = null;
        }
    })
    $('.r-value').click("input[type='radio'][name='rVal']",function(){
        // const r_array = [1,2,3,4,5];
        const input = $(this);
        const is_Num = checkRange(0,6,input.val().replace(',','.'))
        ctx.clearRect ( 0 , 0 ,300 , 300 );
        if(is_Num){
            adr = 140/r_value;
            r_value = $(this).val();
            r_value_validate = true;
            ctx.fillText(r_value, 155, 15);
            ctx.fillText(r_value, 155, 295);
            ctx.fillText(r_value,  10, 140);
            ctx.fillText(r_value, 285, 140);

            ctx.fillText(r_value/2, 155, 85);
            ctx.fillText(r_value/2, 155, 225);
            ctx.fillText(r_value/2,  75, 140);
            ctx.fillText(r_value/2, 215, 140);
            saved_ctx.stroke();
            clearAllPoint();
            drawAllFilterPoint(r_value);
            point_ctx.stroke()
            if(x_value && y_value){
                draw(x_value,y_value,r_value)
                $('#submit').removeAttr('disabled');
            }
        }
        else{
            $('#submit').attr('disabled','disabled');
            r_value_validate = false;
            r_value = null;
        }
    })

    function getCursorPosition(point_canvas, event) {
        rect = point_canvas.getBoundingClientRect()
        x = event.clientX - rect.left
        y = event.clientY - rect.top
    }

    point_canvas.addEventListener('mousedown',function(e){
        if(!r_value_validate){
            $('.error').addClass("invisible")
        }
        else{
            $('.error').removeClass("invisible")
        }
    })

    point_canvas.addEventListener('mousemove', function(e) {
        getCursorPosition(point_canvas, e)
        if(r_value_validate){
            clearPoint()
            drawPoint(x,y);
            point_canvas.addEventListener('mouseleave',function(e){
                clearPoint()
                draw(x_value,y_value,r_value)
                x_value = null;
                y_value = null;
                x_value_validate = false;
                y_value_validate = false;

            })
            point_canvas.addEventListener('mousedown',function(e){
                y_value = -(y-150)/adr
                y_value_validate = true;
                $('#submit').removeAttr('disabled');
            })
        }
    })
    $("#point").click(function(){
        $("#submit").click();
    })
    function clearPoint(){
        point_ctx.beginPath();
        point_ctx.clearRect(0,0,point_canvas.height ,point_canvas.width );
        point_ctx.closePath();
    }
    function clearAllPoint(){
        saved_ctx.beginPath();
        saved_ctx.clearRect(0,0,point_canvas.height ,point_canvas.width );
        saved_ctx.closePath();
    }

    function draw(x_value,y_value,r_value){
        point_ctx.beginPath();
        point_ctx.clearRect(0,0,point_canvas.height ,point_canvas.width );
        point_ctx.closePath();
        adr = 140/r_value;
        point_ctx.beginPath();
        point_ctx.arc(150+parseInt(x_value*adr),150-parseFloat(y_value*adr),2,0,2 * Math.PI, false)
        point_ctx.fill();
        point_ctx.closePath();
    }

    function drawPoint(x,y){
        adr = 140/r_value;
        let x_nearest = nearestX(x,adr)
        point_ctx.beginPath();
        point_ctx.arc(x_nearest,y,2,0,2 * Math.PI, false)
        point_ctx.fill();
    }

    function nearestX(x,adr){
        let j = 0;
        let xValues = []
        for( let i=10; i<=290; i=i+adr){
            xValues[j] = i;
            j++;
        }
        const output = xValues.reduce((prev, curr) => Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev);
        x_value = xValues.indexOf(output) - (xValues.length - 1)/2
        x_value_validate = true;
        return output
    }

    const timezone = new Date().getTimezoneOffset();
    $("#clear-btn").click(function(){
        $.ajax({
            url:'process',
            type: 'GET',
            data:{
                clear:$(this).val(),
            },
            success: function (data){
                $("#table-body").load(location.href + " #beans");
                clearAllPoint();
            },
            error: function(jqxhr,status,exception) {
                alert(exception);
            }
        })
    })
    $('#submit-form').submit(function(event) {
            if (validateForm()) {
                $('.error').removeClass("invisible");
                $.ajax({
                    url:'process',
                    type: 'GET',
                    data:{
                        xVal: x_value, yVal:y_value, rVal: r_value, timezone: timezone
                    },
                    success: function (data){
                        // drawFilterPoint(x_value,y_value,r_value);
                        $("#table-body").load(location.href + " #beans");
                        drawFilterPoint(x_value,y_value,r_value)
                    },
                    error: function(jqxhr,status,exception) {
                        alert(exception);
                    }
                })

            }
             else {
                 $('.error').addClass("invisible");
            }
            event.preventDefault();
        }
    )
    function drawFilterPoint(x_v, y_v,r_v){
        r_adr = 140/r_v;
        saved_ctx.beginPath();
        saved_ctx.arc(150+parseInt(x_v*r_adr),150-parseFloat(y_v*r_adr),2,0,2 * Math.PI, false);
        saved_ctx.fill();
        saved_ctx.closePath();
    }
    function drawAllFilterPoint(filtered_r_value){
        $("#result-table tr").each(function(){
            if(parseInt($(this).find('td').eq(2).html()) == filtered_r_value){
                let x_val = $(this).find('td').eq(0).html()
                let y_val = $(this).find('td').eq(1).html()
                let r_val = $(this).find('td').eq(2).html()
                s_adr = 140/r_val;
                saved_ctx.beginPath();
                saved_ctx.arc(150+parseInt(x_val*s_adr),150-parseFloat(y_val*s_adr),2,0,2 * Math.PI, false);
                saved_ctx.fill();
                saved_ctx.closePath();
            }
        })
    }

});
