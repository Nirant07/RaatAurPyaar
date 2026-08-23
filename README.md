# Raat aur Pyaar — Build a Deluxe Saloon-Style Music Website

> A practical tutorial and starter project for building a **late-night music website inspired by the Deluxe Saloon / saloon.wtf style**, using HTML, CSS, JavaScript, and the YouTube IFrame Player API.

**Live Demo:** https://nirant07.github.io/RaatAurPyaar/

![Raat aur Pyaar](night-lake.png)

## What Is This Project?

**Raat aur Pyaar** is a complete example of how to build a personalized, atmospheric music website from scratch with standard web technologies.

The theme used in this repository is **Raat aur Pyaar**, a moonlit late-night concept. The important part is the architecture: you can keep the same functionality and create your own theme, branding, visuals, colors, and story.

This repository is intended to be both:

- a finished project you can explore, and
- a learning resource for building your own **Deluxe Saloon-style music website**, **late-night music site**, or **YouTube playlist player**.

You do not need a frontend framework to follow this project.

## What You Will Learn

- Build a full-screen visual music website with HTML and CSS.
- Create a custom music-player interface.
- Integrate the **YouTube IFrame Player API**.
- Play tracks from a public YouTube playlist.
- Display playlist tracks dynamically.
- Build custom play, pause, previous, next, seek, and volume controls.
- Let visitors enter their own public YouTube playlist.
- Keep a fixed default playlist while allowing a visitor to temporarily use another playlist.
- Create a cinematic animated background using CSS and JavaScript.
- Build custom scrollbars and responsive layouts.
- Deploy a static website with **GitHub Pages**.

## Inspiration

This project was inspired by the growing trend of minimalist music websites and experiences such as **Deluxe Saloon** and **saloon.wtf**.

It is **not an official Deluxe Saloon project, clone, or affiliated website**.

The purpose is to understand the design ideas and technical building blocks behind this type of experience and then create an original implementation.

The same architecture can be adapted to:

- late-night radio
- rainy-night music
- retro music lounge
- cyberpunk radio
- bedroom playlist
- lo-fi station
- romantic music site
- road-trip playlist
- personal music room

Raat aur Pyaar is simply one example.

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and content |
| CSS3 | Layout, styling, effects, animations and responsive design |
| JavaScript | Player logic, playlist handling and interactions |
| YouTube IFrame Player API | Embedded YouTube playback and playlist control |
| GitHub Pages | Static website hosting |

No React, Vue, Angular, Node.js backend, database, or server-side application is required for the current version.

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

Contains the website structure, including the site header, hero section, music player, custom playlist input, playlist section, and footer.

### `style.css`

Controls the layout, typography, colors, player appearance, playlist appearance, responsive behavior, animated background layers, and scrollbar styling.

### `script.js`

Handles YouTube player initialization, playlist loading, track navigation, player controls, progress updates, volume controls, playlist rendering, visitor playlist input, and restoring the default playlist.

### `night-lake.png`

The main visual used for the night-time background.

### `start-site.bat`

Optional Windows helper for launching the local development server.

### `LICENSE`

The project is distributed under the MIT License.

## How the Website Works

The architecture is intentionally simple:

```text
                 Raat aur Pyaar
                       │
          ┌────────────┴────────────┐
          │                         │
     Custom UI                 YouTube API
          │                         │
          │                 ┌───────┴────────┐
          │                 │                │
     Music Player        Default         Visitor
                         Playlist        Playlist
```

The website controls the **visual experience**, while YouTube provides the actual playback.

The default playlist is configured in JavaScript and is loaded whenever the page is opened.

A visitor can enter a different public YouTube playlist. That becomes the active playlist for the current visit. Refreshing the page returns the experience to the fixed default playlist.

## Visitor Playlists

One of the main features of this project is the custom playlist input.

A visitor can paste a public YouTube playlist URL into **“Want to listen to your own playlist?”** and press **Enter**.

The website then:

