export default class Utils {
    public static geraCor() {
        const hexadecimais = '0123456789ABCDEF'
        let cor = '#'

        // Pega um número aleatório no array acima
        for (var i = 0; i < 6; i++) {
            //E concatena à variável cor
            cor += hexadecimais[Math.floor(Math.random() * 16)]
        }
        return cor
    }
}