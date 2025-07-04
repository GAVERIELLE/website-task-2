console.log('Script loaded');

const slider = document.querySelector('.slider');
const btnLeft = document.getElementById('slide-left');
const btnRight = document.getElementById('slide-right');
const dots = document.querySelectorAll('.slider-dots .dot');

const scrollAmount = 300;
const slideWidth = 320;

function setActiveDot(index) {
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
}

function updateActiveDot() {
  const scrollIndex = slider.scrollLeft / slideWidth;

  let dotIndex;
  if (scrollIndex < 1.5) dotIndex = 0;
  else if (scrollIndex < 3.5) dotIndex = 1;
  else dotIndex = 2;

  setActiveDot(dotIndex);
}

btnLeft.addEventListener('click', () => {
  slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  setTimeout(updateActiveDot, 500);
});

btnRight.addEventListener('click', () => {
  slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  setTimeout(updateActiveDot, 500);
});

slider.addEventListener('scroll', () => {
  updateActiveDot();
});

dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => {
    let slideTo;
    if (idx === 0) slideTo = 0;
    else if (idx === 1) slideTo = 2 * slideWidth;
    else slideTo = 4 * slideWidth;

    slider.scrollTo({ left: slideTo, behavior: 'smooth' });
  });
});

updateActiveDot();

const autoScrollDelay = 3000; 
function autoScroll() {
  if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
    slider.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
  setTimeout(updateActiveDot, 600);
}
setInterval(autoScroll, autoScrollDelay);
