# ROE

> WIP: Some resize observer experiments and demos

<img width="1532" alt="ROE" src="https://user-images.githubusercontent.com/1457604/92539838-9e889e80-f23a-11ea-9742-9443e31acb48.png">

## Background an context

It's 1999, the web is in its infancy. Not everyone has a personal computer in their home, no matter a phone in their pocket. The average screen size is nearly guaranteed to be 640 by 480 pixels. Web design is treated like print design. You are given a fixed size canvas that you can draw shapes on.

Things are simple and life is good.

Screen sizes seem to be getting bigger and bigger but the 960px grid layout remains strong. Large gutters start appearing down the side of web cotent but no one really notices. No one expects websites scaling to fit the browser becuase it never has. We accept horizontal scroll willingly.

Then along comes the iPhone with it's fully fledged web browser rendering at a modest 320px.

Until then our 960px grid is more like a 1280px grid now. Things were getting bigger and bigger meant better! Then we get thown this curveball. How were we meant to adapt our layouts to fit within a third the size of even our defacto standard?!

This was the start of what we know today as "Responsive Web Design" but it would be nearly a decade until we understood what that really meant and embraced it fully.

### It's all a matter of perspective

For quite a long while there were two main approaches to web design on smaller devices like the iPhone:

- Ignore the problem entirely holding fast on your pixel perfect 960 grid design and insist that your users pinch to zoom.
- Start over entirely and develop a native app in a programming language only a select few people were expert in and expect your users to download the 200MB binary in order to read your blog post in a sensible font size.

It became apparent quite quickly, that neither of these solutions were that ideal. The former, screwed over the user and quite frankly made you look amateur, the latter limited your audience and was likely to make you hungry and homeless due to maintenance cost.

But we muddled though one way or another, the iPhone became popular and Apple became very rich; absolutely dominating the market and changing the way people consumed information forever. Once the dust settled, those who could afford it now had apps and those that couldn't, now had sub par web experiences on mobile. That was just how it was.

Then some pioneering web folk came up with an idea:

> What if, instead of building native apps, we build a dedicated interfaces for mobile devices on the web!

This seemed like a pretty good middleground and soon enough the internet was flooded with `http://m.something.com` whereby the `m` subdomain stood for mobile! Servers started user agent sniffing; if a request came from desktop, then serve the regular site, if the request came from mobile, then redirect to the mobile specific site which was optimized for smaller screens.

### One size fits all

Having a normal website and then a mobile specific site was all well and good for the user but it effectively doubled the workload for developers; they now had to maintain two sites instead of one! This would almost definitely work out cheaper and easier than maintaining a native app and at least now both the mobile and desktop interfaces were written in the same language. It certainly wasn't a bad idea.

It wasn't uncommon then to find in a single company with two dedicated web teams; one building for mobile and one building for desktop. It was mildly inconvenient, but manageable. It even surfaced some quite interesting mantras like "mobile first" and "progressive enhancement" which have stuck around even until this day.

Everything was rosy. But, then along came the iPad. Admittedly it looked nice, but it wasn't quite a desktop, wasn't quite a mobile device. Uh oh. Which version of the site design shall we serve to these iPad users!

It threw the whole industry into turmoil. Not even those who had opted for building and maintaining native apps were safe here. Apple apparently hadn't given much thought to the ramifications of introducing this new screen size to the ecosystem either. Their solution was embarrassingly rudimentary. It came in the form of a 2x button which essentially scaled up a mobile app proportionally to fill the space available on the larger screens. It was awful for a while.

The industry had already come to terms with the fact that they now had to design and develop seperate interfaces for mobile (small) and desktop (large) screens but the introduction of a "middle" sized screen suddenly made things more complicated. Employing another team to build a site dedicated to tablets surely wasn't realistic right? Do we need to create the `t` subdomain? If a third screen size could appear just like this, then what do we do when a fourth or a fifth size come along?

Hiring a team for every viewport ain't going to scale! Please, there _must_ be another way.

### Content is like water

Its late-naughties now and progress toward finding a solution to the polymorphic layout problem is slow and fragmented. Layouts were still inherently static, just like they had always been. We just maintain two of them now.

A paradigm shift was well overdue.

It's hard to put a finger on exactly when this happened but terms like flexible, liquid, fluid and elastic were being used to describe interfaces now. What did this mean?

