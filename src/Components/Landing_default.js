import Landing_Image_Mobile from '../Assets/Landing_Image_Mobile.svg';
import Landing_Image_Desktop from '../Assets/Landing_Image.svg';
import Landing_Next_Icon from '../Assets/Landing_Next_Icon.svg';

const Landingdefault = () => {


  return (
    <div>

      <div
        className="w-full max-w-[1500px] mx-auto h-[350px] lg:h-[430px] bg-cover bg-center flex flex-col justify-center text-white px-5 lg:px-10 rounded-b-[30px] lg:rounded-b-[50px] overflow-hidden"
        style={{
          backgroundImage:
            window.innerWidth >= 1024
              ? `url(${Landing_Image_Desktop})` // No gradient on lg
              : `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.07)), url(${Landing_Image_Mobile})`, // Gradient on mobile
        }}
      >
        {/* Content */}
        <div>
          {/* Header */}
          <h1 className="text-[40px] lg:text-[60px] font-bold mb-3 leading-[1.2] lg:leading-[1]">
            Drive the Future.<br />
            Go Electric Today!
          </h1>
          <p className="text-[18px] lg:text-[20px] font-semibold mb-6 leading-[1.3]">
            Find your dream electrical car with evest dealership.
          </p>

     
        </div>
      </div>
      
    </div>
  );
};

export default Landingdefault;