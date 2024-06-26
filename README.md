# mwSlider
This collection of sliders can be added to any parent element by simple adding the class 'mwSlider' to build a slider. Then all the direct children elements will automatically be used as the slides to transition between. You can also chose how you want them to transition and add other functionality by again adding classes to the parent. Simple.

**A FADING SLIDER**
To add a fading transition to your slider simply add the additional class of `mwFade` to the sliders parent element:
`<div class="mwSlider mwFade">`

**A SCROLLING SLIDER**
To add a scrolling transition to your slider simply add the additional class of `mwScroll` to the sliders parent element:
`<div class="mwSlider mwScroll">`

**A TICKER SLIDER**
To add an infinitely scrolling transition (with a pause on hover function) to your slider simply add the additional class of `mwTicker` to the sliders parent element:
`<div class="mwSlider mwTicker">`

**ADD AUTOMATIC TRANSITIONING**
To make any 'Fading Slider' or 'Scrolling Slider' automatically transition, simply add the additional class of `mwAuto` to the sliders parent element:
`<div class="mwSlider mwFade mwAuto">`
It can be used on a 'Fading Slider' like above or a 'Scrolling Slider' like below:
`<div class="mwSlider mwScroll mwAuto">`

**ADD A PAUSE ON HOVER**
To make any 'Fading Slider' or 'Scrolling Slider' pause transition when hovering over a slider, simply add the additional class of `mwAutoPause` to the sliders parent element:
`<div class="mwSlider mwFade mwAutoPause">`
It can be used on a 'Fading Slider' like above or a 'Scrolling Slider' like below:
`<div class="mwSlider mwScroll mwAutoPause">`

As many sliders as you need can be added to a page and you can also run any of the different slider types also on the same page, however the 'Auto Transitioning' and the 'Pause on hover' functionalities shouldn't be added to the same slider. It should only be one or the other as the 'Pause on hover' functionality already assumes the slider should be automatically transitioning so is built with that functionality already and unexpected behaviour may occur if both are used together.  
