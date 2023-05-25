type Services = {
  id?: string;
  serviceNumber: number;
  client: string;
  description: string;
  price: string;
  dateStart: string;
  daysWarranty: number;
  //status: string;
  status: "inProgress" | "finished" | "canceled" | "paused";
};

export default Services;
