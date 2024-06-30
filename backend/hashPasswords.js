const bcrypt = require("bcryptjs");
const connection = require("./connection");

const saltRounds = 10;

const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

const updatePassword = async (userId, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE user SET user_password = ? WHERE user_id = ?";
    connection.query(query, [hashedPassword, userId], (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

const hashExistingPasswords = async () => {
  try {
    // Fetch all users from the database
    const query = "SELECT user_id, user_password FROM user";
    connection.query(query, async (err, results) => {
      if (err) {
        console.error("Error fetching user:", err);
        return;
      }

      for (const user of results) {
        const { user_id, user_password } = user;

        // Check if the password is already hashed
        if (!user_password.startsWith("$2a$")) {
          try {
            const hashedPassword = await hashPassword(user_password);
            await updatePassword(user_id, hashedPassword);
            console.log(
              `Password for user ${user_id} has been hashed and updated.`
            );
          } catch (updateErr) {
            console.error(
              `Error updating user ${user_id} password:`,
              updateErr
            );
          }
        } else {
          console.log(`Password for user ${user_id} is already hashed.`);
        }
      }

      // Close the connection after all updates are done
      connection.end();
    });
  } catch (err) {
    console.error("Error hashing passwords:", err);
    connection.end();
  }
};

hashExistingPasswords();
