import { useParams } from "react-router-dom";
export const ProfilePage = () => {
  const { name } = useParams();
  return (
    <div>
      <h1>Hello {name}</h1>
    </div>
  );
};
