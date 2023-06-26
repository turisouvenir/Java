import { useEffect, useState, useRef } from "react";
import "../assets/scss/dashboard.scss";
import "../assets/scss/modal.scss";
import Modal from "../components/Modal";
import { API_URL } from "../services";
import toast from "react-hot-toast";
import ReactPaginate from 'react-paginate';
import axios from 'axios'


function Dashboard() {
    const [employeeLaptopData, setEmployeeLaptopData] = useState([])
    const [newEmployeeLaptop, setNewEmployeeLaptop] = useState(
        {
            firstname: '', lastname: '', nationalIdentity: '', telephone: '', department: '', position: '', laptopManufacturer: '',
            model: '', serialNumber: ''
        }
    )

    const config = {
        headers: {
            'Content-Type': 'application/json', // Example header
            authorization: JSON.parse(localStorage.getItem("auth_token")), // Example header for authentication
            // Add more headers as needed
        }
    };

    const getData=()=>{
        axios.get(`${API_URL}/employeeLaptops`, config).then((response) => {
            setEmployeeLaptopData(response.data);
        });
    }
    useEffect(() => {
        if (localStorage.getItem('auth_token') !== null) {
            getData()
        }

    }, [localStorage.getItem('auth_token')]);

    const childRef = useRef(null);

    const toggleModal = () => {
        if (childRef.current) childRef.current.toggleModal();
    };


    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };
    const pageSize = 10;
    const paginatedData = employeeLaptopData.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform validation checks
        if (!newEmployeeLaptop.firstname) {
            toast.error("First Name is required");
            return;
        }

        if (!newEmployeeLaptop.lastname) {
            toast.error("Last Name is required");
            return;
        }

        if (!newEmployeeLaptop.nationalIdentity) {
            toast.error("National Identity is required");
            return;
        } else if (newEmployeeLaptop.nationalIdentity.length !== 16) {
            toast.error("National Identity should be 16 digits");
            return;
        }

        if (!newEmployeeLaptop.telephone) {
            toast.error("Telephone is required");
            return;
        } else if (newEmployeeLaptop.telephone.length !== 10) {
            toast.error("Telephone should be 10 digits");
            return;
        }

        if (!newEmployeeLaptop.department) {
            toast.error("Department is required");
            return;
        }

        if (!newEmployeeLaptop.position) {
            toast.error("Position is required");
            return;
        }

        if (!newEmployeeLaptop.laptopManufacturer) {
            toast.error("Laptop Manufacturer is required");
            return;
        }

        if (!newEmployeeLaptop.model) {
            toast.error("Model is required");
            return;
        }

        if (!newEmployeeLaptop.serialNumber) {
            toast.error("Serial Number is required");
            return;
        }

        axios.post(`${API_URL}/employeeLaptops`, newEmployeeLaptop, config)
            .then((response) => {
                console.log(response.data);
                toast.success("Employee laptop created successfully");
                setNewEmployeeLaptop(
                    {
                        firstname: '', lastname: '', nationalIdentity: '', telephone: '', department: '', position: '', laptopManufacturer: '',
                        model: '', serialNumber: ''
                    }
                );
                getData()
                toggleModal()
            })
            .catch((error) => {
                toast.error("Error creating employee laptop:", error.message);
            });
    }

    return (
        <div className="pl-10 pt-10">
            <div>
                <div className="title">List of Employees with the assigned laptops </div>
                <div className="md:flex">
                    <div className="w-full">
                        <div className="md:flex  w-[98%]">
                            <div className="ml-auto">
                                <button onClick={toggleModal} className="requestRegNum flex">
                                    <div>
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M14 14.252V22H4C3.99969 20.7789 4.27892 19.5739 4.8163 18.4774C5.35368 17.3809 6.13494 16.4219 7.10022 15.674C8.0655 14.9261 9.18918 14.4091 10.3852 14.1626C11.5811 13.9162 12.8177 13.9467 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </div>
                                    <div className="mt-1">Assign new laptop to Employee</div>
                                </button>
                            </div>
                        </div>
                        <div className="table w-full">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>National Identity</th>
                                        <th>Telephone</th>
                                        <th>Department</th>
                                        <th>Position</th>
                                        <th>Laptop Manufacturer</th>
                                        <th>Model</th>
                                        <th>Serial Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedData.map(employee => (
                                        <tr key={employee.id}>
                                            <td data-label="ID" className="pt-1 p-3">{employee.id}</td>
                                            <td data-label="First Name" className="pt-1 p-3">{employee.firstname}</td>
                                            <td data-label="Last Name" className="pt-1 p-3">{employee.lastname}</td>
                                            <td data-label="National Identity" className="pt-1 p-3">{employee.nationalIdentity}</td>
                                            <td data-label="Telephone" className="pt-1 p-3">{employee.telephone}</td>
                                            <td data-label="Department" className="pt-1 p-3">{employee.department}</td>
                                            <td data-label="Position" className="pt-1 p-3">{employee.position}</td>
                                            <td data-label="Laptop Manufacturer" className="pt-1 p-3">{employee.laptopManufacturer}</td>
                                            <td data-label="Model" className="pt-1 p-3">{employee.model}</td>
                                            <td data-label="Serial Number" className="pt-1 p-3">{employee.serialNumber}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination-container my-4">
                            <ReactPaginate
                                previousLabel={'Previous'}
                                nextLabel={'Next'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={Math.ceil(employeeLaptopData.length / pageSize)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageChange}
                                containerClassName={'flex items-center justify-center sm:justify-end w-[98%] space-x-2'}
                                subContainerClassName={'flex'}
                                pageClassName={'px-2 py-1 rounded cursor-pointer'}
                                pageLinkClassName={'text-blue-500 hover:text-blue-700'}
                                previousClassName={'px-2 py-1 rounded cursor-pointer bg-primary text-main'}
                                previousLinkClassName={'text-blue-500 hover:text-blue-700'}
                                nextClassName={'px-2 py-1 rounded cursor-pointer bg-primary text-main'}
                                nextLinkClassName={'text-blue-500 hover:text-blue-700'}
                                activeClassName={'bg-blue-500 text-white'}
                                disabledClassName={'opacity-50 cursor-not-allowed'}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Modal ref={childRef} width="767px">
                <div>
                    <div className="modal-title text-center my-10">
                        Assign new latptop to an employee
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="">
                                <div className="px-4 py-5 bg-white sm:p-6 flex justify-center">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                                First Name
                                            </label>
                                            <input
                                                defaultValue={newEmployeeLaptop?.firstname}
                                                onChange={(e) => {
                                                    setNewEmployeeLaptop({
                                                        ...newEmployeeLaptop,
                                                        firstname: e.target.value,
                                                    });
                                                }}
                                                type="text"
                                                id="firstName"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                                Last Name
                                            </label>
                                            <input
                                                defaultValue={newEmployeeLaptop?.lastname}
                                                onChange={(e) => {
                                                    setNewEmployeeLaptop({
                                                        ...newEmployeeLaptop,
                                                        lastname: e.target.value,
                                                    });
                                                }}
                                                type="text"
                                                id="lastName"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="nid" className="block text-sm font-medium text-gray-700">
                                                National ID
                                            </label>
                                            <input
                                                defaultValue={newEmployeeLaptop?.nationalIdentity}
                                                onChange={(e) => {
                                                    setNewEmployeeLaptop({
                                                        ...newEmployeeLaptop,
                                                        nationalIdentity: e.target.value,
                                                    });
                                                }}
                                                type="number"
                                                length={16}
                                                id="nid"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                                Telephone
                                            </label>
                                            <input
                                                defaultValue={newEmployeeLaptop?.telephone}
                                                onChange={(e) => {
                                                    setNewEmployeeLaptop({
                                                        ...newEmployeeLaptop,
                                                        telephone: e.target.value,
                                                    });
                                                }}
                                                type="number"
                                                length={10}
                                                id="phone"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                                Department
                                            </label>
                                            <input
                                                defaultValue={newEmployeeLaptop?.department}
                                                onChange={(e) => {
                                                    setNewEmployeeLaptop({
                                                        ...newEmployeeLaptop,
                                                        department: e.target.value,
                                                    });
                                                }}
                                                type="text"
                                                id="department"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                                                Position
                                            </label>
                                            <input
                                                defaultValue={newEmployeeLaptop?.position}
                                                onChange={(e) => {
                                                    setNewEmployeeLaptop({
                                                        ...newEmployeeLaptop,
                                                        position: e.target.value,
                                                    });
                                                }}
                                                type="text"
                                                id="position"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="laptopManufacturer" className="block text-sm font-medium text-gray-700">
                                                Laptop Manufacturer
                                            </label>
                                            <input
                                                defaultValue={newEmployeeLaptop?.laptopManufacturer}
                                                onChange={(e) => {
                                                    setNewEmployeeLaptop({
                                                        ...newEmployeeLaptop,
                                                        laptopManufacturer: e.target.value,
                                                    });
                                                }}
                                                type="text"
                                                id="laptopManufacturer"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                                                Model
                                            </label>
                                            <input
                                                defaultValue={newEmployeeLaptop?.model}
                                                onChange={(e) => {
                                                    setNewEmployeeLaptop({
                                                        ...newEmployeeLaptop,
                                                        model: e.target.value,
                                                    });
                                                }}
                                                type="text"
                                                id="model"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
                                                Serial Number
                                            </label>
                                            <input
                                                defaultValue={newEmployeeLaptop?.serialNumber}
                                                onChange={(e) => {
                                                    setNewEmployeeLaptop({
                                                        ...newEmployeeLaptop,
                                                        serialNumber: e.target.value,
                                                    });
                                                }}
                                                type="text"
                                                id="serialNumber"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer my-10">
                        <div className="flex justify-center">
                            <button className="cancel mr-9" onClick={toggleModal}>
                                Cancel
                            </button>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    );
}

export default Dashboard;
