# Horoscope Generator

A static, playful horoscope generator: month and day → five yes/no questions → three-second loading screen → a sign-specific horoscope. There are three fortunes per sign. Answers do not affect the fortune.

Run `npm start` and visit http://localhost:8074, or open `dist/index.html` directly. No dependencies or build step. Run `npm test` for checks.

No analytics, external fonts, storage, cookies, or form submissions. Birthday values are cleared after calculating the sign. Only temporary page state is used, and page entry/reset clears it. February 29 is accepted without requesting a year. Date ranges use the conventional tropical zodiac cutoffs, not astronomical calculations.

The sneeze question is phrased as “Have you sneezed more than twice today?” for unambiguous yes/no answers. The fifth question is “Is a hot dog a sandwich?”

## Deploy

Create a GitHub repository and upload this folder's contents, including `.github/workflows/deploy.yml`. Choose GitHub Actions in Settings → Pages, then run the workflow. It tests and publishes `dist`.

Repository: https://github.com/ka-chowF1/Horoscope-Generator

GitHub Pages URL (after enabling Pages): https://ka-chowf1.github.io/Horoscope-Generator/

The dashboard widget uses Horoscope Generator, emoji 🔮, and “Written in the stars. Probably a typo.”

Responsive styling, keyboard controls, live reaction announcements, and reduced motion are included. Visual cross-browser checks remain a separate manual step.
