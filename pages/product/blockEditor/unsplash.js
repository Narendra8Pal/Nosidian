import { useEffect, useState } from 'react';

function PhotoSearch() {
  const [photos, setPhotos] = useState([]);
  const query = 'nature';
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`)
      .then(response => response.json())
      .then(data => {
        setPhotos(data.results);
      })
      .catch(error => {
        console.error('Error fetching photos:', error);
      });
  }, []);

  return (
    <div>
      {photos.map(photo => (
        <img key={photo.id} src={photo.urls.regular} alt={photo.alt_description} />
      ))}
    </div>
  );
}

export default PhotoSearch;
