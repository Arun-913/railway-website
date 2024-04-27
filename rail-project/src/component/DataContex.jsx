import { createContext, useContext, useState} from 'react';

const DataContext = createContext();

export const DataProvider = (props) => {
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(false);
  const [trainDetails, setTrainDetails] = useState(null);

  return (
    <DataContext.Provider value={{ user, setUser , 
      visible, setVisible, trainDetails, setTrainDetails}}>
      {props.children}
    </DataContext.Provider>
  );
};

export const useDataContex = () => useContext(DataContext);
