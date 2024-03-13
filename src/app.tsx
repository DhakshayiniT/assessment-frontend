import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import { fetchPage, PageData } from './api';
import ImageComponent from './components/ImageComponent';
import WeatherComponent from './components/WeatherComponent';
import ButtonComponent from './components/ButtonComponent';
import {Grid} from '@mui/material'

const Page: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [variables, setVariables] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPage(id);
        setPageData(data);
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

  const handleButtonClick = (variableName: string, value: any) => {
    setVariables(prevState => ({
      ...prevState,
      [variableName]: value
    }));
  };

  if (!pageData || !variables) return <div>Loading...</div>;

  return (
    <div className="page-container" style={{ backgroundColor: "#eee4e4", padding: "24px" ,textAlign:"center"}}>
      {/* Display initial weather and image */}
      <Grid container justifyContent={"center"}>
      <WeatherComponent
        key="initial-weather"
        lat={pageData.components.find(component => component.type === 'weather' && component.options.lat)?.options.lat || ''}
        lon={pageData.components.find(component => component.type === 'weather' && component.options.lon)?.options.lon || ''}
      />
      </Grid>
      <Grid container justifyContent={"center"}>
      <ImageComponent
        key="initial-image"
        src={pageData.components.find(component => component.type === 'image')?.options.src || ''}
        alt={pageData.components.find(component => component.type === 'image')?.options.alt || ''}
      />
      </Grid>
      {/* Render buttons */}
      <div className="button-container">
        {pageData.lists.map((list) => (
          list.components.map((componentId) => {
            const component = pageData.components.find((c) => c.id === componentId);
            if (!component || component.type !== 'button') return null;
            return (
              <Grid container justifyContent={"center"}>
              <ButtonComponent
                key={component.id}
                text={component.options.text}
                onClick={() => handleButtonClick(component.options.variable, component.options.value)}
                disabled={variables['location'] === component.options.value}
              />
              </Grid>
            );
          })
        ))}
      </div>
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

