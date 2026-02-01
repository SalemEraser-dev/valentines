// All JS lives here. Keep functions small and readable.
document.addEventListener('DOMContentLoaded', function(){
  setupHomePage();
  setupCelebrationPage();
});

// Setup handlers for home page avoidance and yes navigation
function setupHomePage(){
  var yes = document.getElementById('yesBtn');
  var no = document.getElementById('noBtn');
  if(!yes || !no) return;

  var threshold = 80; // proximity radius in pixels
  var padding = 16; // keep button fully visible from edges
  var movedOnce = false;

  // Navigate to celebration page on yes click
  yes.addEventListener('click', function(){
    window.location.href = 'celebration.html';
  });

  // Calculate center of element for distance checks
  function centerOf(el){
    var r = el.getBoundingClientRect();
    return { x: r.left + r.width/2, y: r.top + r.height/2 };
  }

  // Clamp helper
  function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }

  // Move the No button to a random position in the viewport while keeping it visible
  function moveNoToRandom(mouseX, mouseY){
    var rect = no.getBoundingClientRect();
    var btnW = rect.width; var btnH = rect.height;
    var vw = window.innerWidth; var vh = window.innerHeight;

    // If this is the first move, switch to fixed positioning so we can place anywhere
    if(!movedOnce){
      // set current position as fixed so the first move does not jump
      no.style.position = 'fixed';
      no.style.left = rect.left + 'px';
      no.style.top = rect.top + 'px';
      movedOnce = true;
    }

    // Compute allowed range for the top-left corner
    var minX = padding;
    var minY = padding;
    var maxX = Math.max(padding, vw - btnW - padding);
    var maxY = Math.max(padding, vh - btnH - padding);

    var attempts = 0; var newX, newY;
    do{
      newX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      newY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
      attempts++;
      // avoid picking a location very near the cursor if we have the coordinates
      if(!mouseX || attempts > 6) break;
    } while(Math.hypot((newX + btnW/2) - mouseX, (newY + btnH/2) - mouseY) < threshold + 40);

    // Apply the new position. CSS transition handles smooth movement
    no.style.left = newX + 'px';
    no.style.top = newY + 'px';
  }

  // Proximity check for mouse movement
  function onMouseMove(e){
    var c = centerOf(no);
    var d = Math.hypot(e.clientX - c.x, e.clientY - c.y);
    if(d < threshold){
      moveNoToRandom(e.clientX, e.clientY);
    }
  }

  // Touch support: move on touchstart near the button
  function onTouchStart(e){
    var touch = e.touches[0];
    if(!touch) return;
    var c = centerOf(no);
    var d = Math.hypot(touch.clientX - c.x, touch.clientY - c.y);
    if(d < threshold){
      // prevent the touch from triggering other actions
      e.preventDefault();
      moveNoToRandom(touch.clientX, touch.clientY);
    }
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('touchstart', onTouchStart, {passive:false});

  // Ensure the button has a transition for left and top
  no.style.transition = 'left 0.35s cubic-bezier(.2,.9,.2,1), top 0.35s cubic-bezier(.2,.9,.2,1), transform 0.16s ease';
}

// Celebration page: light confetti effect
function setupCelebrationPage(){
  if(document.getElementById('celebration') === null) return;

  // Create confetti pieces
  var colors = ['#ff577f','#ffb4c6','#ffd166','#ff6b6b','#9b5de5','#f15bb5'];
  var count = 80;

  for(var i=0;i<count;i++){
    createConfettiPiece(colors[i % colors.length]);
  }

  // small helper to create and animate a piece of confetti
  function createConfettiPiece(color){
    var el = document.createElement('div');
    el.className = 'confetti';
    el.style.background = color;
    var left = Math.random() * 100; // percent
    var size = 6 + Math.random()*12;
    el.style.left = left + 'vw';
    el.style.width = size + 'px';
    el.style.height = Math.floor(size * 1.6) + 'px';
    el.style.top = (-10 - Math.random()*20) + 'vh';
    var delay = Math.random() * 0.6;
    var dur = 2.6 + Math.random() * 2.2;
    el.style.animation = 'fall ' + dur + 's linear ' + delay + 's forwards';
    el.style.transform = 'rotate(' + (Math.random()*360) + 'deg)';
    document.body.appendChild(el);

    // remove after animation completes
    setTimeout(function(){
      if(el && el.parentNode) el.parentNode.removeChild(el);
    }, (delay + dur + 0.2) * 1000);
  }
}
