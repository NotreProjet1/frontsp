import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const ListeresInstructeur = () => {
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

  const [Ressource, setRessource] = useState([]);

  useEffect(() => {
    const fetchRessource = async () => {
      try {
        if (instructeurId) {  
          const response = await axios.get(`http://localhost:3000/Ressource/getRessourceByInstructorId/${instructeurId}`, {
            headers: {
              // Utiliser le token dans l'en-tête de la requête si présent
              authorization: token ? `Bearer ${token}` : undefined,
            },
          });
          setRessource(response.data.Ressource);
        }
      } catch (error) {
        console.error('Error fetching Ressource:', error);
      }
    };
  
    fetchRessource();
  }, [instructeurId, token]); // Mettre à jour les Ressource lorsque l'ID de l'instructeur ou le token change

  const handleSupprimer = async (id_fp) => {
    try {
      // Définir le token d'authentification dans l'en-tête de la requête
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      
      // Effectuer la requête DELETE
      await axios.delete(`http://localhost:3000/Ressource/supprimer/${id_fp}`);
      toast.success('Ressource supprimée avec succès.');
      // Mettre à jour la liste des Ressource après la suppression
      const updatedRessource = Ressource.filter(form => form.id_fp !== id_fp);
      setRessource(updatedRessource);
    } catch (error) {
      console.error('Error deleting Ressource:', error);
      toast.error('Erreur lors de la suppression de la Ressource.');
    }
  };

  return (
    <div>
      <style>{`
        /* CSS pour le titre h1 */
        h1 {
          text-align: center; /* Centrer le texte */
          color: #333; /* Changer la couleur du texte */
          font-size: 2rem; /* Changer la taille de la police */
          font-weight: bold; /* Changer le poids de la police */
          margin-bottom: 20px; /* Ajouter de l'espace en bas */
          margin-top:20px; 
          color:#136c34; 
          font-family: 'Pacifico', cursive; /* Appliquer la police Pacifico */
        }

        /* CSS pour les cartes */
        .card-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 20px;
        }

        .card1 {
          width: calc(33.33% - 20px); /* Changer la largeur pour afficher trois cartes par ligne */
          background-color: #f9f9f9;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease;
        }

        .card1:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .card1 h2 {
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: #333;
        }

        .card1 p {
          font-size: 1rem;
          color: #666;
          margin-bottom: 10px;
        }

        .button-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .details-link {
        
          font-size: 1rem; /* Changer la taille de la police */
        
          color:#212121; 
          font-family: 'Pacifico', cursive; /* Appliquer la police Pacifico */
        }

      

        .modifier-button,
        .supprimer-button {
          padding: 8px 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
         
        }

        .modifier-button {
          background-color: #036475;
          color: #333;
        }

        .supprimer-button {
          background-color: #94e0ed;
          color: #fff;
        }

     
      `}</style>

      <h1>Liste des Ressource de l'instructeur</h1>

      <div className="card-container">
        {Ressource.map(Ressource => (
          <div className="card1" key={Ressource.id_r}>
          
            <h2>{Ressource.titre}</h2>
            <p className="description">Description : {Ressource.description}</p>
            <p> 
           
           
            <Link to={`/Ressource/getRessourceGById/${Ressource.id_r}`} className="details-button">Voir les détails</Link>
            </p>
            <div className="button-container"> 
              <button className="modifier-button">Modifier</button>
              <button className="supprimer-button" onClick={() => handleSupprimer(Ressource.id_r)}>Supprimer</button>
            </div>
            
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}

export default ListeresInstructeur;
