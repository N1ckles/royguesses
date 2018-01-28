# Roy Guesses
Keeps track of how many times someone has been unsure.

# Configuration
Add these to `.env`:
 - `BOT_TOKEN` (required) - The token for the bot.
 - `COMMAND_PREFIX` - The prefix on commands. (default: `!`)
 - `OWNER_ID` - The ID of the owner. (The only person who can run commands.)
 - `REDIS_HOST` - The host of the Redis server. (default: `redis`)

# Run
This can be run with Docker by building the images with `docker-compose build` the running it with `docker-compose run -d`.
It can be shut down by using `docker-compose down`.

# Storage
The storage is Redis, and it'll store the data in `data/`. Data can be wiped by bringing it down, deleting `data/` then bringing it up.