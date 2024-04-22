import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const ListeFormationInstructeur = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const instructeurId = params.get('userId');
  const tokenParam = params.get('token'); // Récupérer le token depuis l'URL

  // Utiliser useState pour stocker le token
  const [token, setToken] = useState('');

  useEffect(() => {
    // Stocker le token dans le state si présent dans l'URL
    if (tokenParam) {
      setToken(tokenParam);
      console.log('Token from URL:', tokenParam);
    } else {
      console.log('No token found in the URL.');
    }
  }, [tokenParam]); // Mettre à jour le token lorsque le paramètre token de l'URL change

  const [formations, setFormations] = useState([]);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        if (instructeurId) {
          const response = await axios.get(`http://localhost:3000/formationP/formations/${instructeurId}`, {
            headers: {
              // Utiliser le token dans l'en-tête de la requête si présent
              authorization: token ? `Bearer ${token}` : undefined,
            },
          });
          setFormations(response.data.formations);
        }
      } catch (error) {
        console.error('Error fetching formations:', error);
      }
    };
  
    fetchFormations();
  }, [instructeurId, token]); // Mettre à jour les formations lorsque l'ID de l'instructeur ou le token change

  const handleSupprimer = async (id_fp) => {
    try {
      // Définir le token d'authentification dans l'en-tête de la requête
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      
      // Effectuer la requête DELETE
      await axios.delete(`http://localhost:3000/formationP/supprimer/${id_fp}`);
      toast.success('Formation supprimée avec succès.');
      // Mettre à jour la liste des formations après la suppression
      const updatedFormations = formations.filter(form => form.id_fp !== id_fp);
      setFormations(updatedFormations);
    } catch (error) {
      console.error('Error deleting formation:', error);
      toast.error('Erreur lors de la suppression de la formation.');
    }
  };
  
  return (
    <div>
         <style>{`
            h1 {
              font-family: 'Pacifico', cursive; /* Appliquer la police Pacifico */
              text-align: center; /* Centrer le texte */
              color: #333; /* Changer la couleur du texte */
              font-size: 2rem; /* Changer la taille de la police */
              font-weight: bold; /* Changer le poids de la police */
              margin-bottom: 20px; /* Ajouter de l'espace en bas */
              margin-top:20px; 
              color:#136c34; 
            }
        /* CSS pour les cartes */
        .card1 {
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 20px;
          margin: 10px;
          width: calc(33.33% - 20px); /* Pour afficher trois cartes par ligne */
          float: left;
          box-sizing: border-box;
        }

        .card1 h2 {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .domaine-niveau {
          font-style: italic;
          color: #666;
        }

        .description {
          margin-top: 10px;
        }

        .prix {
          font-weight: bold;
          color: #007bff;
          margin-top: 10px;
        }

        .button-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        }

        .details-button,
        .supp-button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          
        }

      

        .details-button {
          text-decoration: none;
        }

        .supp-button {
          background-color: #dc3545;
        }

   
        .clearfix::after {
          content: "";
          display: table;
          clear: both;
        }
      `}</style>
      <h1>Liste des formations de l'instructeur</h1>
      <ul>
        {formations.map(formation => (
          <div className="card1" key={formation.id_fp}>
            <h2>{formation.titre}</h2>
            <p className="domaine-niveau">Domaine : {formation.domaine} | Niveau : {formation.niveaux}</p>
            <p className="description">Description : {formation.description}</p>
            <p className="prix">Prix : {formation.prix}</p>
            <div className="button-container">
            <Link to={`/formationP/getFormationById/${formation.id_fp}`} className="details-button">Voir les détails</Link>
              <button className="supp" onClick={() => handleSupprimer(formation.id_fp)}>Supprimer</button>
            </div>
          </div>
        ))}
      </ul>

      <ToastContainer />
    </div>
  );
}

export default ListeFormationInstructeur;
