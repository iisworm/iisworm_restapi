import { serve } from 'bun';

const PORT = 2077;

interface Post {
  id: string;
  title: string;
  image: string; // link to directory with image inside it
  tags: string;
}

interface Album {
  identifier: string;
  title: string;
  posts: {
    [key: string]: Post
  }
}

let albums: Album[] = [];
let posts: Post[] = [];


function handleGetAllAlbums() { // gets all albums
  return new Response(
    JSON.stringify(albums), {
      headers: { 'Content-Type': 'application/json' },
    });
}

function handleGetAllPostsAlbum(identifier: string) { // gets all posts inside album
  const album = albums.find((album) => album.identifier === identifier);

  if (!album) {
    return new Response('Album Not Found', { status: 404 });
  }

  return new Response(
    JSON.stringify(album), {
      headers: { 'Content-Type': 'application/json' },
    });
}

function handleGetPostByID(identifier: Album["identifier"], id: Post["id"]) { // get post inside album
  const album = albums.find((album) => album.identifier === identifier);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return new Response('Post Not Found', { status: 404 });
  }

  return new Response(
    JSON.stringify(album?.posts.post), {
      headers: { 'Content-Type': 'application/json' },
    });
}

serve({
  port: PORT,
  async fetch(request) {
    const { method } = request;
    const { pathname } = new URL(request.url);
    const pathRegexForID = /^\/api\/posts\/(\d+)$/;
    const pathRegexForAlbum = /^\/api\/albums\/(\d+)$/;
    /**

  # Discord bot:
    - eval/run command in request body
    - return all server id's that the bot is inside
     **/
    // - GET Albums
    if (method == 'GET' && pathname == '/api/albums') {
    }

    // - GET Images inside album (with limit?)
    if (method == 'GET' && pathname == '/api/albums/posts') {

    }

    // - GET specific image/post by id
    if (method == 'GET') {
      const match = pathname.match(pathRegexForID);
      const id = match && match[1];

      if (id) {
        // handle returning a post by ID
      }
    }

    // - PATCH specific image/post by id with an edit
    if (method == 'PATCH') {
      const match = pathname.match(pathRegexForID);
      const id = match && match[1];

      if (id) {
        // handle updating a post by ID
      }
    }

    // - DELETE specific image/post by id
    if (method == 'DELETE' && pathname == '/api/posts') {
    }

    // - DELETE album by id/name
    if (method == 'DELETE') {
      const match = pathname.match(pathRegexForAlbum);
      const id = match && match[1];

      if (id) {
        // handle deleting an album by ID
      }
    }

    return new Response('Not Found', { status: 404 });
  },
});

console.log(`Listening on http://localhost:${PORT} ...`);