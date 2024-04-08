// Users.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from "../redux/user/userSlice";
import UserService from '../Services/User/UserService';
import CusSwal from '../Utils/CustomSwal/CusSwal';
import ResponseHandler from '../Utils/ResponseHandler/ResponseHandler';
import PdfGenerator from '../Utils/Pdfs/PdfGenerator';
import userHeader from '../Utils/Pdfs/UserHeader';
import Toaster from '../Utils/Toaster/Toaster';
import { useNavigate } from 'react-router-dom';

export default function Users() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await UserService.getUsers()
      console.log(response)
      setUsers(response.data.users)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  const handleUserDelete = async (id) => {
    CusSwal.deleteConfiramation(async () => {
      try {
        const result = await UserService.deleteUser(id);
        if (result.data.message.includes("deleted")) {
          Toaster.justToast('success', "Deleting User....", async () => {
            if (currentUser._id === id) {
              const signOutResult= await UserService.signOut();
              navigate('/sign-in');
            } else {
              fetchData();
            }
          });
        } else {
          Toaster.justToast('error', result.data.message, () => { });
        }
      } catch (error) {
        ResponseHandler.handleResponse(error);
      }
    });
  }

  const filteredStaff = searchQuery ? users.filter((user) => {
    return (
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }) : users
  const generatePdf = () => {
    Toaster.loadingToast('Generating Pdf')
    try {
      Toaster.updateLoadingToast('success', 'Creating The Pdf For You', () => { })
      PdfGenerator.generatePdf(users, "User List", userHeader)
    } catch (error) {
      Toaster.updateLoadingToast('error', 'genration failed', () => { })
    } finally {
      Toaster.dismissLoadingToast()
    }
  }
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-3 flex-1">
        {/* Your Users content goes here */}
        <h1 className='text-3xl font-semibold text-center my-7'>Users</h1>
        <div className='auth-inner'></div>
        {
          loading ? (
            <h3 className='text-center'>loading...</h3>
          ) : (

            <div>
              <div className="flex justify-between my-4">
                <input type="text" placeholder='Search By Username'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 w-1/3" />
                <button onClick={generatePdf} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Generate PDF</button>
              </div>
              <table className="w-full border-collapse">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 border">Profile</th>
                    <th className="py-2 px-4 border">Username</th>
                    <th className="py-2 px-4 border">Email</th>
                    <th className="py-2 px-4 border">User Type</th>
                    <th className="py-2 px-4 border">Joined</th>
                    <th className="py-2 px-4 border">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.length > 0 ? (
                    filteredStaff.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border">
                          <img src={user.profilePicture} alt="" className='w-10' />
                        </td>
                        <td className="py-2 px-4 border">{user.username}</td>
                        <td className="py-2 px-4 border">{user.email}</td>
                        <td className="py-2 px-4 border">{user.isAdmin ? 'Admin' : 'Regular User'}</td>
                        <td className="py-2 px-4 border">{user.createdAt}</td>
                        <td className="py-2 px-4 border delete-cell">
                          <button type='button' onClick={() => {
                            handleUserDelete(user._id)
                          }} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-2 px-4 border text-center" colSpan="6">No results</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          )
        }

      </div>
    </div>
  );
}

