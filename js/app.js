window.onload = function()  {
  var canvas = document.querySelector('#canvas');
  canvas.setAttribute('width', document.body.clientWidth);
  canvas.setAttribute('height', window.innerHeight);
  var ctx = canvas.getContext('2d');
  var mousePos;
  var mousePosX = 0;
  var mousePosY = 0;
  var originImage = document.querySelector('#originImageHorizontal');
  //var originImage = document.querySelector('#originImageVertical');
  var canvasSize = getCanvasSize(canvas);
  var imageSize = getImageSize(originImage);

  loop();

  document.body.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(canvas, evt);
    mousePosX = mousePos.x - 200;
    mousePosY = mousePos.y - 200;
  }, false);

  window.onresize = function(event) {
    canvas.setAttribute('width', document.body.clientWidth);
    canvas.setAttribute('height', window.innerHeight);   
    canvasSize = getCanvasSize(canvas);
    imageSize = getImageSize(originImage);
  };
  
  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  function loop() {
    requestAnimationFrame(loop);

    drawImage( doesAlignByHeight(canvas, originImage) ); 
    ctx.save();
    drawLetter();
    ctx.filter = 'blur(1px)';
    ctx.clip();
    drawImage( doesAlignByHeight(canvas, originImage), 30 ); 

    ctx.restore();
  }
  function getCanvasSize(el) {
    return {
      height: el.scrollHeight,
      width: el.scrollWidth
    }  
  }
  function getImageSize(el) {
    return {
      height: el.naturalHeight,
      width: el.width
    }
  }
  function doesAlignByHeight() {
    return ( canvasSize.width / canvasSize.height < imageSize.width / imageSize.height) ? 
      true :      
      false; 
  }
  function drawImage(doesAlignByHeight, scale) {
    if (doesAlignByHeight) {
      var newHeight = canvasSize.height;
      var newWidth = newHeight * imageSize.width / imageSize.height;
      var posX = -(newWidth - canvasSize.width) / 2;
      var posY = 0;

      if(scale) {
        scaleAndDrawImage(newWidth, newHeight)
      } else {
        ctx.drawImage(originImage, posX, posY, newWidth, newHeight);
      }
       
    } else {
      var newWidth = canvasSize.width;
      var newHeight = newWidth * imageSize.height / imageSize.width;
      var posX = 0;
      var posY = -(newHeight - canvasSize.height);
       
      if(scale) {
        scaleAndDrawImage(newWidth, newHeight)
      } else {
        ctx.drawImage(originImage, posX, posY, newWidth, newHeight);
      }
    }

    function scaleAndDrawImage(width, height) {
      var newWidth = width + scale; 
      var newHeight = newWidth * height / width;
      var dx = posX - scale/2;

      if(doesAlignByHeight) {
        var dy = posY - (newHeight - height)/2;
      } else {
        var dy = posY - (newHeight - height);
      }
      ctx.drawImage(originImage, dx, dy, newWidth, newHeight);
    }
  }
  function drawLetter() {
    var scale = 3;
    var posX = mousePosX || 200;
    var posY = mousePosY || 100;
    
    ctx.beginPath();
    ctx.moveTo(0 + posX, 0 + posY);
    ctx.lineTo(0 + posX, 400 + posY);
    ctx.lineTo(50 + posX, 400 + posY);
    ctx.lineTo(50 + posX, 200 + posY);
    ctx.lineTo(100 + posX, 200 + posY);
    ctx.quadraticCurveTo(200 + posX, 200 + posY, 200 + posX, 100 + posY);
    ctx.quadraticCurveTo(200 + posX, 0 + posY, 100 + posX, 0 + posY);
    ctx.lineTo(50 + posX, 0 + posY);
    ctx.lineTo(50 + posX, 50 + posY);
    ctx.lineTo(100 + posX, 50 + posY);
    ctx.quadraticCurveTo(150 + posX, 50 + posY, 150 + posX, 100 + posY);
    ctx.quadraticCurveTo(150 + posX, 150 + posY, 100 + posX, 150 + posY);
    ctx.lineTo(50 + posX, 150 + posY);
    ctx.lineTo(50 + posX, 0 + posY);
    ctx.lineTo(0 + posX, 0 + posY);
  }
}
