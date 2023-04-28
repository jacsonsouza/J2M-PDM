import { Moment } from "moment";

type Services = {
  id?: string;
  serviceNumber: number;
  client: string;
  description: string;
  price: string;
  dateStart: string;
  daysWarranty: number;
  status: string;
};

export default Services;
