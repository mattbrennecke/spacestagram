import {MediaCard} from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
import {useState} from 'react';

function ImageCard(props) {
  const [likeString, setLikeString] = useState("Like");

  //conditionally render based on textOnly prop
  if(props.textOnly === "true"){
    return (
      <MediaCard portrait description={props.description} />
    );
  }
  else{
    return (
      <MediaCard
          portrait
          title={props.title + " (" + props.date + ")"}
          primaryAction={{
              content: likeString,
              onAction: () => {
                if(likeString === "Like"){setLikeString("Unlike");}
                else{setLikeString("Like");}
              },
          }}
          description={props.description}
          >
          <img alt={props.title} width="100%" height="100%" src={props.imgSrc} style={{objectFit:'cover', objectPosition:'center'}} />
      </MediaCard>
    );
  }
}


export default ImageCard;