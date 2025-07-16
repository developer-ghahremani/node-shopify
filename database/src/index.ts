import { AppDataSource, userDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    const allUsers = await userDataSource.find();
    console.log({ allUsers });
    console.log("Here you can setup and run express / fastify / any other framework.");
  })
  .catch((error) => console.log(error));
