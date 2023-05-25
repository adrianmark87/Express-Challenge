const users = [
    {
      id: 1,
      firstname: "Citizen Kane",
      lastname: "Orson Wells",
      email: "citizen@gmail.com",
      city: 'London',
      language: 'English',
    },
    {
        id: 1,
        firstname: "Maria",
        lastname: "Mary",
        email: "maria@gmail.com",
        city: 'New York',
        language: 'English',
    },
    {
        id: 1,
        firstname: "Orlando",
        lastname: "Magic",
        email: "magic@gmail.com",
        city: 'Naples',
        language: 'Italian',
    },
  ];
  
  const database = require("./database");
  
  const getUsers = (req, res) => {
    database
      .query("select * from users")
      .then(([users]) => {
        res.json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };
  
  const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
  
     database
      .query("select * from users where id = ?", [id])
      .then(([users]) => {
        if (users[0] != null) {
          res.json(users[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };
  
  module.exports = {
    getUsers,
    getUserById,
  };
  
  
  