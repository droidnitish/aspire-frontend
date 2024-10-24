import React from 'react';
import DataTable, { SortOrder, TableColumn } from 'react-data-table-component';
import { PropertyData } from '../../../interfaces/property';
import { FaEyeSlash } from 'react-icons/fa'; // Import Font Awesome lock icon

// Custom styles for table borders and text wrapping
const customStyles = {
  table: {
    style: {
      border: '1px solid #ddd',
    },
  },
  rows: {
    style: {
      borderBottom: '1px solid #ddd',
    },
  },
  headCells: {
    style: {
      backgroundColor: '#f1f1f1',
      fontWeight: 'bold',
      borderRight: '1px solid #ddd',
      whiteSpace: 'normal',
    },
  },
  cells: {
    style: {
      borderRight: '1px solid #ddd',
      whiteSpace: 'normal',
    },
  },
};

const Properties: React.FC<{ properties: PropertyData[] }> = ({ properties }) => {

  // Helper function to conditionally render the signup link or lock icon
  const renderSignupLink = (roomIndex: number, totalRooms: number) => {
    if (roomIndex >= totalRooms) {
      return (
        <div style={{ color: '#999' }}>
          <FaEyeSlash  size={20} title="Room not available" />
        </div>
      );
    }
    return (
      <a href="#" style={{ textDecoration: 'underline', color: 'blue' }}>
        Signup new tenant
      </a>
    );
  };

  // Define the columns for the data table
  const columns: TableColumn<PropertyData>[] = [
    {
      name: 'Sno.',
      selector: (_row, index: any) => index + 1,
      sortable: true,
      center: true,
      width: '100px',
    },
    {
      name: 'RSL',
      selector: (row: PropertyData) => row.RSL || 'N/A',
      sortable: true,
      center: true,
    },
    {
      name: 'Houses',
      cell: (row: PropertyData) => (
        <div style={{ textAlign: 'center' }}>
          <div>{row.addressLine1}, {row.area}</div>
          <div>{row.numberOfBedrooms} Rooms</div>
        </div>
      ),
      sortable: true,
      wrap: true,
      center: true,
      width: '200px',
    },
    {
      name: 'Added by',
      selector: (row: PropertyData) => row.addedBy || 'N/A',
      sortable: true,
      center: true,
    },
    {
      name: 'Room 1',
      cell: (row: PropertyData) => renderSignupLink(0, row.numberOfBedrooms),
      sortable: false,
      center: true,
    },
    {
      name: 'Room 2',
      cell: (row: PropertyData) => renderSignupLink(1, row.numberOfBedrooms),
      sortable: false,
      center: true,
    },
    {
      name: 'Room 3',
      cell: (row: PropertyData) => renderSignupLink(2, row.numberOfBedrooms),
      sortable: false,
      center: true,
    },
    {
      name: 'Room 4',
      cell: (row: PropertyData) => renderSignupLink(3, row.numberOfBedrooms),
      sortable: false,
      center: true,
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={Array.isArray(properties) ? properties : []}
        pagination
        highlightOnHover
        responsive
        customStyles={customStyles}
      />
    </div>
  );
};

export default Properties;
