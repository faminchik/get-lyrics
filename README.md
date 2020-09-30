# Get Lyrics

Application for getting song lyrics and setting them to mp3 files.

---

## Demo

![DEMO](https://user-images.githubusercontent.com/31989569/94184398-835d9600-feac-11ea-92a9-4f0f45cc5568.gif)

## Used Services

-   **[Genius](https://genius.com/)** service **[API](https://docs.genius.com/)**
    This service is used for getting song lyrics.

-   **[node-id3](https://github.com/Zazama/node-id3)** library
    This [NodeJS](https://nodejs.org/) ID3 Tag library is used for setting song lyrics to mp3 files.

## Search Criteria

File name text is used as the main criterion. Text within brackets **(** **)** is omitted.

For instanсe:

`Imagine Dragons - Birds (Original Mix)` → `Imagine Dragons - Birds`

If the original file name didn't give the result or contains unwanted symbols, it's possible to modify the name within the application (for search purposes only).

![Demo2](https://user-images.githubusercontent.com/31989569/94721079-06279a80-035e-11eb-9fee-49237b16c9d0.gif)

## How To Use

TBD
