# Materials catalog app

This is an app that implements the PDF design doc.

It took about 5 hours to implement, but that's largely because I chose this as an opportunity to learn Material UI (given the theme of the project ☺).  I did this because I've been wanting to learn MUI, but never got to it, and because it would better reflect my ability to adapt to the new and unfamiliar.  If I'd done this using, say, tailwind and my own components, it'd likely have fallen within the alotted 3 hours.  But, you know, I was having fun, and I had until Monday.

I saw in the PDF that you use `lit`.  I'm tangentially familiar with `lit` via the `htm` method of component templating; it's the basis of my personal [`app-skeleton`](https://github.com/Fordi/app-skeleton) template, which targets using CDN and zero compilation.  So, that's a nice bonus: I'm familiar with the syntactical oddities and pitfalls involved.

## Architecture

I leveraged the `setupProxy` configuration endpoint of `create-react-app` to squeeze in a simple API server.  It's strictly in-memory.

The app is React+MUI, and I tried to follow the documentation as best as possible.


## Known issues

* The `color` field is just a dumb textbox with a color hint.  I wanted to do a full color picker, but couldn't find a good one in time, and didn't want to spend a lot of time making it.  It wasn't an _explicit_ requirement, so I figured I could get away with it.
* In the app, I have it updating the server on every keystroke.  I'm not really happy with that, for performance reasons, but I'd already run over time.
* No thousands separators in large numbers.  I know how to do this, roughly (I've done spaces in CC numbers), but there's a bunch of little interaction pitfalls in the text field, so I just didn't prioritize it.
* The UI doesn't exactly match the mockup.  For example, the input labels are Material's default - which looks good, but for a pro job, it would have to match the existing UI's design language.  There's also assorted chrome inconsistencies that I'd like to have fixed, like the list not stretching to its container and the container not scrolling when there are too many materials in the catalog.

