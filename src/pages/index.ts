// pages/index.ts

// SETUP
export { default as FacilitiesMaster } from './setup/facilitiesmaster';
export { default as CommonStandardMaster } from './setup/commonStandardMaster/commonStandardMaster';

// SITE MANAGEMENT
export { default as BuildingTable } from './site/building';
export { default as FloorManagement } from './site/floor';
export { default as RoomManagement } from './site/room';
export { default as LabManagement } from './site/lab'; // Đã đổi tên để theo thứ tự

// EQUIPMENT
export { default as EquipmentManagement } from './equipment/master';
export { default as EquipmentItemManagement } from './equipment/item';

// PARTICIPANT
export { default as ParticipantManagement } from './participant/group';
export { default as IndividualManagement } from './participant/individual/PersonManagement';

// OTHERS
export { default as CalendarPage } from './calendar';
export { default as ManageFLPage } from './managefl';

//STAFFS
export { default as StaffManagement } from './staff';