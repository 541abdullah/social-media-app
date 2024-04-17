import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import {configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import storyreducer from './features/story.js';
import yourreducer from './features/you.js';
import loadreducer from './features/loader.js';
import storydatreducer from './features/storydata.js';
import profilereducer from './features/profile.js';
import leftpainreducer from './features/leftp.js';
import iconresetreducer from './features/iconreseter.js';
import nextimgreducer from './features/nextrequested.js';
import nextprofimgreducer from './features/nextreqprofile.js';
import followunfollowreducer from './features/followunfollow.js';
import settingsreducer from './features/forsettings.js';
import notifprofreducer from './features/notifvisit.js';
import themereducer from './features/theme.js';
import newpostreducer from './features/newpost.js';


import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';



const persistYourConfig = {
    key: 'yourroot',
    storage,
}

const persistStorydatConfig = {
    key: 'storydatroot',
    storage,
}

const persistSettingsConfig = {
    key: 'settingsroot',
    storage,
}

const persistProfileConfig = {
    key: 'profileroot',
    storage,
}

const persistThemeConfig = {
    key: 'themeroot',
    storage,
}

const persistLeftpConfig = {
    key: 'leftpsetsroot',
    storage,
}


  
const persistedYourReducer = persistReducer(persistYourConfig, yourreducer);
const persistedStorydatReducer = persistReducer(persistStorydatConfig, storydatreducer);
const persistedSettingsReducer = persistReducer(persistSettingsConfig, settingsreducer);
const persistedProfileReducer = persistReducer(persistProfileConfig, profilereducer);
const persistedThemeReducer = persistReducer(persistThemeConfig,themereducer);
const persistedLeftpReducer = persistReducer(persistLeftpConfig,leftpainreducer);



//global store

let globalstore=configureStore({
    reducer:{
        storyr:storyreducer,
        youryr:persistedYourReducer,
        loadyr:loadreducer,
        storydat:persistedStorydatReducer,
        profdat:persistedProfileReducer,
        selectedleftp:persistedLeftpReducer,
        iconresetyr:iconresetreducer,
        nextimgyr:nextimgreducer,
        followyr:followunfollowreducer,
        nextprofimgyr:nextprofimgreducer,
        settingdefault:persistedSettingsReducer,
        notifprofilevisit:notifprofreducer,
        newpostadder:newpostreducer,
        themeyr:persistedThemeReducer
    },
    middleware:[thunk]
});


const persistor = persistStore(globalstore);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={globalstore}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
    
    
    
    
);

