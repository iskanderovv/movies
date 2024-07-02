import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import parse from 'html-react-parser';
import axiosBase from "../../api";

const placeholderImage = 'https://placehold.co/300x400';


const SingleMovie = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosBase.get(`/shows/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const summaryContent = userData.summary ? parse(userData.summary) : '';

  return (
    <div className="max-w-[1200px] mx-auto mt-10 py-5">
      <div className="container mx-auto">
        {userData && (
          <div className="flex lg:flex md:flex sm:block xs:block gap-12 text-white">
            {userData.image && (
              <img
                src={userData.image.original || placeholderImage}
                width={300}
                alt={userData.name}
                onError={(e) => {
                  e.target.src = placeholderImage;
                }}
              />
            )}
            <div className="mt-12 sm:mt-12 xs:mt-12">
              <h4 className="text-2xl font-bold mb-4">{userData.name}:</h4>
              <p className="py-1">{summaryContent}</p>
              <h6 className="text-xl flex gap-1">
                Genres:
                {userData.genres?.map((genre, index) => (
                  <span key={index} className="text-[#0c8789]">
                    {genre}
                    {index < userData.genres.length - 1 ? "," : ""}
                  </span>
                ))}
              </h6>
              <h6 className="text-xl">
                Language: <i className="text-[#0c8789]">{userData.language}</i>
              </h6>
              <h6 className="text-xl">
                Country:{" "}
                {userData.network && userData.network.country && (
                  <i className="text-[#0c8789]">{userData.network.country.name}</i>
                )}
              </h6>
              <h6 className="text-xl">
                Premiered: <i className="text-[#0c8789]">{userData.premiered}</i>
              </h6>
              <h6 className="text-xl">
                Rating: <i className="text-[#0c8789]">{userData.rating?.average}</i>
              </h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleMovie;
