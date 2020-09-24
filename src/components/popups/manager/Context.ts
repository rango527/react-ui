import {createContext} from 'react';

export const Context = createContext({
  popupManager: null
});

Context.displayName = 'reactUI_PopupsManagerContext';
