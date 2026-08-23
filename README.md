# Raat aur Pyaar

> A late-night music website inspired by the **Deluxe Saloon** trend — built for slow nights, moonlit views, and music.

**Live Demo:** https://nirant07.github.io/RaatAurPyaar/

## About

**Raat aur Pyaar** is a browser-based late-night music experience built with HTML, CSS, and JavaScript.

The site combines a cinematic night-time background with a custom music player powered by the **YouTube IFrame Player API**.

The goal of this project is not only to create a music website, but also to show how a simple static web project can be turned into an interactive experience.

## Features

* Custom late-night music player
* YouTube playlist playback
* Custom play, pause, previous, next, seek and volume controls
* Display of the currently playing track
* Visual playlist with thumbnails and channel names
* Support for entering a personal public YouTube playlist
* Fixed default playlist for the website
* Animated night-time background
* Responsive layout
* Custom scrollbar styling
* No backend required

## How It Works

The project is built using:

* **HTML** — page structure
* **CSS** — styling, layout, animations and responsive design
* **JavaScript** — player logic and playlist handling
* **YouTube IFrame Player API** — music playback and playlist control
* **GitHub Pages** — hosting

The website has a predefined playlist that loads whenever the page is opened.

Visitors can also enter their own public YouTube playlist URL. That playlist is used for the current session, while refreshing the page returns the site to the default **Raat aur Pyaar** playlist.

## Project Structure

```text
RaatAurPyaar/
│
├── index.html
├── style.css
├── script.js
├── night-lake.png
├── start-site.bat
├── README.md
└── LICENSE
```

### `index.html`

Contains the structure of the website, including the hero section, music player, playlist section and custom playlist input.

### `style.css`

Contains the visual styling, responsive layout, background effects, player styling, animations and scrollbar customization.

### `script.js`

Contains the YouTube player integration, playlist handling, player controls and custom playlist functionality.

### `night-lake.png`

The main background image used for the night-time experience.

### `start-site.bat`

A convenience script for starting the project locally on Windows.

## Run Locally

Clone the repository:

```bash
git clone https://github.com/Nirant07/RaatAurPyaar.git
```

Enter the project directory:

```bash
cd RaatAurPyaar
```

Start a local HTTP server:

```bash
py -m http.server 3000
```

Open:

```text
http://localhost:3000
```

### Why use a local server?

The YouTube IFrame Player API works more reliably when the website is served through HTTP rather than opened directly using a `file://` URL.

## Using Your Own Playlist

The website has a default playlist configured in JavaScript.

You can replace the default playlist ID in `script.js` with your own public YouTube playlist.

Visitors can also paste a public YouTube playlist URL into:

**"Want to listen to your own playlist?"**

and press **Enter**.

The entered playlist becomes the active playlist for that session. Refreshing the page restores the site's default playlist.

## Customization

You can easily customize the project by changing:

* Website name
* Background image
* Default YouTube playlist
* Colors
* Typography
* Music player styling
* Animations
* Playlist layout

The project is intentionally kept simple so that beginners can experiment with the design and functionality without needing a framework.

## YouTube Integration

This project uses the official **YouTube IFrame Player API** to embed and control YouTube videos and playlists.

The project does not download or redistribute music files. Audio/video playback is handled by YouTube's embedded player.

Individual YouTube videos may have restrictions on embedding or availability depending on the uploader, region or YouTube settings.

## Inspiration

This project was inspired by the growing trend of creating personalized late-night music websites similar in spirit to **Deluxe Saloon**.

The idea is simple:

> Create a small corner of the internet that feels like a place you would visit late at night.


## License

This project is licensed under the **MIT License**.

See the [`LICENSE`](LICENSE) file for details.

## Author

**Nirant07**

GitHub:
https://github.com/Nirant07
