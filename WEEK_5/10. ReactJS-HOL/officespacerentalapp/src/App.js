import './App.css';

function App() {
  // JSX variable for heading text
  let element = "Office Space";

  // Office space image URL (online image)
  let sr = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop";

  // JSX attribute - image element
  let jsxatt = <img src={sr} width="25%" height="25%" alt="Office Space" />;

  // Array of office space objects
  let offices = [
    { Name: "DBS", Rent: 50000, Address: "Chennai" },
    { Name: "WeWork", Rent: 75000, Address: "Bangalore" },
    { Name: "Regus", Rent: 45000, Address: "Mumbai" },
    { Name: "Cowork", Rent: 85000, Address: "Hyderabad" }
  ];

  return (
    <div className="App">
      <h1>{element}, at Affordable Range</h1>
      
      {jsxatt}

      <div className="offices-list">
        {offices.map((office, index) => {
          // Determine color class based on Rent
          let colors = [];
          if (office.Rent <= 60000) {
            colors.push('textRed');
          } else {
            colors.push('textGreen');
          }

          return (
            <div className="office-card" key={index}>
              <h2>Name: {office.Name}</h2>
              <h3 className={colors[0]}>Rent: Rs. {office.Rent}</h3>
              <h3>Address: {office.Address}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
