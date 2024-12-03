document.addEventListener("DOMContentLoaded", () => {
  const customSelect = document.querySelector(".custom-select");
  const selected = customSelect.querySelector(".select-selected");
  const options = customSelect.querySelector(".select-options");

  selected.addEventListener("click", () => {
    options.style.display =
      options.style.display === "block" ? "none" : "block";
  });

  options.addEventListener("click", (e) => {
    if (e.target.dataset.value) {
      selected.textContent = e.target.textContent;
      options.style.display = "none";
    }
  });

  document.addEventListener("click", (e) => {
    if (!customSelect.contains(e.target)) {
      options.style.display = "none";
    }
  });
});
const cardsWrapper = document.querySelector(".import__cards_desk");

if (cardsWrapper) {
  for (let i = 1; i <= 30; i++) {
    const card = document.createElement("div");
    card.classList.add("import__card_item");
    cardsWrapper.appendChild(card);
    const img = document.createElement("img");
    img.src = "../images/IBS__letters_icon.png";
    img.alt = "Card Image";
    img.classList.add("import__card__item_img");
    card.appendChild(img);
  }
} else {
  console.error("Элемент .import__cards_wrapper не найден на странице.");
}

//   // Массив с путями к изображениям
//   const imageSources = [
//     "../images/IBS__icon.png",
//     "../images/smc__icon.png",
//     "../images/alabuga__icon.png",
//     "../images/integration__icon.png",
//     "../images/softline__icon.png",
//   ];

document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.querySelector(".slider__container");
  const prevButton = document.querySelector(".slider__button--prev");
  const nextButton = document.querySelector(".slider__button--next");

  const slidesData = [
    "../images/IBS__icon.png",
    "../images/smc__icon.png",
    "../images/alabuga__icon.png",
    "../images/integration__icon.png",
    "../images/softline__icon.png",
  ];

  let currentIndex = 0;
  let isMoving = false;
  let autoScrollInterval;

  function createSlides() {
    slidesData.forEach((slide) => {
      const slideElement = document.createElement("div");
      slideElement.classList.add("slider__slide");
      slideElement.style.backgroundImage = `url(${slide})`;
      sliderContainer.appendChild(slideElement);
    });
  }

  function getSlideWidth() {
    return sliderContainer.querySelector(".slider__slide").offsetWidth;
  }

  function moveToNextSlide() {
    if (isMoving) return;
    isMoving = true;

    currentIndex = (currentIndex + 1) % slidesData.length;
    sliderContainer.style.transition = "transform 0.8s ease";
    sliderContainer.style.transform = `translateX(-${getSlideWidth()}px)`;

    sliderContainer.addEventListener(
      "transitionend",
      () => {
        const firstSlide = sliderContainer.firstElementChild;
        sliderContainer.appendChild(firstSlide);
        sliderContainer.style.transition = "none";
        sliderContainer.style.transform = "translateX(0)";
        isMoving = false;
      },
      { once: true }
    );
  }

  function moveToPrevSlide() {
    if (isMoving) return;
    isMoving = true;

    currentIndex = (currentIndex - 1 + slidesData.length) % slidesData.length;

    const lastSlide = sliderContainer.lastElementChild;
    sliderContainer.prepend(lastSlide);
    sliderContainer.style.transition = "none";
    sliderContainer.style.transform = `translateX(-${getSlideWidth()}px)`;

    setTimeout(() => {
      sliderContainer.style.transition = "transform 0.8s ease";
      sliderContainer.style.transform = `translateX(0)`;
    }, 0);

    sliderContainer.addEventListener(
      "transitionend",
      () => {
        isMoving = false;
      },
      { once: true }
    );
  }

  // Автопрокрутка
  function startAutoScroll() {
    autoScrollInterval = setInterval(moveToNextSlide, 5000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  function resetAutoScroll() {
    stopAutoScroll();
    startAutoScroll();
  }

  // Инициализация слайдера
  createSlides();
  startAutoScroll();

  // Обработчики событий
  nextButton.addEventListener("click", () => {
    document.querySelector(".arrow_prev").style.fill = "#1d1d1d33";
    document.querySelector(".arrow_next").style.fill = "#1d1d1d";
    moveToNextSlide();
    resetAutoScroll();
  });

  prevButton.addEventListener("click", () => {
    document.querySelector(".arrow_prev").style.fill = "#1d1d1d";
    document.querySelector(".arrow_next").style.fill = "#1d1d1d33";
    moveToPrevSlide();
    resetAutoScroll();
  });

  // Остановка автопрокрутки при наведении
  sliderContainer.addEventListener("mouseenter", stopAutoScroll);
  sliderContainer.addEventListener("mouseleave", startAutoScroll);
});
