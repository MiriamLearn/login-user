import food from '../images/food.jpg'
const Home = () => {
    return (
        <div style={{color: '#b7a710', textAlign: 'center', fontSize: '35px'}}>
          <img style={{width: "100%", height: "88vh", objectFit: "cover", objectPosition: "center", display: "block" }} src={food} alt="My Recipe Book" />
        </div>
      );
  };
  
  export default Home;
  