import Brand from "./Brand";

type Services = {
  id?: string;
  client: string;
  description: string;
  price: string;
  dateStart: string;
  daysWarranty: number;
  brand: string;
  status: "Em progresso" | "Finalizado" | "Cancelado" | "Pausado";
};

export default Services;
