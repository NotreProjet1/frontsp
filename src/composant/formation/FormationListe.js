import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../css/formationlist.css'; 

const FormationsList = () => {
  const [formations, setFormations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/formationP/lister`);
        const filteredFormations = response.data.liste.filter(formation => formation.status === 1);
        setFormations(filteredFormations);
      } catch (error) {
        console.error('Erreur lors de la récupération des formations :', error);
      }
    };

    fetchFormations();
  }, []);

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    setSearchQuery(searchTerm);
  
    try {
      const response = await axios.get(`http://localhost:3000/formationP/searchByDomaine?domaine=${searchTerm}`);
      console.log('Réponse de la recherche :', response.data); 
      const filteredFormations = response.data.formations.filter(formation => {
        const lowerCaseDomaine = formation.domaine.toLowerCase();
        return lowerCaseDomaine.includes(searchTerm);
      });
      setFormations(filteredFormations);
    } catch (error) {
      console.error('Erreur lors de la récupération des formations :', error);
    }
  };

  // Afficher toutes les formations si la recherche est vide, sinon afficher les formations filtrées 
  const displayFormations = searchQuery === '' ? formations : formations.filter(formation => formation.domaine.toLowerCase().includes(searchQuery));
  return (
    <div className="formations-container">
      <h1 className="formations-title">Liste des formations payantes :</h1>

      <input
        type="text"
        placeholder="Rechercher par domaine..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />

      <div className="cardDs-container">
        {displayFormations.map((formation) => (
          <div className="formation-card" key={formation.id_fp}>
            <h2 className="formation-title">{formation.titre}</h2>
            <p className="formation-info">Domaine : {formation.domaine} | Niveau : {formation.niveaux}</p>
            <p className="formation-description">Description : {formation.description}</p>
            <p className="formation-price">Prix : {formation.prix}</p>
            <div className="button-container">
              <Link to={`/formationP/getFormationById/${formation.id_fp}`} className="details-button">Voir les détails</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormationsList;