Put simply, it meant using relative units of measure like percentages when designing user interfaces; a departure from absolute units like pixels we'd used for print like designs. We were succumbing to the cold hard truth that the size of the canvas we drew on could no longer be guaranteed standard issue (like paper sizes were in print design). What's more the canvase is resizable by the user during use; one could rotate their mobile device causing a portrait to landscape switch, or resize their browser window on desktop to use only half the horizontal space in order to arrange browsers side-by-side.

Relative units like percentages and ems had always existed in the CSS specification but weren't really necessary because viewports rarely changed size. But now they did.

Developers started to embrace more of a _constraint based layout_ mentality (a term later used by Apple). Whereby, instead of prescribing _exactly_ how some UI should be layed out on a page, we started assigning content tolerable bounds; things like maximum and minimum widths or automatic margins. After all, if you had a body of text layed out on a canvas, say 960px wide and then that same canvas was resized to 720px. Why wouldn't you want the text to adapt in response to the change, resizing itself in order to maintain a maximum width without overflowing the parent?

This seems obvious now but was revolutionary at the time. It seemed to alleviate the multitude of problems brought on by the ever growing array of viewport sizes that web sites and apps were expected to work on. Percentages allowed us to smooth over a lot of variation in viewport size, it was now possible to tween between two sizes – say desktop and landscape tablet – without hindering usability and without having to build two explicit layouts or having to worry about all the intermediate sizes too much either.

### Querying the media

Both mobile and desktop teams were now using percentages which gave their layouts a bit of wiggle room for when Apple or Samsung undoubtedly released their new flagship device which would usually introduce _yet another_ new aspect ratio to the mix. The would _flex_ slightly to make the most of available space.

There were limitations however.

Although using percentages and floating elements could get you so far. They couldn't bridge the vast differences between most of the dedicated mobile and desktop interfaces.

To demonstrate the problem, imagine a block of text and an image arranged horizintally side-by-side in a container, both set to take up 50% of the width. On a typical desktop viewport, let's say 1080px, this works great as both elements take up 540px. Then the viewport gets shrunk down to 640px, the image and the text are now 320px wide each. This is OK, but the design feeling a little awkward now; the image is maintaining its aspect ratio and so becoming visually smaller, whilst the text is forced to wrap over onto more lines and so is becoming taller. Shrinking the viewport any further horizontally is going to start redering the interface unusable.

> We needed a mechanism of being able to reorder, add and remove elements when the viewport is a certain size.

Someone somewhere must have actually read the CSS specification and realised that this was not such a novel request. In fact an API had existed since CSS2 that already did pretty much did exactly what we wanted; it was just triggered by a change in media type – print or screen – rather than viewport width and height generally, which is what we needed. Welcome to the stage **Media Queries**.

Around this time CSS3 was reaching maturity. Its release made it possible to apply styles when the viewport was a certain size (with `(min-size: 640px)`) or in a certain orientation (with `(orientation: landscape)`). This was absolutely mind blowing at the time.

As always, there were some developers reluctant (rightly or wrongly) to adopt or even try this new API. Eventually it caught on and the industry started to develop a set of standard (but a the same time, almost completely arbitrary) widths – often called breakpoints – which they would aim to adapt interfaces to and appropriate content for. What ended up becoming popularised was the term "adaptive design" which essentially meant, we acknowledge that people might be viewing our website on different sized viewports, so we will produce X amount of layout variations (usually 3) of our website, snapping to the design for the closest breakpoint.

Media queries were and still are actually pretty sufficient for traditional, single or two column style layouts often used for blogging or documenting. Snapping to an appropriate layout from a set of pre-defined options actually made it quite easy to implement, maintain and design content for. But now that we had the ability to reorder/add/remove content at runtime we were expected to create more and more intricate interfaces.

The _business_ was laughing a this point. They went from having two dedicated teams maintaining two codebases, down to one team who was exepected to _do it all_ from a single codebase. Designers and developers on the other hand, were probably sweating. Before all this happened the process of building UI wen't something like:

- Design pixel perfect UI on a fixed size canvas (mobile or desktop)
- Translate the print out design into HTML and CSS exactly
- Push to production

Now imagine having to check the UI you are implementing doesn't look broken at any point between the smallest and largest breakpoint. This was (and still kind of is) a QA nightmare.

### How long is a piece of rope

By now developers and designers had kind of got the hang of this Media Query thing. It was a lot of work to maintain and always felt quite fragile but nevertheless the `m` subdomains were dying a slow death. Instead, businesses would commonly opt for a "mobile first" approach to building interfaces on the web.

