module.exports = {

    'facebookAuth' : {
        'clientID'      : '316488025742270', // App ID
        'clientSecret'  : '9337e5d68a1f0379b5d2b7ed3296fb83', // App Secret
        'callbackURL'   : 'http://localhost:2000/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // requisitando permissões da API Facebook
    },    

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:2000/auth/google/callback'
    }

};
