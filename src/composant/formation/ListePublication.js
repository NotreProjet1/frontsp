import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';

const PublicationsList = () => {
  const [publications, setpublications] = useState([]);

  useEffect(() => {
    const fetchpublications = async () => {
      try {
        const response = await axios.get('http://localhost:3001/publication/lister');
        setpublications(response.data.liste);
      } catch (error) {
        console.error('Erreur lors de la récupération des publications :', error);
      }
    };

    fetchpublications();
  }, []);

  return (
    <div>
      <h1>Liste des publications payantes :</h1>
      <ul>
        {publications.map((publication) => {
          // const baseFilePath = process.env.REACT_APP_PATHFILR;
          const baseFilePath = 'http://localhost:3001/uploads/';


          // Dans la fonction de rendu où vous construisez l'URL des fichiers
          const filePath = baseFilePath + publication.contenu;

          return (
            <li key={publication.id_public}>
              <h2>{publication.titre}</h2>
            
              <p>Description : {publication.description}</p>
            

              {publication.contenu && (
                <div>
                  <Document file={filePath}>
                    <Page pageNumber={1} />
                  </Document>

                  <a href={filePath} download={publication.contenu.split('').pop()} target="_blank">
                    Télécharger le fichier
                  </a>

                </div>
                
              )}
                        <Link to={`/publication/getPublicationById/${publication.id_public}`}>Voir les détails</Link>

            </li>
          );
        })}
      </ul>

    </div>
  );
};

export default PublicationsList;
