import { Client, Environment } from "square";

const isDevelopment = process.env.NODE_ENV === 'development';
const environment = isDevelopment ? Environment.Sandbox : Environment.Production;

const accessToken = isDevelopment
  ? process.env.SQUARE_SANDBOX_ACCESS_TOKEN
  : process.env.SQUARE_PRODUCTION_ACCESS_TOKEN;

const squareClient = new Client({
  accessToken,
  environment,
});

export default squareClient;
