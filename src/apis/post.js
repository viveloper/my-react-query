export const getPosts = async ({ userId }) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        const data = await res.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
};
