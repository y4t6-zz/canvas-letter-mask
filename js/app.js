window.onload = function()  {
  var canvas = document.querySelector('#canvas');
  var ctx = canvas.getContext('2d');
  var letterScale = 1;
  var mousePos;
  var originPosX = 1;
  var mousePosX = 0;
  var mousePosY = 0;

  var originImage = document.querySelector('#originImageHorizontal');
  var scaledImage = document.querySelector('#imageScaled');
 
  canvas.setAttribute('width', document.body.clientWidth);
  canvas.setAttribute('height', window.innerHeight);

  var canvasSize = getCanvasSize(canvas);
  var imageSize = getImageSize(originImage);

  loop();

  document.body.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(canvas, evt);
    if ( evt.target.getAttribute('id') == 'canvas' && mousePos.x > 10 ) {
      var vector = mousePos.x - originPosX;
      var damping = vector/200;
      if (vector > -200 && vector < 200) {
        changingPosX = mousePos.x - damping*80;
      } 
    }
  }, false);

  window.onresize = function(event) {
    canvas.setAttribute('width', document.body.clientWidth);
    canvas.setAttribute('height', window.innerHeight);   
    canvasSize = getCanvasSize(canvas);
    imageSize = getImageSize(originImage);
    
    changingPosX = getLetterPosX();

    letterScale = canvasSize.height / 100;
    drawImage( doesAlignByHeight(canvas, originImage) ); 
    ctx.save();
    drawLetter();
    ctx.clip();
    drawImage( doesAlignByHeight(canvas, originImage), 90, scaledImage); 

    ctx.restore();
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
    //ctx.filter = 'blur(2px)';
    ctx.clip();
    drawImage( doesAlignByHeight(canvas, originImage), 90, scaledImage ); 

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
  function drawImage(doesAlignByHeight, scale, scaledImage) {
    if (doesAlignByHeight) {
      var newHeight = canvasSize.height;
      var newWidth = newHeight * imageSize.width / imageSize.height;
      var posX = -(newWidth - canvasSize.width) / 2;
      var posY = 0;

      if(scale) {
        scaleAndDrawImage(newWidth, newHeight)
      } else {
        ctx.drawImage(scaledImage || originImage, posX, posY, newWidth, newHeight);
      }
       
    } else {
      var newWidth = canvasSize.width;
      var newHeight = newWidth * imageSize.height / imageSize.width;
      var posX = 0;
      var posY = -(newHeight - canvasSize.height);
       
      if(scale) {
        scaleAndDrawImage(newWidth, newHeight)
      } else {
        ctx.drawImage(scaledImage || originImage, posX, posY, newWidth, newHeight);
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
      ctx.drawImage(scaledImage || originImage, dx, dy, newWidth, newHeight);
    }
  }
  function getLetterPosX() {
    return canvasSize.width * 3 / 10;
  }
  originPosX = getLetterPosX();
  
  var changingPosX = originPosX;

  function drawLetter() {
    var scale = letterScale;
    var posX = changingPosX;
    
    //var posY = mousePosY || 0;
    var posY = 0;
    letterScale = canvasSize.height / 100;

    ctx.beginPath();
    ctx.moveTo(0*scale + posX, 3.4*scale + posY);
    ctx.lineTo(0*scale + posX, 100*scale + posY);
    ctx.lineTo(16.5*scale + posX, 100*scale + posY);
    ctx.lineTo(16.5*scale + posX, 3*scale + posY);
    ctx.lineTo(30.2*scale + posX, 3*scale + posY);
    ctx.quadraticCurveTo(52*scale + posX, 3*scale + posY, 56*scale + posX, 24*scale + posY);
    ctx.quadraticCurveTo(57*scale + posX, 28*scale + posY, 56*scale + posX, 37*scale + posY);
    ctx.quadraticCurveTo(52*scale + posX, 56*scale + posY, 34*scale + posX, 57*scale + posY);
    ctx.lineTo(19*scale + posX, 57*scale + posY);
    ctx.lineTo(19*scale + posX, 58*scale + posY);
    ctx.lineTo(21*scale + posX, 60*scale + posY);
    ctx.lineTo(34*scale + posX, 60*scale + posY);
    ctx.quadraticCurveTo(66*scale + posX, 60*scale + posY, 72*scale + posX, 39*scale + posY);
    ctx.quadraticCurveTo(74*scale + posX, 30*scale + posY, 72.8*scale + posX, 24*scale + posY);
    ctx.quadraticCurveTo(68*scale + posX, 2*scale + posY, 35*scale + posX, 0*scale + posY);
    ctx.lineTo(-9.8*scale + posX, 0*scale + posY);
    ctx.lineTo(-9.8*scale + posX, 1*scale + posY);
    ctx.lineTo(0*scale + posX, 3.4*scale + posY);

    //ctx.stroke();
  }
}
