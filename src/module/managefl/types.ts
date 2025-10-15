export interface Procedure {
  id: number;
  effectiveDate: string;
  name: string;
  departmentOwner: string;
  linkedPolicies: string | string[];
  owner: {
    initials: string;
    name: string;
    color: string;
  };
  status: 'Unlock' | 'Publish' | 'Approve' | 'Approved' | 'Pending' | 'Returned' | 'In Use';
  version: number;
}

export interface ProcedureSection {
  title: string;
  procedures: Procedure[];
}