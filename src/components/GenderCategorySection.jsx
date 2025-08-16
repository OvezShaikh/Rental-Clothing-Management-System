import { useNavigate } from "react-router-dom";
import { images } from "../constants/images";

const GenderCategorySection = () => {
  const navigate = useNavigate();

  const handleNavigate = (gender) => {
    navigate("/catalog", { state: { gender } });
  };

  return (
    <section className="flex flex-col md:flex-row gap-4 px-2 md:px-10 dark:bg-black dark:text-white">
      {/* For Her */}
      <div
        onClick={() => handleNavigate("womens")}
        className="relative cursor-pointer w-full md:w-1/2 aspect-[3/2] md:aspect-auto h-[300px] md:h-[400px] overflow-hidden group"
      >
        <img
          src={images.homeforher}
          alt="For Her"
          className="w-full h-full object-cover group-hover:brightness-75 transition"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold">FOR HER</h2>
        </div>
      </div>

      {/* For Him */}
      <div
        onClick={() => handleNavigate("mens")}
        className="relative cursor-pointer w-full md:w-1/2 aspect-[3/2] md:aspect-auto h-[300px] md:h-[400px] overflow-hidden group"
      >
        <img
          src={images.homeforhim}
          alt="For Him"
          className="w-full h-full object-cover group-hover:brightness-75 transition"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold">FOR HIM</h2>
        </div>
      </div>
    </section>

  );
};

export default GenderCategorySection;
