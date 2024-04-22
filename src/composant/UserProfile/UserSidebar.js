import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './UserSidebar.css';

const UserSidebar = ({ activePage, userId, userdata }) => {
  const history = useHistory();

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    switch (selectedOption) {
      case 'travail':
        history.push('/votre-travail');
        break;
      case 'formation':
        history.push(`/ListeFormationInstructeur?userId=${userId}`);
        break;
      case 'cours':
        history.push(`/ListecoursInstructeur?userId=${userId}`);
        break;
      case 'ressource': 
        history.push(`/ListeresInstructeur?userId=${userId}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className='usersidebar'>
      <div className={`s1 ${activePage === 'ListeFormationInstructeur' ? 'active' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <select className="select-option" onChange={(e) => handleOptionChange(e)}>
          <option value="travail" selected={activePage === 'travail'}>Votre travail</option>
          <option value="formation" selected={activePage === 'formation'}>Liste des formations</option>
          <option value="cours" selected={activePage === 'cours'}>Liste des cours</option> 
          <option value="ressource" selected={activePage === 'ressource'}>Liste des ressources</option>  
        </select>
      </div>

      <Link to={`/accountsettings?userId=${userId}&userData=${encodeURIComponent(JSON.stringify(userdata))}`} className={activePage === 'accountsettings' ? 'active' : ''}>
        <div className='s1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Paramètres du compte</span>
        </div>
      </Link>

      {/* Liens avec l'ID de l'utilisateur inclus */}
      <Link to={`/AddFormationForm?userId=${userId}`} className={activePage === 'ListeFormationInstructeur' ? 'active' : ''}>
        <div className='s1'>
          <span>add des formations</span>
        </div>
      </Link>

      <Link to={`/AddCours?userId=${userId}`} className={activePage === 'liste-cours' ? 'active' : ''}>
        <div className='s1'>
          <span>add des cours</span>   
        </div>
      </Link> 

      <Link to={`/AddRessource?userId=${userId}`} className={activePage === 'liste-ressources' ? 'active' : ''}>
        <div className='s1'>
          <span>add des ressources</span>
        </div>
      </Link>  
      <Link to={`/AddPublication?userId=${userId}`} className={activePage === 'liste-ressources' ? 'active' : ''}>
        <div className='s1'>
          <span>add Publication</span>
        </div>
      </Link>
    </div>
  );
}

export default UserSidebar;
