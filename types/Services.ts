import Brand from "./Brand";

type Services = {
  id?: string;
  client: string;
  description: string;
  price: string;
  dateStart: string;
  daysWarranty: number;
  brand: string;
  status: "inProgress" | "finished" | "canceled" | "paused";
};

export default Services;
