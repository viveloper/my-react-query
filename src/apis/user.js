export const getUser = async ({ id }) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        const data = await res.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
};
