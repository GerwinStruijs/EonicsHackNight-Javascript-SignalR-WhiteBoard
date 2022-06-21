var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var canvasx = $(canvas).offset().left;
var canvasy = $(canvas).offset().top;
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;
var tooltype = 'draw';

$(canvas).on('mousedown', function (e) {
    last_mousex = mousex = parseInt(e.clientX - canvasx);
    last_mousey = mousey = parseInt(e.clientY - canvasy);
    mousedown = true;
});

$(canvas).on('mouseup', function (e) {
    mousedown = false;
});

var drawCanvas = function (prev_x, prev_y, x, y, clr) {
    ctx.beginPath();
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = clr
    ctx.lineWidth = 3;
    ctx.moveTo(prev_x, prev_y);
    ctx.lineTo(x, y);
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.stroke();
};

$(canvas).on('mousemove', function (e)
{
    mousex = parseInt(e.clientX - canvasx);
    mousey = parseInt(e.clientY - canvasy);
    var clr = $('select[id=color]').val()

    if ((last_mousex > 0 && last_mousey > 0) && mousedown) 
    {
        drawCanvas(mousex, mousey, last_mousex, last_mousey, clr);
        connection.invoke('draw', last_mousex, last_mousey, mousex, mousey, clr);
    }
    last_mousex = mousex;
    last_mousey = mousey;

    $('#output').html('current: ' + mousex + ', ' + mousey + '<br/>last: ' + last_mousex + ', ' + last_mousey + '<br/>mousedown: ' + mousedown);
});

var connection = new signalR.HubConnectionBuilder().withUrl('/draw')
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.on('draw', function (prev_x, prev_y, x, y, clr) 
{
    drawCanvas(prev_x, prev_y, x, y, clr);
});

async function start()
{
    try
    {
        await connection.start();
        console.log("SignalR Connected.");
    }
    catch (err)
    {
        console.log(err);
        setTimeout(start, 5000);
    }
};

start();


clearMousePositions = function () 
{
    last_mousex = 0;
    last_mousey = 0;
}