import { useGetAnimals } from "../components/GetAnimals";
import "./Animals.scss";
import { Link } from "react-router-dom";


export const Animals = () => {
  const { animals } = useGetAnimals();
  console.log(animals);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src =
      "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg";
  };

  return (
    <>
      <h2>Alla våra djur</h2>

      <div className="showAnimals" >
        {animals.map((animal, i) => (
          <div className="animal" key={i}>
            <Link to={`${animal.id}`}>
              <h3>{animal.name}</h3>
              <img
                src={animal.imageUrl}
                alt={animal.name}
                onError={handleImageError}
              />
            </Link>
            <p>{animal.shortDescription}</p>
          </div>
        ))}
      </div>
    </>
  );
};
