export default {
    JWT_SECRET: process.env.SECRET_KEY || 'fwhfeiowhliu23oihfnoebewh',
    GEOLOCALIZACAO_API_URL: process.env.NODE_ENV === 'dev' ? 
        'http://localhost:8081/geolocation' : 
        'https://api-geolocalizacao-binno.herokuapp.com/geolocation'
}