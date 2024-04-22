import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/formationlist.css';
import { ToastContainer } from 'react-toastify';

const FormationAdmin = () => {
  const [formations, setFormations] = useState([]);
  const [allFormations, setAllFormations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [acceptedFormations, setAcceptedFormations] = useState(new Set());
  const [rejectedFormations, setRejectedFormations] = useState(new Set());

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/formationP/lister`);
        setFormations(response.data.liste);
        setAllFormations(response.data.liste);
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
      const filteredFormations = response.data.formations.filter(formation => {
        const lowerCaseDomaine = formation.domaine.toLowerCase();
        return lowerCaseDomaine.includes(searchTerm);
      });
      setFormations(filteredFormations);
    } catch (error) {
      console.error('Erreur lors de la récupération des formations :', error);
    }
  };

  const handleAccept = async (id) => {
    if (acceptedFormations.has(id)) {
      toast.error('Cette formation a déjà été acceptée.');
      return;
    }
    if (rejectedFormations.has(id)) {
      toast.error('Cette formation a déjà été refusée.');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/formationP/accepter/${id}`);
      setAcceptedFormations(new Set([...acceptedFormations, id]));
      const updatedFormations = formations.map(formation =>
        formation.id_fp === id ? { ...formation, status: 1 } : formation
      );
      setFormations(updatedFormations);
      toast.success('Formation acceptée avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'acceptation de la formation :', error);
    }
  };

  const handleReject = async (id) => {
    if (rejectedFormations.has(id)) {
      toast.error('Cette formation a déjà été refusée.');
      return;
    }
    if (acceptedFormations.has(id)) {
      toast.error('Cette formation a déjà été acceptée.');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/formationP/refuser/${id}`);
      setRejectedFormations(new Set([...rejectedFormations, id]));
      const updatedFormations = formations.map(formation =>
        formation.id_fp === id ? { ...formation, status: 0 } : formation
      );
      setFormations(updatedFormations);
      toast.success('Formation refusée avec succès.');
    } catch (error) {
      console.error('Erreur lors du refus de la formation :', error);
    }
  };

  const displayFormations = searchQuery === '' ? allFormations : formations || [];

  return (
    <div className="formations-list">
      <ToastContainer />

      <h1>Demande de Formation</h1>

      <input 
        type="text" 
        placeholder="Rechercher par domaine..." 
        value={searchQuery} 
        onChange={handleSearchChange} 
      />

      <div className="cards-container">
        {displayFormations.map((formation) => (
          <div className="card" key={formation.id_fp}>
            <h2>{formation.titre}</h2>
            <p className="domaine-niveau">Domaine : {formation.domaine} | Niveau : {formation.niveaux}</p>
            <p className="description">Description : {formation.description}</p>
            <p className="prix">Prix : {formation.prix}</p>
            <div className="button-container">
              <button onClick={() => handleAccept(formation.id_fp)} className="accept-button">Accepter</button>
              <button onClick={() => handleReject(formation.id_fp)} className="reject-button">Refuser</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormationAdmin;
