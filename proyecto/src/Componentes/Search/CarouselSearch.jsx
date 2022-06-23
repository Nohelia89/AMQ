import './CarouselSearch.scss'

// https://github.com/hmongouachon/rgbKineticSlider
const images = [
    "https://images.unsplash.com/photo-1636537511494-c3e558e0702b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
     "https://images.unsplash.com/photo-1468436385273-8abca6dfd8d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1705&q=80",
     "https://images.unsplash.com/photo-1493707553966-283afac8c358?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1508189860359-777d945909ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
   ];
   
   const texts = [
     ["Istanbul", "\"Take a greatest journey on your life\""],
     ["Amsterdam", "\"We take photos as a return ticket to a moment otherwise gone\""],
     ["Paris", "\"Traveling – it leaves you speechless, then turns you into a storyteller\""],
     ["Sweden", "\"Once a year, go someplace you’ve never been before\""]
   ];
   
   rgbKineticSlider = new rgbKineticSlider({
     slideImages: images,
     itemsTitles: texts,
   
     backgroundDisplacementSprite: "https://i.ibb.co/N246LxD/map-9.jpg", 
     cursorDisplacementSprite: "https://i.ibb.co/KrVr51f/displace-circle.png",
     cursorImgEffect: true,
     cursorTextEffect: true,
     cursorScaleIntensity: 0.65,
     cursorMomentum: 0.14,
   
     swipe: true,
     swipeDistance: window.innerWidth * 0.4,
     swipeScaleIntensity: 2,
   
     slideTransitionDuration: 1, // transition duration
     transitionScaleIntensity: 30, // scale intensity during transition
     transitionScaleAmplitude: 160, // scale amplitude during transition
   
    
     nav: true, // enable navigation
     navElement: ".main-nav", // set nav class
   
   
     imagesRgbEffect: true,
     imagesRgbIntensity: 0.9,
     navImagesRgbIntensity: 80,
   
     textsDisplay: true, 
     textsSubTitleDisplay: true, 
     textsTiltEffect: true,
     googleFonts: ["Playfair Display:700", "Roboto:400"],
     buttonMode: false,
     textsRgbEffect: true,
     textsRgbIntensity: 0.03,
     navTextsRgbIntensity: 15,
   
     textTitleColor: "white",
     textTitleSize: 125,
     mobileTextTitleSize: 80,
     textSubTitleColor: "white",
     textSubTitleSize: 21,
     mobileTextSubTitleSize: 16,
     textSubTitleLetterspacing: 2,
     textSubTitleOffsetTop: 90, 
     mobileTextSubTitleOffsetTop: 90
   });
   


function CarouselSearch() {


    return (

<div class="container">
        <div id="rgbKineticSlider" class="rgbKineticSlider"></div>
        <a href="#" class="menu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="4" y1="8" x2="40" y2="8" />
            <line x1="0" y1="16" x2="40" y2="16" />
          </svg>
        </a>
        <div class= "wrapper"></div>
        <div class="separator"></div>
        <div class="separator-text">Tours</div>
        <div class="ticket">
          <div class="ticket-list">
            <div class="ticket-text__wrapper">
              <span class="ticket-title">Country</span>
              <span class="ticket-subtitle">Italy</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
 <div>
 <nav>
  <a href="#" class="main-nav prev" data-nav="previous">
   <div class="slider prev">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
    </svg>
   </div>
  </a>
  <a href="#" class="main-nav next" data-nav="next">
   <div class="slider next">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
    </svg>
   </div>
  </a>
 </nav>
</div>
</div>
</div>

 )

} export default CarouselSearch;