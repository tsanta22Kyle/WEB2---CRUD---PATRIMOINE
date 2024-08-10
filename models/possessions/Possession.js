export default class Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement) {
    this.possesseur = possesseur;
    this.libelle = libelle;
    this.valeur = valeur;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.tauxAmortissement = tauxAmortissement;
  }

  getValeur(date) {
    return this.getValeurApresAmortissement(date);
  }

  getValeurApresAmortissement(dateActuelle) {
    if (dateActuelle < this.dateDebut) {
      return 0;
    }
    const differenceDate = {
      year: dateActuelle.getFullYear() - this.dateDebut.getFullYear(),
      month: dateActuelle.getMonth() - this.dateDebut.getMonth(),
      day: dateActuelle.getDate() - this.dateDebut.getDate(),
    };
  
    var raison = differenceDate.year + differenceDate.month / 12 + differenceDate.day / 365;

    const result = this.valeur - this.valeur *(raison * this.tauxAmortissement / 100);
    return result;
  }
}
let dateD = new Date(2025,9,24)
const myPossess = new Possession("zah","car",300,new Date(),null,10)
console.log(myPossess.getValeurApresAmortissement(dateD))
