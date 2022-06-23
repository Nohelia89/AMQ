
function CorouselSearch() {


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

} export default CorouselSearch;