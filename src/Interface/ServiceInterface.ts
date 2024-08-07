export interface ApiService {
    userName: string,
    serviceName:string,
        //key: string,
        paid: boolean,
        expire_on: Date, // Assuming expire_on is a date
        bot: boolean,        
        service: boolean;
        username: string, // Corrected property name}    
        con_connect_to_business: boolean,
        status:string,
        }
  
  export const validateService = (service: any): service is ApiService => {
    return (
      // typeof service.status === "string" &&
      // typeof service.id === "bigint" &&
      typeof service.paid === "boolean" &&
      typeof service.serviceName === "string" &&
      typeof service.expire_on === "string" && // Adjust based on your date type
      typeof service.bot === "boolean" &&
      typeof service.service === "boolean" &&
      typeof service.username === "string" && 
      typeof service.con_connect_to_business === "boolean" 
    );
  };