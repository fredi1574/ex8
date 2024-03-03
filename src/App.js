import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [thumbnails, setThumbnails] = useState([]);
  const [fullSizeImage, setFullSizeImage] = useState(null);

  useEffect(() => {
    fetchThumbnails();
  }, []);

  const fetchThumbnails = () => {
    fetch("https://picsum.photos/v2/list?page=1&limit=32")
      .then((response) => response.json())
      .then((data) => {
        const updatedThumbnails = data.map((item) => ({
          ...item,
          thumbnail_url: `https://picsum.photos/id/${item.id}/100`,
        }));
        setThumbnails(updatedThumbnails);
      })
      .catch((error) => {
        console.error("Error fetching thumbnails:", error);
      });
  };

  const showFullSize = (image) => {
    setFullSizeImage({
      id: image.id,
      url: `https://picsum.photos/id/${image.id}/600`,
    });
  };

  return (
    <div>
      <h1>Picsum Photos Gallery</h1>

      <div className="thumbnails-container">
        {thumbnails.map((thumbnail) => (
          <div
            key={thumbnail.id}
            className="thumbnail"
            onClick={() => showFullSize(thumbnail)}
          >
            <img
              src={thumbnail.thumbnail_url}
              alt={`Thumbnail ${thumbnail.id}`}
              width="50"
              height="50"
            />
          </div>
        ))}
      </div>

      {fullSizeImage && (
        <div className="full-size">
          <h2>Full Size Image</h2>
          <img src={fullSizeImage.url} alt={`Full Size ${fullSizeImage.id}`} />
        </div>
      )}
    </div>
  );
}

export default App;
