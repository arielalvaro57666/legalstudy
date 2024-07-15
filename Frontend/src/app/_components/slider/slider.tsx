import React from 'react';
import HeroSlider, { Slide } from 'hero-slider';


export function Slider(){

    return (
        <HeroSlider
        className='2xl:h-[30rem] xl:h-[20rem] h-[20rem] shadow-orange-300 shadow-sm opacity-50'
        height={"100%"}
        autoplay
        controller={{
            initialSlide: 1,
            slidingDuration: 500,
            slidingDelay: 100,

        }}
        
        >


            <Slide

                label="Bogliasco - Italy"
                background={{
                backgroundImageSrc: '/static/header/header3.jpg'
                }}
            />

            <Slide
                
                label="County Clare - Ireland"
                background={{
                backgroundImageSrc: '/static/header/header2.jpg'
                }}
            />

            <Slide

                label="Crater Rock, OR - United States"
                background={{
                backgroundImageSrc: '/static/header/header1.jpg'
                }}
            />


        </HeroSlider>
    );
};

export default Slider;


