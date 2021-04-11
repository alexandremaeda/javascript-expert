import { writeFile, readFile } from 'fs/promises';

export const save = async (data) => {
  // sem __filename e __dirname

  // *por algum motivo, no windows, pathname não funciona.
  // const { pathname: databaseFile } = new URL(
  //   './../database.json',
  //   import.meta.url
  // );
  const url = new URL('./../database.json', import.meta.url);
  const currentData = JSON.parse(await readFile(url));
  currentData.push(data);

  await writeFile(url, JSON.stringify(currentData));
};

// Moto,Bike 23000 2021-01-01 2021-02-01
