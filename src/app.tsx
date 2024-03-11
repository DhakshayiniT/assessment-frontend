import {Grid} from '@mui/material'
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from 'react-router-dom';
import { fetchPage, PageData } from './api';
import ImageComponent from './components/ImageComponent';
import WeatherComponent from './components/WeatherComponent';
import ButtonComponent from './components/ButtonComponent';
import ConditionComponent from './components/ConditionComponent';

const Page: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [variables, setVariables] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPage(id);
        setPageData(data);
        // Extract variables and set initial values
        const initialVariables: Record<string, any> = {};
        data.variables?.forEach(variable => {
          initialVariables[variable.name] = variable.initialValue;
        });
        setVariables(initialVariables);
      } catch (error) {
        console.error('Error fetching page data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!pageData || !variables) return <div>Loading...</div>;

  // Function to handle button click and toggle variable value
  const handleButtonClick = (variableName: string, value: any) => {
   
    setVariables(prevState => ({
      ...prevState,
      [variableName]: value
    }));
  };

  return (
    <div className="page-container" style={{backgroundColor:"#eee4e4",padding:"24px",width:"100vh"}}>
      {pageData.lists.map((list) => (
        <div key={list.id} className="component-container" style={{textAlign:"center"}}>
          {list.components.map((componentId) => {
            const component = pageData.components.find(
              (c) => c.id === componentId
            );
            if (!component) return null;
            switch (component.type) {
              case 'button':
                return (
                  <Grid container justifyContent={"center"}>
                  {variables['show_image']!==component.options.value&&
                  <ButtonComponent
                    key={component.id}
                    text={component.options.text}
                    onClick={() => {
                      handleButtonClick(component.options.variable, component.options.value);
                    }}
                  />
                }
                  </Grid>
                );
              case 'image':
                return ( <Grid container justifyContent={"center"}>
                  {variables['show_image']=="show"&&
                  <ImageComponent
                    key={component.id}
                    src={component.options.src}
                    alt={component.options.alt}
                  />
                }</Grid>
                );
              case 'weather':
                return (
                  <Grid container justifyContent={"center"}>
                  <WeatherComponent
                    key={component.id}
                    lat={component.options.lat}
                    lon={component.options.lon}
                    // className="weather"
                  />
                  </Grid>
                );
              case 'condition':
                return (
                  <ConditionComponent
                    key={component.id}
                    condition={variables[component.options.variable] === component.options.value}
                  >
                    {/* Add child components here */}
                  </ConditionComponent>
                );
              default:
                return null;
            }
          })}
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:id" children={<Page />} />
      </Switch>
    </Router>
  );
};

export default App;
