import { Button, Frog } from 'frog'
import { handle } from 'frog/vercel'
import { Box, Image, VStack, vars } from "../lib/ui.js";
import { randomInt } from 'crypto';

// Uncomment this packages to tested on local server
// import { devtools } from 'frog/dev';
// import { serveStatic } from 'frog/serve-static';

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api/frame',
  imageAspectRatio: '1:1',
  imageOptions: {
    height: 1024,
    width: 1024,
  },
  ui: { vars },
})

// Array of image URLs with aspect ratio 1.22:1
const images = [
  '/images/img1.png',
  '/images/img2.png',
  '/images/img3.png',
  '/images/img4.png',
  '/images/img5.png',
  '/images/img6.png',
  '/images/img7.png',
  '/images/img8.png',
  '/images/img9.png',
  '/images/img10.png',
];

app.frame('/', (c) => {
  return c.res({
    image: (
      <Box
          grow
          alignVertical="center"
          backgroundColor="black"
          height="100%"
      >
        <VStack gap="4">
          <Box
            grow
            alignVertical="center"
            backgroundColor="white"
            padding="40"
            height="100%"
          >
            <Image
                height="100%"
                width="100%"
                objectFit="cover"
                src="/Main.png"
              />
          </Box>
        </VStack>
      </Box>
    ),
    intents: [
      <Button action="/button-pressed">Get MASKS Message</Button>,
    ],
  })
})

app.frame('/button-pressed', (c) => {
  try {
    const randomIndex = randomInt(images.length);
    const selectedImage = images[randomIndex];

    const baseUrl = "https://warpcast.com/~/compose";
    const text = "I got this MASKS Message. Let's check yours 🎭\nFrame by @gusik4ever";
    const embedUrlByUser = "https://frame-by-wincy.vercel.app/api/frame/button-pressed";

    const SHARE_BY_USER = `${baseUrl}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrlByUser)}`;

    return c.res({
      title: 'MASKS Message',
      image: (
        <Box
            grow
            alignVertical="center"
            backgroundColor="black"
            height="100%"
        >
          <VStack gap="4">
            <Box
              grow
              alignVertical="center"
              backgroundColor="white"
              padding="40"
              height="100%"
            >
              <Image
                  height="100%"
                  width="100%"
                  objectFit="contain"
                  src={selectedImage}
                />
            </Box>
          </VStack>
        </Box>
      ),
      intents: [
        <Button action="/">Check yours</Button>,
        <Button.Link href={SHARE_BY_USER}>Share</Button.Link>,
      ],
    });
  } catch (error) {
    return c.res({
      image: '/Main.png',
      intents: [
        <Button action="/">Try again</Button>,
      ],
    });
  }
});


// Uncomment this line code to tested on local server
// devtools(app, { serveStatic });

export const GET = handle(app)
export const POST = handle(app)
