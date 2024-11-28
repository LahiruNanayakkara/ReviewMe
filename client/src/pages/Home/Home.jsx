import CreatePost from "../../features/CreatePost";
import ReviewList from "../../features/ReviewList";
import HeroSection from "./HeroSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <CreatePost />
      <ReviewList />
    </>
  );
};

export default Home;
