import { Client, Environment } from "square";

// Uncomment this when ready for production
// const isDevelopment = process.env.NODE_ENV === "development";
// const environment = isDevelopment ? Environment.Sandbox : Environment.Production;

// const accessToken = isDevelopment
//   ? process.env.SQUARE_SANDBOX_ACCESS_TOKEN
//   : process.env.SQUARE_PRODUCTION_ACCESS_TOKEN;

// const squareClient = new Client({
//   accessToken,
//   environment,
// });
// Uncomment this when ready for production

// Delete this when ready for production
const environment = Environment.Sandbox;

const accessToken = process.env.SQUARE_SANDBOX_ACCESS_TOKEN;

const squareClient = new Client({
  accessToken,
  environment,
});
// Delete this when ready for production

export default squareClient;
