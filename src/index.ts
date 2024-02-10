import { serve } from 'bun';
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { exit } from 'process';

dotenv.config();



function generateID() {
  let generatedID = Math.floor(100000000 + Math.random() * 900000000);
  const checkIfExistID = true; // placeholder

  if (checkIfExistID) {
    generateID;
  } else {
    return generatedID.toString();
  }
}

function handleGetAllAlbums() { // gets all albums
  return new Response(JSON.stringify("albums"), { // placeholder string
      headers: { 'Content-Type': 'application/json' },
    });
}

function handleGetAllPostsAlbum() { // gets all posts inside album
  return new Response(JSON.stringify("album_with_posts"), { // placeholder string
      headers: { 'Content-Type': 'application/json' },
    });
}

function handleGetPostByID() { // get post inside album
  return new Response(JSON.stringify("get_post_by_id"), { // placeholder string
      headers: { 'Content-Type': 'application/json' },
    });
}

function handleCreateAlbum() {
  return new Response(JSON.stringify("newAlbum"), { // placeholder string
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
}

function handleCreatePost() {
  return new Response(JSON.stringify("newPost"), { // placeholder string
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  });
}

function handleUpdatePost() {
  return new Response("Post Updated", { status: 200 });
}

function handleDeletePost() {
  return new Response("Post Deleted", { status: 200 });
}

function handleDeleteAlbum() {
  return new Response("Album Deleted", { status: 200 });
}

function handleUpdateAlbum() {
  return new Response("Album Updated", { status: 200 });
}

if (!process.env.PORT) {
  console.log(`No port value specified exiting.`);
  exit(2);
}

const PORT = parseInt(process.env.PORT as string, 10);
// Listen Server
serve({
  port: PORT,
  async fetch(request) {
    const { method } = request;
    const { pathname } = new URL(request.url);
    // /api/:(albumid)/:(postid)
    const pathRegexForID = /^\/api\/posts\/(\d+)$/;
    /**

  # Discord bot:
    - eval/run command in request body
    - return all server id's that the bot is inside
     **/
    // - GET Albums
    if (method == 'GET' && pathname == '/api/albums') {
      return handleGetAllAlbums;
    }

    // - GET Images inside album (with limit?)
    if (method == 'GET' && pathname == '/api/albums/posts') {
      return handleGetAllPostsAlbum;
    }

    // - GET specific image/post by id
    if (method == 'GET') {
        return handleGetPostByID;
    }

    // - POST create album
    if (method == 'POST' && pathname == '/api/albums') {
      return handleCreateAlbum;
    }

    if (method == 'POST' && pathname == '/api/albums/posts') {
      return handleCreatePost;
    }

    // - PATCH specific image/post by id with an edit
    if (method == 'PATCH') {
        return handleUpdatePost;
    }

    if (method == 'PATCH') {
        return handleUpdateAlbum;
    }

    // - DELETE specific image/post by id
    if (method == 'DELETE' && pathname == '/api/albums/posts') {
      return handleDeletePost;
    }

    // - DELETE album by id/name
    if (method == 'DELETE') {
        return handleDeleteAlbum;
    }

    return new Response('Not Found', { status: 404 });
  },
});

console.log(`Listening on http://localhost:${PORT} ...`);