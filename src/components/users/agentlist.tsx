import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getAgentList } from '../../data-access/services/agentlist-service';
import { useSelector } from 'react-redux';

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


interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyEmail: string;
  group: string;
  userRole: string;
  createdAt: string;
  updatedAt: string;
}

// Function to convert ISO string to local date string
const formatDateToLocal = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString(); // You can customize the format here
};

const columns = [
  { name: 'ID/Username', selector: (row: User) => row.username, sortable: true },
  { name: 'First Name', selector: (row: User) => row.firstName, sortable: true, width: '110px', },
  { name: 'Last Name', selector: (row: User) => row.lastName, sortable: true, width: '110px', },
  { name: 'Email', selector: (row: User) => row.email, sortable: true },
  { name: 'Phone', selector: (row: User) => row.phone, sortable: true },
  { name: 'Company', selector: (row: User) => row.companyEmail, sortable: true },
  { name: 'Group', selector: (row: User) => row.group, sortable: true },
  { name: 'User Role', selector: (row: User) => row.userRole, sortable: true, width: '120px', },
  { 
    name: 'Created At', 
    selector: (row: User) => formatDateToLocal(row.createdAt), // Format date for display
    sortable: true, 
    wrap: true 
  },
  { 
    name: 'Last Update', 
    selector: (row: User) => formatDateToLocal(row.updatedAt), // Format date for display
    sortable: true, 
    wrap: true 
  },
  {
    name: 'Action',
    cell: (row: User) => (
      <button style={{border: 'none'}} className="action-btn" onClick={() => handleActions(row.username)}>
        <i className="bi bi-pencil-square"></i> Action
      </button>
    ),
    width: '90px',
  },
];

const handleActions = (id: string) => {
  console.log(`Editing agent with ID: ${id}`);
};

const AgentList: React.FC = () => {
  const [agents, setAgents] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const token = useSelector((state: any) => state.auth.token); // Get token from store

  //geting data
  const fetchAgentData = async (page: number) => {
    setLoading(true);
    try {
      const data = await getAgentList(token, page);
      setAgents(data.users); // API should return users array
      setTotalRows(data.total); // API should return total number of users
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    fetchAgentData(page);
  };

  useEffect(() => {
    fetchAgentData(page);
  }, [page]);

  return (
    <div className="agent-list-container">
      <h2>Agent List</h2>
      <DataTable
        columns={columns}
        data={agents}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        highlightOnHover
        responsive
        striped
        progressPending={loading}
        customStyles={customStyles}
      />
    </div>
  );
};

export default AgentList;
