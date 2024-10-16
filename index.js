const express = require("express");
const Redis = require("ioredis");
const dotenv = require("dotenv");

dotenv.config(); 

const app = express();
const client = new Redis("redis://default:Vmr9etK7QQgIFkThwm3qxzgQSACXAgNl@redis-11972.c84.us-east-1-2.ec2.redns.redis-cloud.com:11972"); // Initialize ioredis properly

app.get("/testroute", (req, res) => {
  res.send("hello world");
});

app.get("/", async (req, res) => {
  const data = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to My Website</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        header {
            background: #35424a;
            color: #ffffff;
            padding: 10px 0;
            text-align: center;
        }
        main {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background: #ffffff;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            margin-bottom: 20px;
        }
        p {
            line-height: 1.6;
        }
        footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
        }
    </style>
</head>
<body>
    <header>
        <h1>Welcome to My Websitesssss${process.env.API_URL}</h1>
    </header>
    <main>
        <h2>Hello!</h2>
        <p>Thank you for visiting my website. Here you will find various resources and information.</p>
        <p>Feel free to explore the different sections and let me know if you have any questions!</p>
    </main>
    <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
</body>
</html>`;

  try {
    // Check if the value is cached
    const cachedValue = await client.get("todos");

    if (cachedValue) {
      console.log("Returning cached data");
      return res.send(cachedValue); // Return cached HTML as plain HTML
    }

    // Set the cache with expiration
    await client.set("todos", data);
    await client.expire("todos", 10); // Expires in 100 seconds

    console.log("Setting new data in cache");
    return res.send(data); // Return the new data
  } catch (error) {
    console.error("Redis error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