1. Reads the playlist ID from the URL.
2. Loads the new playlist.
3. Uses it as the active playlist for the current visit.
4. Updates the music player.
5. Updates the playlist section.
6. Changes the displayed playlist title to the visitor's playlist title.

Refreshing the page restores the site's fixed default playlist.

## Build a Similar Website From Scratch

### Step 1 — Create the HTML structure

Start with the page, hero, music player, custom playlist input, and playlist sections.

### Step 2 — Build the visual identity

Choose your own background, colors, typography, site name, player color, buttons, spacing, and playlist layout.

### Step 3 — Add the YouTube IFrame Player API

Use the API as the playback engine while keeping the surrounding interface completely custom.

### Step 4 — Load a playlist

Use a public YouTube playlist and connect it to the player.

### Step 5 — Render the playlist

Display track number, thumbnail, title, channel, and a play action for each item.

### Step 6 — Add visitor playlists

Listen for the `Enter` key in the playlist URL input, extract the playlist ID, and load it as the active playlist.

### Step 7 — Add atmosphere

Layer subtle effects such as moving clouds, mist, water shimmer, leaves, gradients, grain, and glow.

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

Then open:

```text
http://localhost:3000
```

On Windows, `start-site.bat` can also be used as a convenience launcher.

### Why use a local HTTP server?

The YouTube IFrame Player API can behave differently when a page is opened directly with a `file://` URL. Serving the site over HTTP gives it a normal web origin and more closely matches production behavior.

## Deploy With GitHub Pages

This is a static website, so it can be deployed directly from GitHub.

1. Create a public GitHub repository.
2. Upload the project files.
3. Keep `index.html` in the repository root.
4. Open **Settings → Pages**.
5. Select **Deploy from a branch**.
6. Select `main` and `/ (root)`.
7. Save.

For this repository, the project-site URL is:

https://nirant07.github.io/RaatAurPyaar/

## Customize the Project

### Change the site name

Replace `Raat aur Pyaar` in `index.html` with your own branding.

### Change the background

Replace `night-lake.png` with your own image and update the CSS reference if necessary.

### Change the default playlist

Find the default playlist ID in `script.js` and replace it with your own public YouTube playlist ID.

### Change the player theme

Edit the player colors and control styling in `style.css`.

### Change the playlist layout

The playlist can be redesigned into rows, cards, grids, radio queues, or any other layout you prefer.

## YouTube Notes

This project uses the **YouTube IFrame Player API** for playback.

The project does **not** download, extract, or redistribute music files. Playback remains handled by YouTube's embedded player.

Individual videos can have different availability or embedding restrictions depending on the uploader, region, or YouTube settings.

## Search-Friendly Learning Resource

This repository is intentionally documented around the broader learning goal rather than only the name **Raat aur Pyaar**.

It is useful for people searching for topics such as:

- how to build a Deluxe Saloon-style website
- how to make a saloon.wtf-style music website
- how to create a late-night music website
- how to build a music player website with HTML CSS JavaScript
- how to build a YouTube playlist website
- how to use the YouTube IFrame Player API
- how to make a custom music player with JavaScript
- how to create a personalized playlist website

The Raat aur Pyaar theme is simply the example implementation.

## Screenshots and Demo

### Raat aur Pyaar

![Raat aur Pyaar night music website](night-lake.png)

**Live Demo:** https://nirant07.github.io/RaatAurPyaar/

**Source Code:** https://github.com/Nirant07/RaatAurPyaar

## Contributing

Suggestions, improvements, and pull requests are welcome.

Useful contributions include UI improvements, accessibility improvements, responsive design improvements, cleaner JavaScript, performance improvements, better documentation, additional themes, and bug fixes.

## License

This project is licensed under the MIT License.

See the [`LICENSE`](LICENSE) file for the full license text.

## Author

**Nirant07**

GitHub: https://github.com/Nirant07

## Final Note

This repository started as a personal experiment inspired by the late-night music website trend.

It became a learning project:

**Find an idea → build the experience → understand the code → change the theme → make your own site.**

Use Raat aur Pyaar as the starting point, not the destination.
