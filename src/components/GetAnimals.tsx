import axios from "axios";
import { IAnimals } from "../models/IAnimals";
import { useState, useEffect } from "react";

export const useGetAnimals = () => {
  const [animals, setAnimals] = useState<IAnimals[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const animalsLS = localStorage.getItem("animals");

    if (animalsLS) {
      setAnimals(JSON.parse(animalsLS));
      setLoading(false);
    } else {
      axios
        .get<IAnimals[]>("https://animals.azurewebsites.net/api/animals/")
        .then((response) => {
          setAnimals(response.data);
          localStorage.setItem("animals", JSON.stringify(response.data));
          setLoading(false);
        });
    }
  }, []);

  return { animals, loading };
};
