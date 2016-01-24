
# AnimeOpenings

Simple wrapper for openings.moe. 

![Screenshot 1](https://raw.githubusercontent.com/cnandreu/animeopenings/master/screenshots/screenshot1.png)

This project not affiliated in any way with openings.moe. The icon used for the application is from [Anime Icons Pack 6 of 6](http://exo-02.deviantart.com/art/Anime-Icons-Pack-6-of-6-157430877) by [EXO-02](http://exo-02.deviantart.com/).

# How to download

* Go to the [releases page](https://github.com/cnandreu/animeopenings/releases).
* Download `AnimeOpenings-darwin-x64.zip`.
* Extract and move `AnimeOpenings.app` to your `Applications` folder.
* Right click the recently moved file and hit "Open".
* FYI - [Fix the “App can’t be opened because it is from an unidentified developer” Error in Mac OS X](http://osxdaily.com/2012/07/27/app-cant-be-opened-because-it-is-from-an-unidentified-developer/)

# Features

* Native container (no need to find it in a sea of tabs!).
* Global mac media keys support for Play/Pause and Next Track.
* Native notifications when song changes.
* Remembers window position.
* Runs in the background when closed (use `⌘+Q` or `AnimeOpenings > Quit` to kill).

# How to run

* `git clone [this repository]`
* `cd animeopenings`
* `npm install`
* `npm start` (if you want to run as a developer)
* `npm run build` (if you want to build the application, built files will be inside `animeopenings/build`)

You will need [Node.js and npm](https://nodejs.org/en/). This application is built with [Electron](http://electron.atom.io/#get-started).
