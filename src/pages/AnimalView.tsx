import { useParams } from "react-router";
import { useGetAnimals } from "../components/GetAnimals";
import "./AnimalView.scss";
import { IAnimals } from "../models/IAnimals";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export const AnimalView = () => {
  const { id } = useParams();
  if (!id) {
    return <div>Error id not provided!</div>;
  }

  const [needsFeeding, setNeedsFeeding] = useState(false);
  const { animals, loading } = useGetAnimals();
  const [currentAnimal, setCurrentAnimal] = useState<any>();

  useEffect(() => {
    const test = animals.find((animal) => animal.id === +id);
    setCurrentAnimal(test);
    console.log("test", animals);
  }, [animals]);

  useEffect(() => {
    if (currentAnimal) {
      const updatedAnimals = animals.map((animal: IAnimals) => {
        if (animal.id === currentAnimal?.id) {
          return currentAnimal;
        }
        return animal;
      });
      console.log(currentAnimal);

      localStorage.setItem("animals", JSON.stringify(updatedAnimals));
    }
    checkNeedsFeeding();
    const interval = setInterval(checkNeedsFeeding, 1000);

    return () => clearInterval(interval);
  }, [currentAnimal]);

  if (loading) {
    return <div> Loading </div>;
  }
  if (!currentAnimal) {
    return <div> Animal not found</div>;
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src =
      "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg";
  };

  const handleFed = () => {
    const updatedTime = DateTime.now().toISO({
      includeOffset: false,
    }) as string;

    console.log("updatedTime", updatedTime);

    setCurrentAnimal((prevState: any) => ({
      ...prevState,
      lastFed: updatedTime,
    }));
  };

  function checkNeedsFeeding() {
    console.log("checkNeedsFeeding", currentAnimal);

    if (!currentAnimal) return;

    const now = DateTime.now();
    const lastFedDate = DateTime.fromISO(currentAnimal.lastFed);
    const minutesDiff = now.diff(lastFedDate, "minutes").minutes;
    console.log("timediff", minutesDiff);

    setNeedsFeeding(minutesDiff >= 180);
  }

  return (
    <>
      <div className="currentAnimal">
        <h2>
          {currentAnimal?.name} - {currentAnimal?.latinName}
        </h2>
        <img
          src={currentAnimal?.imageUrl}
          alt={currentAnimal?.name}
          onError={handleImageError}
        />
        <h3> {currentAnimal?.yearOfBirth}</h3>
        <p>{currentAnimal?.longDescription}</p>
        <p>Medicin: {currentAnimal?.medicine}</p>
        <h3>Senast Matad</h3>

        <p className={needsFeeding ? "notFed" : "fed"}>
          {currentAnimal?.lastFed}
        </p>
        <button onClick={handleFed} className={needsFeeding ? "" : "noClick"}>
          Mata
        </button>
        <p>
          {currentAnimal.name} {needsFeeding ? "är hungrig!" : "är mätt!"}
        </p>
      </div>
    </>
  );
};
