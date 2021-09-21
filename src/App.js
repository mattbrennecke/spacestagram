import './App.css';
import {Page, DatePicker, Button, Card, ButtonGroup} from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
import ImageCard from './ImageCard';
import { useEffect, useState, useCallback } from 'react';

function App() {
  //general variables
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [apiData, setApiData] = useState([]);

  //date picker variables
  const currentDate = new Date();
  const startingDate = new Date();
  startingDate.setDate(startingDate.getDate()-6);
  const [selectedDates, setSelectedDates] = useState({
    start: startingDate,
    end: currentDate,
  });
  const [{month, year}, setDate] = useState({month: currentDate.getMonth(), year: currentDate.getFullYear()});
  const [orderNewestFirst, setOrderNewestFirst] = useState(true);

  //date picker and sort button handlers
  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );
  const handleFirstButtonClick = useCallback(() => {
    if (orderNewestFirst) return;
    setLoaded(false);
    setOrderNewestFirst(true);
    // eslint-disable-next-line
  }, [orderNewestFirst]);
  const handleSecondButtonClick = useCallback(() => {
    if (!orderNewestFirst) return;
    setLoaded(false);
    setOrderNewestFirst(false);
    // eslint-disable-next-line
  }, [orderNewestFirst]);

  //element for rendering date picker and sort buttons
  const dateNavCard = (
    <Card>
      <DatePicker
        month={month}
        year={year}
        onChange={setSelectedDates}
        onMonthChange={handleMonthChange}
        selected={selectedDates}
        disableDatesBefore={new Date(1995, 5, 17)}
        disableDatesAfter={currentDate}
        allowRange
      />
      <Button onClick={() => setLoaded(false)}>Update Images for Selected Dates</Button>
      <ButtonGroup>
        <Button pressed={orderNewestFirst} onClick={handleFirstButtonClick}>Show Newest Images First</Button>
        <Button pressed={!orderNewestFirst} onClick={handleSecondButtonClick}>Show Oldest Images First</Button>
      </ButtonGroup>
    </Card>
  );

  //Call NASA API and store response when loaded variable changes
  useEffect(() => {
    fetch("https://api.nasa.gov/planetary/apod?start_date=" + selectedDates.start.toISOString().split('T')[0] + "&end_date=" + selectedDates.end.toISOString().split('T')[0] + "&api_key=uNyJYzbkG5g7PtOmPReYFiqARukERJKzwh3hQHM3")
      .then(
        (response) => {
          if(response.ok){
            return(response.json());
          }
          else{
            throw(Error(response.statusText));
          }
        }
      )
      .then(
        (data) => {
          if(orderNewestFirst){
            setApiData(data.reverse());
            setLoaded(true);
          }
          else{
            setApiData(data);
            setLoaded(true);

          }
        }
      )
      .catch(
        (thrownError) => {
          console.log(thrownError);
          setError(true);
        }
      )
      // eslint-disable-next-line
  }, [loaded])

  //conditionally return components to be rendered
  if(error){
    return(
      <Page title="Spacestagram" subtitle="Brought to you by NASA's Astronomy Picture of the Day (APOD) API.">
        {dateNavCard}
        <ImageCard textOnly="true" description="Error loading data from NASA API. Error logged to console." />
      </Page>
    );
  }
  else if (!loaded){
    return(
      <Page title="Spacestagram" subtitle="Brought to you by NASA's Astronomy Picture of the Day (APOD) API.">
        {dateNavCard}
        <ImageCard textOnly="true" description="Loading..." />
      </Page>
    );
  }
  else{
    return(
      <Page title="Spacestagram" subtitle="Brought to you by NASA's Astronomy Picture of the Day (APOD) API.">
        {dateNavCard}       
        {apiData.map((entry) => (
          <ImageCard title={entry.title} date={entry.date} description={entry.explanation} imgSrc={entry.url} textOnly="false" key={entry.title}/>
        ))}
      </Page>
    );
  }
}


export default App;
