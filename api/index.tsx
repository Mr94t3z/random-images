import { Button, Frog } from 'frog'
import { handle } from 'frog/vercel'
import { randomInt } from 'crypto';

// Uncomment this packages to tested on local server
// import { devtools } from 'frog/dev';
// import { serveStatic } from 'frog/serve-static';

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api/frame',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Array of image URLs with aspect ratio 1.22:1
const images = [
  'https://media.giphy.com/media/lqVVqkqMolh9S/giphy.gif',
  'https://media.giphy.com/media/14gHyPIqhVDJLO/giphy.gif',
  'https://media.giphy.com/media/rfMneDZwiWS0o/giphy.gif',
  'https://media.giphy.com/media/7UyvTEwUaUaRy/giphy.gif',
  'https://media.giphy.com/media/5h9WMcOWnx7hu/giphy.gif',
  'https://media.giphy.com/media/de4aRYwfD7T7q/giphy.gif',
  'https://media.giphy.com/media/dgzRf0qUu8Kca9Ymne/giphy.gif'
];

app.frame('/', (c) => {
  return c.res({
    image: '/images/dont-click.gif',
    intents: [
      <Button action="/button-pressed">Press 🔘</Button>,
    ],
  })
})

app.frame('/button-pressed', (c) => {

  // Generate a random index to select an image
  const randomIndex = randomInt(images.length);
  const selectedImage = images[randomIndex];

  return c.res({
    image: selectedImage,
    intents: [
      <Button action="/">Try again</Button>,
    ],
  })
})

// Uncomment this line code to tested on local server
// devtools(app, { serveStatic });

export const GET = handle(app)
export const POST = handle(app)
