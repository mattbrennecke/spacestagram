import {MediaCard} from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';

function ImageCard(props) {
  return (
    <MediaCard
        portrait
        title="Image title and date might go here"
        primaryAction={{
            content: "Like button",
            onAction: () => {},
        }}
        description="Description text goes here."
        >
        <img alt="" width="100%" height="100%" src={props.imgsrc} style={{objectFit:'cover', objectPosition:'center'}} />
    </MediaCard>
  );
}

export default ImageCard;