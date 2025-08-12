export interface functionalDomainItems {
  id: number;
  label: string;
  descripton: string;
}

export interface functionalDomains {
  data: functionalDomainItems[];
  meta: {
    count: number;
  };
}
