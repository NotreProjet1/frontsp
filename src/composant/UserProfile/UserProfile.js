
import UserSidebar from '../../composant/UserProfile/UserSidebar';
import { Card, Avatar, Typography, Button } from '@mui/material';
import './UserProfile.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const UserProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const [instructeurData, setinstructeurData] = useState(location.state ? location.state.instructeurData : null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activepage } = useParams();
  useEffect(() => {
    const getAxiosInstance = () => {
      const token = localStorage.getItem('token');
      const instance = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return instance;
    };

    const fetchinstructeurData = async () => {
      try {
        const axiosInstance = getAxiosInstance();
        const response = await axiosInstance.get(`/instructeur/${id}`);
        setinstructeurData(response.data.participant);
      } catch (error) {
        console.error('Error fetching instructeur data:', error);
      }
    };

    if (!instructeurData && id) {
      fetchinstructeurData(id);
    }
  }, [id, instructeurData]);

  // Fonction fictive pour modifier le profil
  const handleEditProfile = () => {
    // Logique de modification du profil
    console.log("Modifier le profil");
  };

  return (
    <div className='userprofile'>
      <div className='profile-banner'>
      </div>

      <div className='userprofilein'>
        <div className='left'>
          <UserSidebar activepage={activepage} userId={instructeurData.id} userdata={instructeurData} />        </div>
        <div className='right' style={{ backgroundColor:"#f5f5f5", border: "2px solid #000", borderTopColor: "black", borderRightColor: "black", borderBottomColor: "black", borderLeftColor: "black" ,borderRadius:"10px" }}>
          <Card className='profile-card' style={{ marginTop: '10px' }}>
            <div className="card-body p-4">
              <div className="d-flex text-black">
                <div className="flex-shrink-0">
                  <Avatar src="https://app.scorf.fr/images/adherents/default-avatar.jpg" alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                </div>


                <div className="flex-grow-1 ms-3">
                  <Typography variant="h5" className="mb-1">{instructeurData && instructeurData.nom}  {instructeurData && instructeurData.prenom}</Typography>

                  

                </div>
              </div>
            </div>
          </Card>

          <div className="profile-table" style={{ marginTop: '20px' }}>
            <table className="table">
              <tbody>
                <tr>
                  <td><strong>Specialite</strong></td>
                  <td>{instructeurData && instructeurData.specialite}</td>
                </tr>
                <tr>
                  <td><strong>Email</strong></td>
                  <td>{instructeurData && instructeurData.email}</td>
                </tr>
                <tr>
                  <td><strong>Téléphone</strong></td>
                  <td>{instructeurData && instructeurData.tel}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UserProfile;