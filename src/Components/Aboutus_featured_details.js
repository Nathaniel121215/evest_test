const Aboutusfeatureddetails = () => {
  const stats = [
    { value: "10,000+", label: "Cars sold annually" },
    { value: "4.7 stars", label: "On Google reviews" },
    { value: "100+", label: "Electric Cars Available Daily" },
    { value: "2000+", label: "Trees planted" },
  ];

  return (
    <div className="bg-[#F7F8FB] py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="text-4xl font-extrabold text-[#2A7EF5]">{stat.value}</p>
            <p className="text-gray-500 mt-3 text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aboutusfeatureddetails;
