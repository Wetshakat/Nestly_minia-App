import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const buttonIndex = data.untrustedData.buttonIndex;

  let image = 'img111.jpg';
  let message = 'Welcome to Nestly!';

  if (buttonIndex === 1) {
    image = 'img112.jpg';
    message = 'This is the Discover Page!';
  } else if (buttonIndex === 2) {
    image = 'img113.jpg';
    message = 'This is the Become a Creator Page!';
  }

  return new NextResponse(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Nestly</title>
        <meta property="og:title" content="Nestly" />
        <meta property="og:image" content="/${image}" />
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="/${image}" />
        <meta name="fc:frame:button:1" content="${message}" />
        <meta name="fc:frame:post_url" content="/api/frame" />
      </head>
    </html>
  `);
}
