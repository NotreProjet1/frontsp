import React, { useState,useEffect  } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SearchComponent from './composant/SearchComponent';
import './css/themecolor.css';
import  './App.css';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import listeProfil from './composant/listeProfilPar';
import CertificatesTable from './composant/liste';
import Login from './composant/login';
import VideoPage from './composant/vedio';
import publication from './composant/publication';
import FormationAdmin from './composant/formation/formationAdmin';

import HomeFinal from './composant/homefinal';
import ParticipantRegister from './composant/participant/registreparticipant';
import Register from './composant/registreinstructeur';
import AddCours from './composant/formation/addCours';
import AffichCours from './composant/formation/courslister'; 
import UserProfilParticipant from './composant/participant/profil';

import UserProfileParticipant from './composant/participant/profil';  
import UserProfile from './composant/UserProfile/UserProfile';
import ModifierInstructeur from './composant/modifierInstructeur';
import ChangePassword from './composant/UserProfile/ChangePassword';
import AccountSettings from './composant/UserProfile/AccountSettings';
import Footer from './composant/footer';


import AddPublication from './composant/formation/addPublication';
import AddRessource from './composant/formation/addRessource';
import CoursGList from './composant/formation/courslister';
import Navbar from './composant/nav';


import SingleCours from './composant/formation/iframCours';
import FormationsList from './composant/formation/FormationListe';
import SingleFormation from './composant/formation/detailllistformation';
import SinglePublication from './composant/formation/iframPublication';
import PublicationsList from './composant/formation/ListePublication';
import RessourceList from './composant/formation/listRessources';
import SingleRessource from './composant/formation/DetaillRessource';
import AddFormationForm from './composant/formation/newformation';
import ListeFormationInstructeur from './composant/UserProfile/listerFormationinstructeur';

import axiosInstance from './composant/axiosInstance';
import PageCollectionsDev from './composant/collectionMarek';
import aboutnous from './composant/aboutnous';
import Contact from './composant/contatcttt';
import ListeresInstructeur from './composant/UserProfile/listressinst';
import ListecoursInstructeur from './composant/UserProfile/listeCoursInstructeur';

const App = () => {
  const [value, setValue] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state for isLoggedIn
  const [userRole, setUserRole] = useState('participant'); // State for user role
  const [instructeurData, setInstructeurData] = useState(null); // State for instructeurData

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('role');
    const instructeurData = JSON.parse(localStorage.getItem('instructeurData')); 

    if (loggedInStatus) {
      setIsLoggedIn(true);
      setUserRole(role); 
      setInstructeurData(instructeurData); 
    }
  }, []);



  return (
    <Router>
      <div>
      <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn} role={userRole} instructeurData={instructeurData} /> 

        {showSearch && <SearchComponent />}
        <Switch>
          <Route exact path="/" component={HomeFinal} />
        
 
          <Route path="/VideoPage" component={VideoPage} />
          <Route path="/FormationAdmin" component={FormationAdmin} />

       
          <Route path="/UserProfile/:instructeurData" component={UserProfile} />
          <Route path="/UserProfileParticipant" component={UserProfileParticipant} />

          <Route path="/listeProfil" component={listeProfil} />
          <Route path="/CertificatesTable" component={CertificatesTable} />
          <Route path="/Register" component={Register} />
          <Route path="/publication  " component={publication} />
          <Route path="/HomeFinal" component={HomeFinal} />
          <Route path="/login">
            <Login setLoggedIn={setIsLoggedIn} />
          </Route>

         {/* deffinition */}
          <Route path="/Contact" component={Contact} />
          <Route path="/aboutnous" component={aboutnous} />
          
          

          <Route path="/PageCollectionsDev" component={PageCollectionsDev} />
          <Route path="/ParticipantRegister" component={ParticipantRegister} />
       
          
          <Route path="/UserProfilParticipant" component={UserProfilParticipant} />
          <Route path="/UserProfile" component={UserProfile} />
          <Route path="/AccountSettings/:userId" component={AccountSettings} />
          <Route path="/ModifierInstructeur" component={ModifierInstructeur} />
          <Route path="/ChangePassword" component={ChangePassword} /> 
          <Route path="/AccountSettings" component={AccountSettings} /> 
          {/* ajouter les  */}
          <Route path="/AddCours" component={AddCours} />
          <Route path="/AffichCours" component={AffichCours} />
          <Route path="/AddRessource" component={AddRessource} />
          <Route path="/AddPublication" component={AddPublication} /> 
         {/* detaiiler pour les lister  */}
          <Route path="/publication/getPublicationById/:id" component={SinglePublication} />     
          <Route path="/formationP/getFormationById/:id" component={SingleFormation} />   
          <Route path="/coursgratuis/getCoursById/:id" component={SingleCours} />     
          <Route path="/Ressource/getRessourceGById/:id" component={SingleRessource} />   
          
          {/* lister  */}
          <Route path="/CoursGList" component={CoursGList} /> 
          <Route path="/FormationsList" component={FormationsList} /> 
          <Route path="/RessourceList" component={RessourceList} />
          <Route path="/PublicationsList" component={PublicationsList} />
          <Route path="/AddFormationForm" component={AddFormationForm} /> 

          {/* liste pour instructeur   */}
          <Route path="/ListeFormationInstructeur" component={ListeFormationInstructeur} />    
          <Route path="/ListeresInstructeur" component={ListeresInstructeur} />     
          <Route path="/ListecoursInstructeur" component={ListecoursInstructeur} />     
          <Route path="/axiosInstance" component={axiosInstance} />     
          
        </Switch>

      </div>

      <Footer />
    </Router>
  );
};

export default App;