It had been established that on mobile (narrow portrait viewports) there is really only one way to lay things out and that is in one big column. Anyone who has worked under this mantra before will know that starting like this eliminates so much bull sh\*t. It forces the business/designer/developer to focus on the priority and quality of the content, rather than the positioning of the content. This baseline sets you up for success when adapting the interface to larger screens.. but it still wasn't always trivial to do and it required a lot of up forethought, something "the business" are famously reluctant to budget for.

So when reality hits, content comes in all shapes and sizes; it is often far from normalized no matter prioritized. Not many people consider this but it is the job of the frontend developer to deal with variadic mess of words and images and turn it into something sensical. So we condider it. Consider it a pain in the brain.

The problem wasn't the content per se but rather how verbose and difficult it is to maintain media queries en masse. Like much of CSS, media query declerations are global. By that I mean, you can't scope a media query to an element, you have to nest element styles inside of a media query like this:

```css
button {
  width: 100%;
}

@media (min-width: 640px) {
  button {
    width: 50%;
  }
}
```

It might not seem like it but this pattern becomes unweildly pretty fast. It feels like this should be possible:

```css
button {
  width: 100%;
  @media (min-width: 640px) {
    width: 50%;
  }
}
```

This makes much more sense in my head and is actually supported by a lot of CSS pre-processor like SASS and SCSS; which just rewrite the latter to the former at build time. Alas, it is not valid CSS. But the more you think about what a media query is, the more it makes sense why this kind of syntax wasn't standardised.

Firstly, nesting in CSS has never been a thing, this would mean making it a thing which is kind of a big deal. Secondly, `@media` uses the viewport as a reference, the outermost container of the whole document, the browser window. Does nesting this kind of logic really make sense? In the example above it is declared that, when a button is rendered on a screen less wide than 640px, then it should take up 100% width (kind of makes sense given that everything is likely to be stacked in a column in this context) but when a button is rendered on a screen wider than 640px it should take up 50% width. Wait, stop.. we just made a huge assumption right there, 50% of what exactly? Well, the window, obviously, you might be thinking. But what guarantees us that the button we are targetting, isn't a child of an element that has a media query associated with it already; perhaps which makes it 50% the width of its parent? If this is the case then the button is going to be 50% width of a 50% with which is actually 25% of the total width of the window. Oh dear.

> This is a silly example but hopefully it makes the point becuase its very hard to demonstrate

So this is where Media Queries break down, you can't nest them because in order to do so, you'd need to know not just the size of the viewport (the parent node of the whole document) but more specifically, the size of the parent (and often siblings) of the element you are targetting.

Turns out knowing only the size of the window is massively limiting. If you trying figure out how to get nesting working reliably with this model, then just trust me, it will cause you to end up in a recursive hell.

### Can't you just work it out

The fact that media queries didn't (or were extremely hard to) scale led to developers looking for smarter solutions to laying out content on a variable sized canvas. Quite conveniently at this time, along came flexbox. This was a new API which let us order and size collections of elements in ways that were weird and wonderful. It seemed to have some kind of intelligence of its own. It was much less prescriptive than media queries (which were all about _doing this at that moment_), they were way more _go with he flow_.

No longer did you need to tell a button to be 50% width when the screen size is 640px. It was more like "Hey, if you can share the space available in your container with your siblings, then go ahead, otherwise feel free to just plop yourself on the next line and take up all the space you like!". It is obviously a little more involved than that (it's not actual magic) but paired with media queries it opened up the doors to all kinds of responsive layouts.

You could instruct elements to "try be small" or "try be large" and to take into consideration things like _intrisic size_ and _size relative to siblings_ which was impossible with CSS up until now. It is a super powerful API but at the same time, it is very hard to configure and make guarantees about. This made flexbox less desirable to manage window level layout (which can be done with media queries) and more appropriate for nested elements where the size of the parent wasn't known.

Media queries and flexbox are two APIs that are insanely powerful when used in combination. Together they can probably cater to most of our layout need. In fact, nowadays we have more tools and techniques at our disposal than any of us could have ever dreamed of.. but boy is it still hard to get everything lined up nicely on every viewport. Seriously, it's _unbelievably difficult_.

It makes you wonder, why? What are we missing?

### A butterfly flaps its wings

Soon enough people started talking about _element queries_. That is what I will be exploring the feasibility of in this report.
