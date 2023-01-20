import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"


export default function ImageSlider({ gig }) {
  const slides = [
    { url: `${gig.imgUrl[0]}`, title: '1' },
    { url: `${gig.imgUrl[1]}`, title: '2' },
    { url: `${gig.imgUrl[2]}`, title: '3' }
  ]
  
  return  <Carousel className="details-carousel">
  <div>
      <img src={slides[0].url} />
  </div>
  <div>
      <img src={`${slides[1].url}`} />
  </div>
  <div>
      <img src={`${slides[2].url}`} />
  </div>
</Carousel>

  
}
