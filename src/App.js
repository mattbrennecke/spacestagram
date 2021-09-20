import './App.css';
import {Page} from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
import ImageCard from './ImageCard';

function App() {
  return (
    <Page title="Spacestagram" subtitle="Brought to you by NASA's image API.">
      <ImageCard imgsrc="./logo512.png" />
      <ImageCard imgsrc="./logo192.png" />
    </Page>
  );
}

export default App;
