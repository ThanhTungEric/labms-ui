import React from 'react';
import ProcedureTable from '@/module/managefl/ProcedureTable';
import { ProcedureSection } from '@/module/managefl/types';
import { Box } from '@mui/material';

const mockData: ProcedureSection[] = [
  {
    title: 'Equipment borrow',
    procedures: [
      {
        id: 1,
        version: 3,
        effectiveDate: '12/05/25',
        name: 'Laptop HP ProBook 450 G9',
        departmentOwner: 'IT Department',
        linkedPolicies: 'Equipment Usage Policy',
        owner: { initials: 'TT', name: 'Thomas Tran', color: '#ff69b4' },
        status: 'Approved'
      },
      {
        id: 2,
        version: 1,
        effectiveDate: '08/03/25',
        name: 'Projector Epson EB-X49',
        departmentOwner: 'Facilities',
        linkedPolicies: 'Borrowing & Return Rules',
        owner: { initials: 'NL', name: 'Nguyen Lam', color: '#9370db' },
        status: 'Pending'
      },
      {
        id: 3,
        version: 2,
        effectiveDate: '25/02/25',
        name: 'Meeting Room Speaker Set',
        departmentOwner: 'Admin Office',
        linkedPolicies: 'Equipment Responsibility Form',
        owner: { initials: 'HD', name: 'Hien Do', color: '#ff4500' },
        status: 'Returned'
      },
    ],
  },
  {
    title: 'Booking lab',
    procedures: [
      {
        id: 4,
        version: 1,
        effectiveDate: '10/04/25',
        name: 'Physics Lab A – Morning Slot',
        departmentOwner: 'Engineering Faculty',
        linkedPolicies: 'Lab Safety Guidelines',
        owner: { initials: 'KL', name: 'Khanh Le', color: '#ff69b4' },
        status: 'Approved'
      },
      {
        id: 5,
        version: 2,
        effectiveDate: '22/04/25',
        name: 'Chemistry Lab B – Afternoon Slot',
        departmentOwner: 'Science Faculty',
        linkedPolicies: 'Chemical Storage Rules',
        owner: { initials: 'MN', name: 'Mai Nguyen', color: '#9370db' },
        status: 'Pending'
      },
      {
        id: 6,
        version: 1,
        effectiveDate: '02/05/25',
        name: 'Computer Lab 3 – Evening Slot',
        departmentOwner: 'IT Department',
        linkedPolicies: 'Lab Access Policy',
        owner: { initials: 'PQ', name: 'Phuc Quang', color: '#ff4500' },
        status: 'In Use'
      },
      {
        id: 7,
        version: 1,
        effectiveDate: '06/05/25',
        name: 'Language Lab – Full Day',
        departmentOwner: 'Languages & Communication',
        linkedPolicies: 'Lab Reservation Rules',
        owner: { initials: 'TD', name: 'Tina Do', color: '#32cd32' },
        status: 'Approved'
      },
    ],
  },
];


const ManageFLPage: React.FC = () => {
  return (
    <Box>      
      {mockData.map((section, index) => {
        if (section.procedures.length > 0) {
          return <ProcedureTable key={index} title={section.title} procedures={section.procedures} />;
        } else {
          return (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0', padding: '10px 0' }}>
              <h2 style={{ margin: 0, fontSize: '20px' }}>{section.title}</h2>
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>...</span>
            </div>
          );
        }
      })}

      <div style={{ padding: '20px 0' }}>
        <button style={{ border: '1px dashed #ccc', backgroundColor: 'transparent', padding: '10px 20px', cursor: 'pointer', color: '#666', borderRadius: '4px' }}>
          + Add New Section
        </button>
      </div>
    </Box>
  );
};

export default ManageFLPage;