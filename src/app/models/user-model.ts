export interface Car {
    id?: number;
    manufactureYear: number;
    licensePlate: string;
    model: string;
    color: string;
  }
  
  export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    birthday: string;
    login: string;
    password?: string; // Opcional, pode não ser necessário enviar em todas as requisições
    phone: string;
    cars: Car[];
  }
  