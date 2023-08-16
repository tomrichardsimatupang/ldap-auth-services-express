const authenticateLDAP = require('../middlewares/auth.middleware');

const authService = (app) => {

    app.post('/ldap-service/v1/auth', async (req, res) => {

        const { username, password } = req.body;
    
        try {
            await authenticateLDAP(username, password);
            res.status(200).json({ message: 'Login successful' });
        } catch (err) {
            res.status(401).json({ message: 'Login failed' });
        }
    
    });

}

module.exports = authService;