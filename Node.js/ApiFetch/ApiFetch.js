// fetch("https://jsonplaceholder.typicode.com/posts")
//   .then((response) => response.json()) // transform into JS obj
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

const { create } = require("domain");

// fetch("https://jsonplaceholder.typicode.com/posts")
//   .then((response) => response.json()) // transform into JS obj
//   .then((data) => {
//     data.forEach((element) => {
//       console.log("Posts", element.body, "\n");
//       // console.log("Titles", element.id);
//     });
//     return data;
//   })
//   .then((data) =>
//     data.forEach((element) => {
//       console.log("Title: ", element.title);
//     })
//   )
//   .catch((error) => console.log(error));

async function getData() {
  //GET
  try {
    const response = await fetch("http://localhost:3000/posts"); // expect an answer from the server
    const data = await response.json(); // transforms into JSON format
    data.forEach((element) => {
      console.log(
        "ID: ",
        element.id,
        "\nTitle: ",
        element.title,
        "\nBody: ",
        element.body
      );
    });
  } catch (error) {
    console.log(error);
  }
}
//getData();

async function createPost() {
  //POST
  try {
    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "My new Post",
        body: "Some kind of body of the post",
        userId: 15,
        id: 555,
      }),
    });
    const data = await response.json();
    console.log("Created Post:", data);
  } catch (error) {
    console.log(error);
  }
}

async function updatePost(postId) {
  //PUT
  try {
    if (typeof postId != "number") {
      throw new Error("Invalid ID: must be a number");
    }
    const response = await fetch(`http://localhost:3000/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: postId,
        title: "Updated Title",
        body: "Updated content of body",
        userId: 1,
      }),
    });
    const data = await response.json();
    console.log(data.id);
  } catch (error) {
    console.log(error);
  }
}

async function patchPost(userId) {
  try {
    if (typeof userId != "number") {
      throw new Error("Invalid input type.");
    }
    const response = await fetch(`http://localhost:3000/posts/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "Just modified title)" }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function deletePost(postId) {
  //DELETE
  try {
    if (typeof postId != "number") {
      throw new Error("Invalid ID: must be a number");
    }
    const response = await fetch(`http://localhost:3000/posts/${postId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(`Post with ID ${postId} has been deleted !`, response.status);
    } else {
      console.error("Faield to delete post due to some error...");
    }
  } catch (error) {
    console.log("ERROR", error);
  }
}

createPost();
updatePost(1);
deletePost(2);
patchPost(12);
console.log("12321321321");
getData();
