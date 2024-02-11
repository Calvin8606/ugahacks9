## Inspiration
It can be hard to manage your money when using a checking account, so we were inspired to build a banking app that can tell how well youre spending
## What it does
Using the capitalone api, you can create an account, and manage your bank account. Make deposits and withdrawals. Then the app will manage how well youve been doing. It will use openai to generate a response from your helpful cat assistant.
## How we built it
We built it using expo to create a mobile app that will work on ios, android and the web. The expo app communicates with our node express server that is responsible for generating the AI responses.
## Challenges we ran into
CORS issues cause a lot of problems. We originally wanted to request openai responses from within the expo app, but we werent able to fix any cors issues. TO work around this we had to create our express server.

This was also our very first time creating a mobile app, and it was challenging to learn.

Also we had numerous issues with our openai keys. Thier payment processing wasnt working, so we were stuck on the free tier that had heavy rate limiting.
## Accomplishments that we're proud of
We created a cross platform mobile app that can help you see how your doing with the help of an ai cat chatbot.
## What we learned
How to create mobile apps
How to use AI to generate responses through the api
How to use capital ones api
## What's next for Cat motivation banking
Improving the algorithms for detecting how the user is doing
