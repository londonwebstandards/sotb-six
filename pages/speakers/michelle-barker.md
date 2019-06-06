---
title: Michelle Barker
description: Super-powered Layouts with CSS Grid and CSS Variables
speaker:
  lastname: Barker
  website: https://css-irl.info
  twitter: mbarker_84
  image: michelle-barker.jpg
  bio: |
    <p>Michelle is a Creative Front-end Developer at <em>Mud</em>, a leading digital agency in Bath, UK, where she is known unofficially as the Queen of Grids. She is a regular blogger on all things CSS on her personal site <em>CSS { In Real Life }</em>, and has written articles for <em>Smashing Magazine</em>, <em>the Pastry Box</em> and <em>Vandelay Design</em>.</p>
lastmod: 2019-06-06
private: false
layout: speaker.hbs
order: 1
ogImage: /images/cards/michelle-barker.png
talk:
  links:
    - link: https://codepen.io/michellebarker/pen/eLZwVg
    - link: https://codepen.io/michellebarker/pen/wEdjqX
    - link: https://codepen.io/michellebarker/pen/gdrVXP
    - link: https://codepen.io/michellebarker/pen/YOqmjP
    - link: https://codepen.io/michellebarker/pen/YOQLLZ
    - link: https://codepen.io/michellebarker/pen/OobJaa
    - link: https://codepen.io/michellebarker/pen/OobJqr
    - link: https://codepen.io/michellebarker/pen/MXXQRq
    - link: https://codepen.io/michellebarker/pen/rKKdBP
    - link: https://codepen.io/michellebarker/pen/NzYbVO
    - link: https://codepen.io/michellebarker/pen/XBPMZZ
    - link: https://codepen.io/michellebarker/pen/xabrLv
    - link: https://gridbyexample.com
    - link: https://css-irl.info/
    - link: http://layout.land/
    - link: http://mozilladevelopers.github.io/playground/css-grid
  youtube: hq3hDKD4H98
  transcript: |
    Cool.
    There we go.
    So, hi, everyone, my name is Michelle, I am a front end developer at Mud, a digital agency based in Bath.
    Today I want to talk about CSS grid and CSS variables or custom properties which are two relatively new specs which are really shaking things up in the CSS world right now and have got me pretty excited about web design and development.
    So I am going to start with CSS grids or the CSS grid layout module level 1 to give it its full title.
    How many of you are already using CSS grids or have started using it a little bit?
    Okay, that is more than half of you.
    That is really good.
    So I am going to cover a few of the CSS grid basics for those who aren't using it just yet, but hopefully for those who are pretty comfortable with it there will be a few useful things later on in the talk as well and hopefully earlier on in the talk, who knows?
    So what is exciting about CSS grid?
    Well it's the first specification we have really had that has actually designed for two-dimensional layout.
    This question comes up quite a lot.
    Why not just use flexbox?
    Well, a lot of existing grid systems out there use flexbox and I have been using flexbox for quite a while to code layout because it's really the best thing we have had available to us until now.
    Flexbox is great at what it does, which is allowing us to define a one-dimensional layout, but CSS grid is different, it allows us to define a two-dimensional space and it allows us complete control of our layouts.
    So with grids new layouts are probably that we have never really seen on the web before and have never really been possible without using JavaScript.
    Jen Simmons who is one of the key players in the CSS grid world and has done a lot of work towards getting the spec implemented and supported and teaching people about grid has coined the term intrinsic web design to describe the next evolutionary stage from responsive design, which CSS grid is enabling us to produce.
    So with intrinsic web design, rather than having the kind of old responsive design patterns, where we are just kind of stacking things as we get to smaller view ports, intrinsic web design is a bit more fluid.
    We might have some fixed track sizes and flexible tracks and we can make things collapse and expand at different rates, it really allows kind of a more nuanced approach to layout and I think that is pretty exciting and I am really exciting to see what is going to be produced over the next few years.
    Before I carry on, I want to refer to some of the terminology I am going to be using in this talk.
    So a grid is, contain elements with the display property sector grid and that is the container on to which we are placing our items.
    So it's one HTML element, any direct children of that grid can be grid items.
    Tracks I am referring to rows and columns.
    Cells are the places where row and column intersect.
    So they are the smallest unit on to which we can place an item.
    Grid areas are groups of more than one cell in a rectangular area, so somewhere where we might want to place an item spanning multiple rows or tracks.
    Gutters so the gaps between tracks are commonly referred to as gutters, they are described by the grid column gap and grid row gap properties.
    So let's define our first grid.
    We have selected a class of grid, we are setting that as display grid and we are using grid template columns and rows to describe our grid.
    In this case we are producing 4x4 lay out and each column has a fixed track size of 200 pixels wise and each row has a fixed height of 150 pixels.
    One note about my slides, on the bottom right hand corner I am including links to relevant demos and I will publish these slides afterwards if anyone wants to dig into the code any more.
    As we have seen, the grid column gap and grid row properties give us our gutters, which are both to pixels in this case.
    So we have a grid that looks like this.
    But it's not responsive yet, say if we jump back to the code there is quite a lot of repetition there, so we can cut down on that.
    We can use the repeat function, so we have four tracks of equal size on the column access and the row access to it takes two arguments, the first one is the number of tracks and the second one is the delete size.
    We have 4 row tracks 150 pixels high.
    We can also use the shorthand grid template, it's fine to do here, we have a short declaration, this keeps our code more concise, but some, I don't tend to do this too much because some of the grid declarations can get quite long and wordy, so personally I find it's easier to keep grid template rows and grid template columns separate, but it completely depends on the project.
    We can also use grid gap as the shorthand, for row gap and grid column app in the case I can use pixels.
    The next thing to use the grid responsive we can use flexible units instead of fix track seizing, here with the fr unit, a new unit exclusive to grid, and what that does is it allows us to define tracks that take up a proportion of the available space, taking things like gutters into account.
    So, with grid there, actually there isn't really much need to use percentage sizes and calc, because the fr unit does a lot of the heavy lifting for us.
    This grid will be four columns each taking up an equal proportion of the available space.
    Just to give you an example of that in action.
    If we have three columns each of those 200 pixels wide and one column one fr unit, we get something like this.
    The first three columns are fixed width and the fourth column is taking up all of the remaining space.
    So, in grid we can define explicit tracks which are defined with our grid template rows and columns' properties, we can also define implicit tracks.
    So we can do this with grid auto-rows and auto-columns.
    And sometimes you don't know the number of items you want to place on your layout so you don't know how many tracks your grid needs.
    For example, if you are creating a news feed you might be wanting to add items into that all the time.
    You don't know how long that's going to be.
    So grid auto-rows allows us to define the height of any newly created tracks which are created when we place items on to our grid.
    The default value for that is auto.
    In some cases we may want to set it, we may not, probably a news feed is not great example, quite often you may want to make the rows the height of your content.
    But if you have an image gallery for example you might want to create each of those new rows at a fixed size.
    So this is what our grid looks like, but it is actually invisible, because it hasn't got any content in it yet.
    You can inspect it in the browser, and I recommend FireFox DevTools for doing that partly developed by Jen Simmons, that allows us to inspect the grid and see where items are placed, which tracks they are on, it has a really good grid inspector.
    There are a few different ways to place items on our grid.
    This is our basic mark-up that we are using, we have a div with a classic grid and three items.
    The first way to place items is with auto-placement, if we don't do anything further, those items will be auto-placed, they will take up the first three available cells.
    Sometimes that is desirable behaviour, like the news feed example I mentioned.
    But let's imagine we want to build a simple page layout.
    We have similar mark-up again, a div with a class grid and three item, a header, a main element and an aside, now we are going to place those items by grid line, grid line are numerical lines that sit between each track, we can reference the numbers to place items on the grid.
    So in this case we're placing our header using the grid column start and grid column end properties, starting at line one and ending at line five.
    Which gives us this.
    We don't need to use grid row start and grid row end because those grid items will automatically take up one track unless we otherwise define them.
    We can also place our main and aside elements in a similar way, in this case we do need to use grid row start and end because they will take up more than one track.
    That gives us the layout we want.
    But, the codes, again, are quite long and wordy, we can make this more concise.
    The grid column is the shorthand, for grid column start and end, and likewise with grid row, that would be grid row start and end.
    So that makes our code a bit shorter.
    With the aside elements we don't need to place that by grid column, that is the only available column so it will be auto-placed in that column, but we do need to define how many rows we want it to take up.
    Here I'm using the span key word instead of an end line.
    With the span key word I can just say I want this item to span two rows and I don't need to specify a start and end line, that is pretty useful.
    So just to run through some of the possible values for our grid column and grid row properties, we can have a start line and an end line.
    We could have span and auto-placement, so we just want it to gran three columns, we can have a start line and span and one thing to note here is if we placed it at grid line four and had a plan of three, that would generate implicit tracks on the column access, we would end up with more columns in our grid than we actually want.
    Which, in this case would just break our layout.
    We can have span and an end line.
    Sometimes it is really useful to place items by end line rather than start line.
    The other way that we can place items is by naming lines.
    So in this grid declaration I have line names, header start, main start, main start and header end, it looks confusing if you are not that familiar with grid.
    What I'm basically doing is this, I'm naming line one header start and main start, that is where both of those elements start, I'm naming line four main end, and I'm naming line five header end.
    Now, you can use any names for your lines, but if you suffix those line names with start and end, you get a grid area.
    Which means we can do this, so we can just say put our header in the header area, put our main in the main area, which is kind of nice.
    There's one more method of placing items that I want to mention, that is using the grid template areas property.
    This allows us to basically draw our grid with text.
    So in this case I'm using h for header and m for main, a or aside, any blank cells you can use a full stop or blank space, and you can use, you don't need to use single letters, you can use full word, so header or main or you know triangle, it won't be a triangle, that is a stupid example.
    That was literally the first word that came into my head.
    So you can call them whatever you want, you can't call them numbers as I found out to my detriment, one fact.
    So this can be quite useful, it's not something I tend to use super-often, but for some people this is one of the major selling points of grid for them.
    I can see why, it does make things really clear where you need to position them.
    Then when it comes to placing our item, all we need to do is reference that area, nice and easy.
    Now on to CSS variables and custom properties, I refer to them as variables because they behave like variables in JavaScript, that adds up in my brain, I see them referred to more and more now as custom properties, I can see why and I might have to call them that now as well.
    You are probably familiar with variables if you are using one of the preprocessors, but CSS variables are not the same, they can't be used interchangeably.
    One of the difference is SAS and let variables are compiled in the preprocessing stage before your code hits the browser, CSS variables are in the browser.
    They can't be used for media queries, only CSS property values, hence known as custom properties.
    CSS variables are dynamic variables, once they are set their value isn't fixed, we can update them in CSS and JavaScript.
    To use a JavaScript analogy, preprocessor variables are a bit like const, so once you set them that's it, that's what the variable is.
    Whereas CSS variables are more like let, they can be scoped to component or selector.
    This is how we declare a variable, and in declaring this variable bgColour on the root element, the equivalent to the HTML element but higher specificity, this is creating a global variable, you don't need to declare your variables on root, sometimes it is more useful to scope them with the selector.
    This is how we use that variable in this component with the class of my component.
    The background colour of this component will be red.
    One thing that's really handy to do with CSS variables is to set defaults, so I'm giving this component, my components a background colour of bgColour, if that variable can't be found, it has not been designed yet, then the background colour will be orange, and if my component is the last child I'm actually defining that variable bgcolour as red, for the last child background colour will be red.
    That is simple, there is a slightly better example here, I have a box which I'm doing exactly the same thing with, I'm saying I want this box to have background colour of bgColour, if bgColour can't be found then I want it to be orange.
    Then in this purple selector I'm assigning bgColour with the value of RebeccaPurple, in the code on the left, if I just have a box on its own it will be orange, in the code on the right if I have a box inside this purple selector it's going to be RebeccaPurple, because I have scoped that variable to the purple selector.
    So, now, I'm going to talk about combining CSS variables with CSS grid, variables can make complex layouts easier to manage.
    The first way to do that is by managing complex grid declarations.
    This is a grid declaration that I wrote for a component that I built at Mud, the agency I work with, it is for Warner Brothers studios, a project we worked on, as you can see the grid template columns and grid template rows properties have got long.
    I'm using quite a usual lined names, I'm also using, it is a tiny four column grid, which is insane, nobody should use 24 columns in their grids, in my opinion.
    I'm also using the minmax function, which I just want to divert into a little bit, because minmax function is another really useful function in grid, and that basically does be exactly what it says, it allows you to define a minimum size and a maximum size for your tracks.
    And what this is doing here is, I have 24 columns, which will have a minimum size of zero and a maximum size of 30 pixels, they will basically form the central wrapper area, they will grow to 30 pixels and no longer.
    Then I have a flexible column either side of that which will expand to fill up all the available space in the view port.
    What that means is we can place items on the grid to a central wrapper used throughout the site and we can also place item that is break out and fill the view port, or align to the edge of the view port if we want to.
    That is super handy, I also have a blog post on it, I can link to that in one of the later slides as well.
    So, going back to how CSS variables can help us with these crazy complicated grid declarations.
    If I want to update any of these grid template columns and grid template rows' properties, then I basically need to write out that whole declaration all over again, which can end up getting quite messy in your CSS file, make the code quite complex to go through and debug.
    So, what I can do is I can define some variables for in this case the column width and the gutter width.
    What this means is say after 1600 pixels I want to make our columns that bid wider, in the central wrapper area, and I also want larger gutters as well, so after 1600 pixels I'm changing the column width and gutter variables.
    And then I pass those variables into our template column and grid gap declarations and that means I don't need to write that media query within the grid component.
    That is already done for us and I don't need to write that grid declaration all over again.
    So that is nice.
    I learnt this after I built 700 line SAS file for this component, so I kind of wish I had realised it earlier.
    Another way variables can help us is by managing component variants.
    To use another example we have this article, we have a figure and a classic grid text.
    So we are building a simple text and image component, we have an image on the left and text on the right.
    In the background you can see hopefully the column outlines and that is just for illustration purposes.
    That also shows what I mean with the min max function and the max function wrapper, those two columns either side will be expanding to fill the available space in the view port and the central columns will stay as a max width.
    So that is our grid declaration, it's a bit like the one we saw previously, expect a little bit simpler, we only have 12 columns for one thing, which is nicer.
    I am naming the grid lines and also the wrapper start and end lines so we can place things on that max width wrapper.
    And this is how I am placing my items on that grid, so I am using a mixture of line names and numbers and span keyword.
    The reason I am using the span keyword for text elements is because in my component variance which was the inner moment I want the text block to remain spanning the same number of columns for each one, I want some various other stuff, but I want to keep that the same.
    That is a really good way of making sure that, when you are placing things by start line and end line it can get confusing as to do I need to place it on this line or that line, but I want this to be the same as the previous one.
    Span keeps that cleaner because I want to span for regardless of where I position it.
    So these are the different component variants I want to build for the different layouts.
    So the first one is the same as the layout we have already built and then we have three different variants.
    I am using the same underlying grid and most of the same CSS, but I just want to place the items on the grid slightly differently.
    So what I can do here is I can use variables for the grid column property on each of these grid items.
    So for the image I want it to start at the image start value, but if that can't be found then I want it to start at wrapper start and spanning whatever the image span value is, but if not, start at 6 and I am doing a similar thing with the text component.
    This means that if I don't declare the variables, the defaults would be used which is the values we had in our initial component.
    Then to create those different variants all I need to do is update the variables.
    So grid C, the last one, I don't need to change, I only need to change the image span variable because everything else is being, is the same, it's just going to be like a narrower image or wider, I can't remember.
    So I think that is a quite nice of managing variance.
    It means that we can keep our grid code a little bit cleaner and it means we can avoid using descendant's selectors or creating new classes for styling our grids.
    We can just pass the variable in, declare the variable at the component level and it will be scoped to that component.
    This is quite a simple example, so it doesn't save us loads of lines of code, but in my experience once we have got all the other styling mixed in and you have like at supports if you want to provide fallbacks for your grid lay out this helps to keep the code clean and easy to debug.
    I will just show you a quick demo of the lay outs in action, hopefully.
    So then we have our four different component variants.
    There will be a link to this demo on the slide so you can dig into the code if you want to.
    There we go.
    So just one more thing I want to talk about, CSS variables and JavaScript.
    Updating CSS variables with JavaScript allows us some quite interesting creative possibilities.
    To get the property value we use get computer style and get property value and the variable name.
    That returns a string is one thing to mention, so for the demo I am about to show you I am converting that to a number, or to an integer in order to perform calculations on it.
    To set the property values, element style and set property and your variable name and the value you want to set it to, so it's not a million miles away from any other CSS property.
    So I am just going to show you this quick demo, not that one.
    So this is CSS grid background generator that I made specifically for the purpose of creating some nice backgrounds for my slides.
    So when you click the generate layout button, the variables for each of those trialled items the start line and the span values will be updated with a random number so we are going to get random layouts.
    I am also using variables for the CSS blur filter so they will be blurred to a different degree and if you hit click colour shuffle you can change up the gradient randomly and that is generating random variables for the hue in the HSL colour function in my linear gradient.
    In the code on the side you can see, as and you probably can't see from there, but I will send you the link anyway.
    So the code on the side is showing us what those computed variables are going to be each time I change them.
    So, just to wrap up, if you are interested in knowing more about CSS grid here are some links to some great resources.
    Rachel Andrew and Jen Simmons are like the CSS grid people and have written and talked about everything to do with CSS grid, so anything they make I can really recommend, Rachel Andrew has grid by example which has a lot of articles and examples of layouts you can build with grid and Jen Simmons has Layout Land YouTube channel which goes into lots of different aspects of CSS layout, MDN is full of great resources as well and my own blog, CSS in real life I have some great articles about using variables and CSS grid and the min max function that I talked about earlier.
    That is everything from me, thanks for listening and here is my Twitter as well.
---

CSS Grid Layout has the ability to transform the way we build layouts on the web and has made things possible that were never possible before. I’ll provide an overview of the various methods for building layouts with CSS Grid and demonstrate how it can help us construct complex components.

I’ll discuss how CSS Variables (custom properties) can bring even more power to our CSS and give us finer control over our responsive grids, and how these dynamic variables can be changed in CSS and Javascript to afford some exciting possibilities.
